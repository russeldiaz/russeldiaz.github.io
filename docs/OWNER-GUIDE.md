# Updating the featured carousel

The carousel on the site shows every image in Cloudinary that has the tag **`featured`**, newest first. It costs nothing and needs no code changes.

## One-time setup (about 10 minutes)

1. Create a free account at <https://cloudinary.com>. The free plan needs no credit card.
2. Copy your **cloud name**. It's shown on the dashboard, under _Product Environment_.
3. In Cloudinary go to **Settings › Security** and, under _Restricted media types_, **untick "Resource list"**, then save. This lets the site read the list of featured images.
4. In the GitHub repository go to **Settings › Secrets and variables › Actions › Variables** and add a variable named `CLOUDINARY_CLOUD_NAME` with your cloud name as its value.
5. In **Settings › Pages**, set _Source_ to **GitHub Actions**.
6. Re-run the latest _Deploy to GitHub Pages_ workflow (Actions tab › the workflow › _Run workflow_).

## Adding a piece

1. In Cloudinary open **Media Library** and upload the image. Upload it at full quality: the site resizes it automatically.
2. Select the image and add the tag `featured`.
3. Optional: under _Contextual metadata_ (sometimes labelled _Context_), add:
   - `caption`: the title shown on the card, e.g. `Sky Warden`
   - `alt`: a short description for screen readers, e.g. `Armoured knight on a cliff at dusk`
4. Reload the site. New pieces appear within about a minute.

## Removing or reordering

- To **remove** a piece, delete the `featured` tag (the image itself can stay in Cloudinary).
- **Order** is newest upload first. To move an older piece to the front, re-upload it.

## If the carousel shows the placeholder landscapes

That means the site couldn't read the list. Check that:

- "Resource list" is unticked (setup step 3),
- at least one image has the exact tag `featured` (lowercase),
- the `CLOUDINARY_CLOUD_NAME` variable is spelled correctly, and the site was redeployed after adding it.
