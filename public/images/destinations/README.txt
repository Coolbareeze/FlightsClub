DESTINATION IMAGES
===================

This folder didn't exist before — the site currently uses placeholder
picsum.photos URLs for every destination's image. Drop your real photos in
here to replace them.

HOW TO ADD A PHOTO
--------------------
1. Name the file after the destination's exact slug (shown on its edit
   screen in /admin/destinations, and in the URL of its page, e.g.
   flightsclubuk.co.uk/flights/marrakech -> marrakech.jpg).
2. Drop it in this folder: public/images/destinations/
3. Commit and push (git add -A / git commit / git push) so it deploys.
4. In /admin/destinations, edit that destination and set "Image URL" to:
     https://www.flightsclubuk.co.uk/images/destinations/<filename>
   e.g. https://www.flightsclubuk.co.uk/images/destinations/marrakech.jpg

SPECS
------
- Format: JPG, ~80-85% quality, aim for under 400-500KB per file.
- Dimensions: 1600x1200px (4:3), landscape orientation. The same photo gets
  cropped two different ways across the site (a portrait 3:4 card, and a
  landscape 4:3 hero on the destination's own page) — a landscape source
  with the subject centred survives both crops. Avoid anything under
  ~1200px wide, it'll look soft on retina screens.
- Next.js re-optimizes and resizes automatically per device, so one good
  source photo per destination is enough — no need for multiple sizes.

NOTE ON next.config.mjs
-------------------------
next/image only loads images from domains explicitly allowed in
next.config.mjs. flightsclubuk.co.uk and www.flightsclubuk.co.uk are
already allowed — if you ever host images on a different domain (e.g.
outlooktravel.co.uk), that domain needs adding there too or the image
will fail to load.
