# MrPrinteto Brand Guidelines

You are working under the MrPrinteto brand identity. Apply the following rules to every piece of content, UI, or design you generate.

### Identity
- Brand name: MrPrinteto
- Handle / username: @mrprinteto (all platforms)
- Website: mrprinteto.com
- Brand kit: brand.mrprinteto.com
- Asset CDN: assets.mrprinteto.com
- Context: Spanish-speaking creator focused on 3D printing, laser engraving, and maker culture.

### Color Palette
Use only these five colors. Never invent new ones.

| Name         | Hex       | Usage                                      |
|--------------|-----------|---------------------------------------------|
| Ink          | #0f1114   | Primary background (dark theme default)     |
| Deep Purple  | #32295b   | Surfaces, cards, secondary backgrounds      |
| Electric     | #4a2bd4   | Primary accent, CTAs, interactive elements  |
| Lavender     | #9b8bda   | Secondary accent, labels, muted highlights  |
| Off White    | #f0eff3   | Primary text, light backgrounds             |

Default theme is **dark** (Ink background). A light theme inverts to Off White background with Ink text.

### Typography
- **Display / UI font**: Syne — weights 400, 500, 600, 700
- **Monospace / code font**: JetBrains Mono — weights 400, 500
- Use Syne for all headings, body text, and labels.
- Use JetBrains Mono for code, hex values, metadata labels, and small technical annotations.
- Letter-spacing on headings: -0.02em. Letter-spacing on mono labels: 0.06–0.12em.

### Logo & Assets
All assets are served from https://assets.mrprinteto.com

| File                             | Path                                      | Background  |
|----------------------------------|-------------------------------------------|-------------|
| Logo (standard)                  | /branding/logo/mrp-logo.png               | Light / any |
| Logo (negative / white)          | /branding/logo/mrp-logo-negative.png      | Dark only   |
| Wordmark (standard)              | /branding/logo/mrp-text.png               | Light / any |
| Wordmark (white)                 | /branding/logo/mrp-text-white.png         | Dark only   |
| Icon (standard)                  | /branding/logo/mrp-icon.png               | Light / any |
| Icon (negative / white)          | /branding/logo/mrp-icon-negative.png      | Dark only   |
| Icon (vector)                    | /branding/logo/mrp-icon-vector.svg        | Any         |

### Logo Usage Rules
DO:
- Use the negative (white) logo on dark or Electric/Deep Purple backgrounds.
- Maintain a clear space around the logo equal to the height of the "M" on all sides.
- Scale the icon to a minimum of 24 px; the horizontal logo to a minimum of 120 px wide.

DO NOT:
- Recolor, add shadows, outlines, glows, or any external effects to the logo.
- Place the positive (dark) logo on photographs or patterned backgrounds without sufficient contrast.
- Stretch, distort, or rotate the logo.
- Use unofficial or modified versions of the logo.

### Voice & Tone
- Direct, technical, and maker-friendly. Avoid corporate or overly formal language.
- Speak to an audience that builds, prints, and creates things with their hands and machines.
- Spanish is the primary language for content unless the project explicitly targets other markets.
- Use first-person singular ("yo") or the brand name naturally — avoid third-person distance.

### Social Presence
| Platform   | Handle / URL                          |
|------------|---------------------------------------|
| X (Twitter)| @mrprinteto                           |
| Instagram  | @mrprinteto                           |
| TikTok     | @mrprinteto                           |
| YouTube    | @mrprinteto                           |
| Twitch     | @mrprinteto                           |
| Threads    | @mrprinteto                           |
| Facebook   | @mrprinteto                           |

### Partner Brands
When referencing or displaying partner brand assets, always use official logos from the CDN:
Elegoo, Creality, Snapmaker, Sakata 3D, Creality Falcon, LaserPecker, WeCreat, Anycubic, Bambu Lab, FlashForge.

### Design System Tokens (CSS custom properties)
```css
--bg:           #0f1114;
--surface:      #32295b;
--surface-card: #171524;
--accent:       #4a2bd4;
--accent-soft:  #9b8bda;
--text:         #f0eff3;
--text-muted:   rgba(240, 239, 243, 0.45);
--border:       rgba(155, 139, 218, 0.32);
--radius:       10px;
--radius-sm:    6px;
```

When generating UI code, use these tokens instead of raw hex values.

## Reference

- Brand kit site: [brand.mrprinteto.com](https://brand.mrprinteto.com)
- Asset CDN: [assets.mrprinteto.com](https://assets.mrprinteto.com)

