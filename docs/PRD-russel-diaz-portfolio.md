# PRD: Russel Diaz — Online Business Card

## 1. Summary

An animated online business card for Russel Diaz, 2D Illustrator & Concept Designer. It is made to help him get hired: a recruiter should see his best work and his contact details in under a minute. It runs free on GitHub Pages, and Russel can change the featured art without touching code.

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
- **How:** his hand-picked best pieces are the very first thing on screen, and his contact details are one scroll away.
- **What after:** they judge his level in seconds and know exactly how to reach him.
- **Alternatives:** ArtStation or Instagram profiles. This card is more focused, looks more polished, and is all his own brand.

_Statement:_ For recruiters short on time, Russel's card shows only his best work and how to hire him, in one memorable page.

**Russel**

- **Who:** Russel, as the owner.
- **Why:** keep the showcase current without paying or editing code.
- **What before:** asking a developer, or a site that goes stale.
- **How:** upload an image to Cloudinary (free), tag it `featured`, and it appears.
- **What after:** fresh highlights whenever he wants.
- **Alternatives:** paid site builders such as Squarespace or Wix. This one is free, and the look is fully custom.

_Statement:_ Russel controls his highlights from a free upload page, and the site keeps itself up to date.

## 7. Solution

### 7.1 Key flow

The site has two full-screen pages that snap into place, like hgjart.com. **Page 1** is the featured carousel, shown straight away, with his name and title in the top bar over a moving line-art background. Clicking a piece opens it full size. **Page 2** is the business card: name, title, email, profile links and an email button. _(Changed 2026-11-10: the separate name/title hero page and the bio were removed, so recruiters see the work first and the card stays minimal.)_

### 7.2 Key features

- **Featured carousel:** tall frames that crop artwork to fit; a click opens a lightbox showing the whole image. Works with arrows, swipe and keyboard.
- **Cloudinary-powered:** the list of images tagged `featured` is fetched on page load. A bundled fallback list keeps the carousel filled if the fetch fails.
- **Motion everywhere:** animated background, text reveals, card tilt, button and nav effects. Everything calms down for visitors who ask their device for reduced motion.
- **Business card:** name, title, email (diazart19111@gmail.com), an email button, and links to his professional profiles. No bio.
- **Responsive:** works from 360px phones to large desktops, including phones held sideways.

### 7.3 Technology

Vite + TypeScript, GSAP for animation, and a canvas for the background. Deployed to GitHub Pages by a GitHub Action. Cloudinary free plan with "Resource list" delivery turned on.

### 7.4 Assumptions and open questions

- _Assumption:_ the Cloudinary free plan (25 monthly credits) is enough for a portfolio's traffic.
- _Assumption:_ the Cloudinary tag list (`/image/list/featured.json`) stays available on the free plan.
- _Open:_ the GitHub repo name.

## 8. Release

- **V1:** everything in 7.2, with placeholder content, deployed on GitHub Pages.
- **Later:** real content, a custom domain, and maybe a CV download if recruiters ask for it.
- **Not doing:** a full gallery, a CMS or admin panel, a contact form, a backend, or any paid services.
- **Timeframe:** a few working sessions.
