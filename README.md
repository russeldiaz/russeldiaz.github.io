# art-portfolio

An animated, two-screen business card for Russel Diaz, 2D Illustrator & Concept Designer, live at https://russeldiaz.github.io/. Built with Vite, TypeScript and GSAP, and deployed to GitHub Pages.

- Product requirements: [docs/PRD-russel-diaz-portfolio.md](docs/PRD-russel-diaz-portfolio.md)
- Updating the featured carousel (for the owner): [docs/OWNER-GUIDE.md](docs/OWNER-GUIDE.md)
- Card text (name, title, email, links): `src/content.ts`

## Develop

```sh
npm install
npm run dev        # http://localhost:5173/
npm test           # unit tests
npm run lint
npm run build      # outputs dist/
```

The carousel loads images tagged `featured` from Russel's Cloudinary account (`olfmcr5o`). If none are tagged or Cloudinary is unreachable, it shows the bundled placeholder art. Set `VITE_CLOUDINARY_CLOUD_NAME` to point at a different account.
