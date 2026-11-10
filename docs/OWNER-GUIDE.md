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
3. Optional, to give the piece a title:
   1. Open the image (click it) and go to its **Metadata** tab.
   2. Under **Contextual metadata**, fill in **Title (caption)**, e.g. `Sky Warden`. This is shown on the card and under the full-size view.
   3. Optionally fill in **Description (alt)** with a short description for screen readers, e.g. `Armoured knight on a cliff at dusk`.
   4. Click **Save**.

   Renaming the file or changing its **Display name** does _not_ set the title. Only the _Title (caption)_ field under _Contextual metadata_ does.

4. Reload the site. New pieces and title changes appear within about a minute.

## Choosing how a piece is cropped on its card

The carousel cards are tall frames with a fixed **9:16** shape (portrait, like a phone screen). Clicking a card always opens the **whole** artwork, uncropped.

**Automatic (no work):** Cloudinary looks at each piece and crops the card around the main subject, not just the centre. This works well for most pieces.

**Custom preview (when the automatic crop misses):**

1. Make a cropped version of the artwork at exactly **1080 × 1920 px** (9:16). The smallest that still looks sharp is 900 × 1600 px.
   - Keep the important part away from the very edges: the frame has a thin border.
   - If the piece has a title, it's shown over the **bottom ~15%** of the card, so keep faces and key details above that.
2. Upload the cropped version to Cloudinary. **Don't** tag it `featured` (that would add it to the carousel as a separate piece).
3. Copy the cropped version's URL (in the Media Library, open it and use **Copy URL**). Its public ID works too.
4. Open the **main** artwork (the one tagged `featured`), go to **Metadata › Contextual metadata**, add a new field with the key **`preview`**, paste the URL as its value, and click **Save**.
5. Reload the site after about a minute: the card shows your cropped version, and clicking it still opens the full original.

To go back to the automatic crop, delete the `preview` field.

## Removing or reordering

- To **remove** a piece, delete the `featured` tag (the image itself can stay in Cloudinary).
- **Order** is newest upload first. To move an older piece to the front, re-upload it.

## If a title doesn't show

- Check it was typed into **Title (caption)** under **Contextual metadata** (not the display name or file name), and that you clicked **Save**.
- Wait a minute, then reload: Cloudinary refreshes the public list about once a minute.

## If the carousel shows the placeholder landscapes

That means the site couldn't read the list. Check that:

- "Resource list" is unticked (setup step 2),
- at least one image has the exact tag `featured` (lowercase),
- the images were uploaded to the `olfmcr5o` account.
