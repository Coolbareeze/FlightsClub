AIRLINE LOGOS
=============

The "We Book With The World's Leading Airlines" section on the homepage
and /flights page is wired up to show real airline logos, but no logo
files are included in this project — airline logos are trademarked brand
assets, so we didn't scrape or fabricate them. Until a file is added here,
that airline's card just shows its name as text (no broken images, no
errors — it degrades gracefully).

HOW TO ADD A LOGO
------------------
1. Get the official logo from the airline's own press/media/newsroom page
   (search "[airline name] media kit" or "[airline name] brand assets" —
   e.g. Emirates, Lufthansa, KLM, Etihad, Turkish Airlines, British Airways,
   Qatar Airways, Virgin Atlantic, Saudia, Ethiopian Airlines, Singapore
   Airlines and Air France all publish these). Some airlines require a
   quick partner/press registration before download — check usage terms,
   since logos remain the airline's trademark even when downloadable.
2. Save it as an SVG if possible (falls back to PNG with a transparent
   background if SVG isn't available).
3. Name the file to match exactly what's expected (see table below) and
   drop it into this folder: public/images/airlines/

Expected filename           Airline
---------------------------  -----------------------
british-airways.svg          British Airways
emirates.svg                 Emirates
qatar-airways.svg            Qatar Airways
turkish-airlines.svg         Turkish Airlines
etihad.svg                   Etihad Airways
lufthansa.svg                Lufthansa
klm.svg                      KLM
virgin-atlantic.svg          Virgin Atlantic
saudia.svg                   Saudia
ethiopian-airlines.svg       Ethiopian Airlines
singapore-airlines.svg       Singapore Airlines
air-france.svg                Air France

That's it — no code changes needed. As soon as a file with the right name
lands in this folder and gets deployed, that airline's card automatically
switches from text to the real logo (components/home/AirlinesSlider.tsx
handles this — see lib/data/airlines.ts for the exact filenames it looks
for).

NOTE ON DARK MODE
------------------
Logos are rendered with a CSS filter in dark mode (invert/brightness) so
coloured logos on a white card don't disappear against the dark background.
If a specific airline's logo looks wrong in dark mode once added, that's
a one-line CSS tweak — just flag it.

ADDING MORE AIRLINES
---------------------
To add an airline that isn't in the list at all, add an entry to
lib/data/airlines.ts (name, slug, logo path following the same pattern)
and optionally drop the matching logo file here.
