import type { APIRoute } from 'astro';
import { z } from 'zod';
import { Resend } from 'resend';

export const prerender = false;

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// Works within a warm serverless instance. For multi-instance production,
// replace with Upstash Redis (@upstash/ratelimit).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;       // max requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count++;
  return false;
}

// ─── Validation schema ────────────────────────────────────────────────────────
const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.string().email('Introduce un email válido'),
  tipo: z.enum(['reunion', 'regalo', 'evento', 'personalizacion'], {
    errorMap: () => ({ message: 'Selecciona un tipo de proyecto válido' }),
  }),
  cantidad: z.coerce
    .number({ invalid_type_error: 'Introduce una cantidad válida' })
    .int('La cantidad debe ser un número entero')
    .min(1, 'La cantidad mínima es 1')
    .max(10_000, 'Contacta directamente para pedidos superiores a 10.000 unidades'),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es demasiado largo'),
});

const TIPO_LABELS: Record<string, string> = {
  reunion: 'Reunión / Presentación',
  regalo: 'Regalo corporativo',
  evento: 'Evento / Feria',
  personalizacion: 'Personalización libre',
};

function buildEmailHtml(data: z.infer<typeof contactSchema>): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8" /></head>
    <body style="font-family: sans-serif; background: #f4f4f4; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <div style="background: #4a2bd4; padding: 24px 28px;">
          <h1 style="margin: 0; color: #fff; font-size: 18px; font-weight: 600;">
            Nueva solicitud de presupuesto
          </h1>
        </div>
        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 130px; vertical-align: top;">Nombre</td>
              <td style="padding: 8px 0; color: #111; font-weight: 600;">${data.nombre}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${data.email}" style="color: #4a2bd4;">${data.email}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Tipo</td>
              <td style="padding: 8px 0; color: #111;">${TIPO_LABELS[data.tipo] ?? data.tipo}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Cantidad</td>
              <td style="padding: 8px 0; color: #111;">${data.cantidad} unidades</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Mensaje</td>
              <td style="padding: 8px 0; color: #111; white-space: pre-wrap;">${data.mensaje}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 28px; background: #f9f9f9; font-size: 12px; color: #999;">
          Enviado desde merch.mrprinteto.com · ${new Date().toLocaleString('es-ES')}
        </div>
      </div>
    </body>
    </html>
  `;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  // Resolve client IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    '0.0.0.0';

  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: 'Demasiadas solicitudes. Espera un minuto e inténtalo de nuevo.' },
      429
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Solicitud inválida.' }, 400);
  }

  // Validate
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return json({ ok: false, errors: result.error.flatten().fieldErrors }, 422);
  }

  const data = result.data;

  // Send email
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'MrPrinteto Merch <noreply@merch.mrprinteto.com>',
      to: [import.meta.env.TO_EMAIL as string],
      replyTo: data.email,
      subject: `[Merch] ${TIPO_LABELS[data.tipo]} — ${data.nombre}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error('[api/contact] Resend API error:', error);
      return json({ ok: false, error: 'Error al enviar. Inténtalo de nuevo.' }, 500);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[api/contact] Unexpected error:', err);
    return json({ ok: false, error: 'Error interno. Inténtalo de nuevo.' }, 500);
  }
};
