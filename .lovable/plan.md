

# Revive Healthcare Landing Page — Implementation Plan

## Design Direction
A premium, minimalist healthcare landing page with an ivory/soft beige color palette, warm coral accents, muted gold highlights, refined serif headings, and modern sans-serif body text. Spacious, calm, and authoritative.

---

## Sections (in order)

### 1. News Banner
- Dismissible announcement bar at the very top
- Subtle background accent color, close button

### 2. Sticky Navigation
- Logo on left, 5-6 nav links (Services, About, Gallery, Testimonials, Contact)
- "Book Now" CTA button in warm coral/accent color
- Sticky on scroll with subtle shadow appearance
- Mobile: hamburger menu

### 3. Hero Section
- Full-width section with high-quality placeholder imagery
- Headline + subheading communicating premium care
- Two CTAs: "Book Your Consultation" (primary) and "Explore Treatments" (secondary)
- Subtle fade-in animation on load

### 4. The Doctor — Authority Section
- Professional portrait placeholder alongside credentials
- Highlight: International Speaker, Board Director, Specialist badges
- Short philosophy statement
- Clean, prestigious layout with generous whitespace

### 5. Services Overview
- Card-based grid (3 columns desktop, 1 column mobile)
- Each card: service name, short description, "Learn More" link
- Hover elevation micro-interaction
- Placeholder services (e.g., Aesthetic Treatments, Skin Rejuvenation, Advanced Procedures)

### 6. Discounts / Promotions
- Visually distinct section with accent background
- Placeholder promotional offer with validity period
- Prominent CTA button

### 7. Meet the Team
- Grid of team member cards with photo placeholders, name, and role
- Clean, minimal presentation

### 8. Testimonials
- Desktop: sticky right-side testimonial module with auto-rotation (5-8s) and manual arrows
- Mobile: swipeable carousel
- Each testimonial: quote, name, optional star rating
- Smooth fade/slide transitions

### 9. Booking Section
- Prominent booking form with name, email, phone, service selection, preferred date
- Multi-step or single form with inline validation using zod
- Clear CTA and success feedback

### 10. Footer
- Clinic hours (Mon–Sat, 12pm–9pm)
- Contact info, address placeholder
- Quick links: Careers, Blog, Privacy Policy
- Social media icon links
- Back-to-top button

---

## Cross-Cutting Features
- **Mobile-first responsive design** with fixed bottom booking CTA on mobile
- **Smooth scroll navigation** between sections
- **Subtle animations**: fade-in on scroll reveal, button hover effects, section transitions (all under 300ms)
- **WCAG 2.1 AA** contrast compliance with semantic HTML and ARIA labels
- **SEO-ready** semantic heading structure and meta tags
- **Color palette**: ivory/off-white base, warm coral accent, muted gold highlights
- **Typography**: serif headings for elegance, sans-serif body for readability (16px+, line-height 1.6)

---

## What's NOT included (Phase 2)
- CMS editability (content will be hardcoded but structured for easy updates)
- Video testimonials, gallery filtering, countdown timers
- Multi-language support, membership plans
- Analytics/tracking integration (Google Analytics, Meta Pixel)
- Real calendar/booking system integration (form will be UI-only)
- Before & After gallery (Phase 1.5)

