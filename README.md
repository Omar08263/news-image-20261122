# Sunday, 22 November 2026 — The Day in News

One image summing up the world's news of Sunday 22 November 2026,
built for the make.fun competition
[`news-image-20261122`](https://make.fun/bounty/news-image-20261122).

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/Omar08263/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/Omar08263/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

## The poster

- **Hero — COP31, Antalya:** after two days of overtime, the climate
  talks put a final text to nearly 200 nations; the approval vote is
  held Sunday morning (Reuters / Straits Times, 22 November).
- **Gulf — Bahrain:** Iran's IRGC claims it hit two US Patriot radars
  at al-Riffa and Awali; Bahrain denies it — the site hit was civilian,
  a fire with no injuries (Bahrain Foreign Ministry, 00:08 GMT
  22 November; ANI).
- **New Delhi:** Nepal's Prime Minister Balendra Shah arrives for a
  two-day state visit to India — energy deals and talks with Modi on
  Monday (The Hindu, arrival Sunday 22 November).
- **Panel — Hong Kong (illustrated):** voters queue at a polling
  station beside a ballot box for the Election Committee subsector
  elections — 856 candidates for 723 seats, polls 9am–6pm
  (Hong Kong Government Registration and Electoral Office,
  19 November notice; China Daily Asia, 22 November).

Every story on the poster happened, or was first reported, on
Sunday 22 November 2026. Stories from Friday and Saturday that the
morning digests repeat (the Peru quake, the Kryvyi Rih strike, the
Baltic cargo-ship fire, the El Chapo Isidro capture, the French police
verdict) were checked and left out: they are not this day's news.
A second check rejected seven more look-alikes the digests date
22 November but which happened 15–21 November: the Gaza aid joint
statement (15 Nov), the ICJ Myanmar verdict (19 Nov), the Brazil
storm and the Denmark plot charge (20 Nov), and the Houthi Riyadh
strikes, the Pentagon Canada memo and the Trump card-cap vow (21 Nov).

## How it is built

The four scene images in `assets/` were generated fresh in this
session (no text in them). `entry.png` (1024×1024 JPEG, under 1 MiB)
was composed from them with a Python/PIL script that renders all
captions in DejaVu Sans Bold. Layout: masthead 0–118, hero COP31
118–500, two panels 500–860, gold divider 868–870, Hong Kong panel
876–984 (ballot-box image left, headline right), footer at y=990 —
its lowest ink row is 1010, a 13px bottom margin, measured by pixel
scan, so the date line sits fully inside the frame. `main.ts` checks
the poster is a whole JPEG of 1024×1024 and under 1 MiB, then copies
`entry.png` to the output directory byte for byte, so both graded
runs write identical bytes. No network is used at run time.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
