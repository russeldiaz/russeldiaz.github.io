# Updating the featured carousel

The carousel on the site shows every image in Cloudinary that has the tag **`featured`**, newest first. It costs nothing and needs no code changes.

## One-time setup (about 5 minutes)

1. The site is already connected to the Cloudinary account with cloud name **`olfmcr5o`** (set in `src/content.ts`).
2. In Cloudinary go to **Settings › Security** and, under _Restricted media types_, **untick "Resource list"**, then save. This lets the site read the list of featured images.
3. In the GitHub repository, under **Settings › Pages**, set _Source_ to **GitHub Actions**.

To switch to a different Cloudinary account later, change the cloud name in `src/content.ts`, or set a repository variable named `CLOUDINARY_CLOUD_NAME` (Settings › Secrets and variables › Actions › Variables) and redeploy.

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

- "Resource list" is unticked (setup step 2),
- at least one image has the exact tag `featured` (lowercase),
- the images were uploaded to the `olfmcr5o` account.
