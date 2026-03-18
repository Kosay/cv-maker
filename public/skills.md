# CV Maker — Skills & Context

## What This App Does
A web app where users:
1. Log in with Firebase Auth
2. Create and manage multiple CV profiles
3. Choose from 3 HTML/CSS templates (replicas of their real CVs)
4. Fill a structured form with personal, work, education, and skill data
5. See a live preview of the rendered CV
6. Save data to Firestore
7. Export the final CV as a PDF

---

## Templates

### Template 1 — Peach & Gray
- **Style**: Two-column. Left: dark gray sidebar. Right: white main area with peach diagonal header shape.
- **Accent color**: `#c97a50` (terracotta/peach)
- **Sidebar bg**: `#b0b0b0`
- **Features**: Photo, Skills (progress bars), Languages (star icons), Contact
- **Main**: Large name in peach, summary paragraph, Work Experience section

### Template 2 — Teal
- **Style**: Two-column. Left: light teal `#e0f5f2` sidebar. Right: white main area.
- **Accent color**: `#00897b` (teal)
- **Top banner**: thin teal bar + "PERSONAL RESUME" label
- **Features**: Photo, Name, Contact, Skills (star ratings), Languages (star ratings)
- **Main**: Section headers as full-width teal banners — Summary, Visa Status, Work Experience, Education, Training/Licenses

### Template 3 — Dark Gray
- **Style**: Two-column. Left: light gray `#f0f0f0` sidebar. Right: dark gray header + white content.
- **Accent color**: `#6b6b6b`
- **Features**: Photo, Skills (progress bars), Languages (star icons), Contact
- **Main**: Dark gray header block with name + summary, then sections with dividers

---

## Placeholder Reference

All templates use `{{placeholder}}` syntax. Full list:

### Personal
| Placeholder | Description |
|---|---|
| `{{first_name}}` | First name |
| `{{last_name}}` | Last name |
| `{{email}}` | Email address |
| `{{phone}}` | Phone number |
| `{{photo}}` | Photo URL or fallback text |
| `{{summary}}` | Professional summary paragraph |
| `{{visa_status}}` | e.g. "Resident visa / family sponsor" |
| `{{dob}}` | Date of birth |
| `{{nationality}}` | Nationality |

### Skills (up to 5)
| Placeholder | Description |
|---|---|
| `{{skill_1}}` ... `{{skill_5}}` | Skill name |
| `{{skill_1_level}}` ... `{{skill_5_level}}` | Bar width percentage (0–100) |
| `{{skill_1_stars}}` ... `{{skill_5_stars}}` | Star HTML string (Template 2) |

### Languages (up to 3)
| Placeholder | Description |
|---|---|
| `{{lang_1}}` ... `{{lang_3}}` | Language name |
| `{{lang_1_stars}}` ... `{{lang_3_stars}}` | Star HTML string |

### Work Experience (up to 5 jobs)
| Placeholder | Description |
|---|---|
| `{{job_N_org}}` | Organization name |
| `{{job_N_location}}` | City / Country |
| `{{job_N_title}}` | Job title |
| `{{job_N_dept}}` | Department or specialty |
| `{{job_N_start}}` | Start date e.g. "May.2024" |
| `{{job_N_end}}` | End date e.g. "Jan.2025" |
| `{{job_N_duty_1}}` ... `{{job_N_duty_5}}` | Bullet point duties |

### Education (up to 3)
| Placeholder | Description |
|---|---|
| `{{edu_N_school}}` | School/institution name |
| `{{edu_N_degree}}` | Degree or qualification |
| `{{edu_N_start}}` | Start year |
| `{{edu_N_end}}` | End year |

### Certifications (up to 5)
| Placeholder | Description |
|---|---|
| `{{cert_N_name}}` | Certificate name |
| `{{cert_N_org}}` | Issuing organization |
| `{{cert_N_date}}` | Date issued |

---

## Template Renderer Logic

The renderer (`lib/templates/renderer.ts`) should:
1. Fetch the raw HTML string from `/public/templates/templateN.html`
2. Replace all `{{placeholder}}` tokens with values from the `CVData` object
3. For array fields (jobs, skills), loop and inject into numbered placeholders
4. For star ratings: convert number (1–5) to filled/empty star HTML
5. Return the final HTML string to be rendered in `CVPreview.tsx`

Star HTML example:
```ts
function starsHTML(count: number, max = 5): string {
  return Array.from({ length: max }, (_, i) =>
    i < count ? '★' : '☆'
  ).join('');
}
```

---

## Firebase Structure

```
Firestore:
  users/
    {userId}/
      cvs/
        {cvId}/   ← CVData object

Storage:
  users/{userId}/photos/{cvId}.jpg  ← profile photo
```

---

## Key Libraries
| Library | Purpose |
|---|---|
| `firebase` | Auth, Firestore, Storage |
| `react-hook-form` | Form state management |
| `html2canvas` | Capture CV div as image |
| `jspdf` | Convert image to PDF |
| `tailwindcss` | All styling |
| `next/image` | Photo handling |
