AIRLINE LOGOS
=============

All 12 logos are now in place (PNG). Source: 4 pulled from your own
outlooktravel.co.uk asset library (british-airways, etihad, qatar-airways,
singapore-airlines); the remaining 8 (emirates, lufthansa, klm,
turkish-airlines, virgin-atlantic, saudia, ethiopian-airlines, air-france)
came from a third-party scraped logo archive (github.com/Jxck-S/airline-logos)
at your explicit request, after being flagged that its license only covers
identification use (e.g. flight trackers), not commercial/promotional
display. Using them here carries trademark/copyright risk since Flights Club
UK is a commercial site — worth keeping in mind if this ever comes up.

If you want to de-risk later, swap any of these 8 for the airline's own
official press/media/brand-kit asset (search "[airline name] media kit") —
no code changes needed, just replace the file with the same name.

Expected filename           Airline
---------------------------  -----------------------
british-airways.png          British Airways
emirates.png                 Emirates
qatar-airways.png            Qatar Airways
turkish-airlines.png         Turkish Airlines
etihad.png                   Etihad Airways
lufthansa.png                Lufthansa
klm.png                      KLM
virgin-atlantic.png          Virgin Atlantic
saudia.png                   Saudia
ethiopian-airlines.png       Ethiopian Airlines
singapore-airlines.png       Singapore Airlines
air-france.png                Air France

If a file is ever removed, that airline's card just falls back to showing
its name as text (components/home/AirlinesSlider.tsx handles this — see
lib/data/airlines.ts for the exact filenames it looks for).

NOTE ON DARK MODE
------------------
Logos are rendered with a CSS filter in dark mode (invert/brightness) so
coloured logos on a white card don't disappear against the dark background.
A couple of these logos (e.g. Emirates, which has a solid red background box)
may look slightly off after the invert filter in dark mode — flag it if so
and it's a one-line CSS tweak per airline.

ADDING MORE AIRLINES
---------------------
To add an airline that isn't in the list at all, add an entry to
lib/data/airlines.ts (name, slug, logo path following the same pattern)
and drop the matching logo file here.
