# PRD: Russel Diaz — Online Business Card

## 1. Summary
A one-page, animated online business card for Russel Diaz, a 2D artist and concept artist. It is made to help him get hired: a recruiter should see his best work and his contact details in under a minute. It runs free on GitHub Pages, and Russel can change the featured art without touching code.

## 3. Background
Russel needs a link he can put on job applications and social profiles. A full gallery is not the goal: studios look at a few strong pieces and then decide to reach out or not. The design is inspired by hgjart.com (dark look, moving line-art background, tall framed cards). The text is English only.

## 4. Objective
Turn a recruiter's first visit into a contact or a click to his professional profiles.

Key Results (first 3 months after launch):
- The page loads fast on a phone: Lighthouse mobile Performance ≥ 90 and Accessibility ≥ 95.
- Russel updates the featured carousel by himself at least once, with no developer help.
- Running cost stays at $0.

## 5. Market Segments
1. **Recruiters and art directors at game, animation and illustration studios.** They screen many candidates fast and need proof of skill and a way to make contact.
2. **Russel, the site owner.** He wants to keep his highlights current but is not a developer.

Constraints: static hosting only (GitHub Pages), free services only, and nothing that needs a server.

## 6. Value Propositions
**Recruiters**
- **Who:** studio recruiters and art directors.
- **Why:** decide quickly whether a 2D/concept artist is worth an interview.
- **What before:** dig through long galleries or social feeds mixed with unrelated posts.
- **How:** a short, hand-picked carousel of his best pieces, then a clear bio and contact.
- **What after:** they judge his level in seconds and know exactly how to reach him.
- **Alternatives:** ArtStation or Instagram profiles. This card is more focused, looks more polished, and is all his own brand.

*Statement:* For recruiters short on time, Russel's card shows only his best work and how to hire him, in one memorable page.

**Russel**
- **Who:** Russel, as the owner.
- **Why:** keep the showcase current without paying or editing code.
- **What before:** asking a developer, or a site that goes stale.
- **How:** upload an image to Cloudinary (free), tag it `featured`, and it appears.
- **What after:** fresh highlights whenever he wants.
- **Alternatives:** paid site builders such as Squarespace or Wix. This one is free, and the look is fully custom.

*Statement:* Russel controls his highlights from a free upload page, and the site keeps itself up to date.

## 7. Solution
### 7.1 Key flow
The visitor lands on a hero with his name and title, over a moving line-art background. The featured carousel comes next: clicking a piece opens it full size. Then an intro card with his bio, a contact button and his social/pro IDs.

### 7.2 Key features
- **Featured carousel:** tall frames that crop artwork to fit; a click opens a lightbox showing the whole image. Works with arrows, swipe and keyboard.
- **Cloudinary-powered:** the list of images tagged `featured` is fetched on page load. A bundled fallback list keeps the carousel filled if the fetch fails.
- **Motion everywhere:** animated background, text reveals, card tilt, button and nav effects. Everything calms down for visitors who ask their device for reduced motion.
- **Intro card:** bio, an email contact button, and links to his social and professional profiles.
- **Responsive:** works from 360px phones to large desktops.

### 7.3 Technology
Vite + TypeScript, GSAP for animation, and a canvas for the background. Deployed to GitHub Pages by a GitHub Action. Cloudinary free plan with "Resource list" delivery turned on.

### 7.4 Assumptions and open questions
- *Assumption:* the Cloudinary free plan (25 monthly credits) is enough for a portfolio's traffic.
- *Assumption:* the Cloudinary tag list (`/image/list/featured.json`) stays available on the free plan.
- *Open:* Russel's real bio, email, social links, Cloudinary cloud name and the GitHub repo name. Placeholders are used until he supplies them.

## 8. Release
- **V1:** everything in 7.2, with placeholder content, deployed on GitHub Pages.
- **Later:** real content, a custom domain, and maybe a CV download if recruiters ask for it.
- **Not doing:** a full gallery, a CMS or admin panel, a contact form, a backend, or any paid services.
- **Timeframe:** a few working sessions.
