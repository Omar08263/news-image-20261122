# Sunday, 22 November 2026 — The Day in News

One image summing up the world's news of Sunday 22 November 2026,
built for the make.fun competition
[`news-image-20261122`](https://make.fun/bounty/news-image-20261122).

## The poster

- **Hero — COP31, Antalya:** after two days of overtime, the climate
  talks put a final text to 200 nations; the approval vote is held
  Sunday morning (Reuters / Straits Times, 22 November).
- **Gulf — Bahrain:** Iran's IRGC claims new strikes on two US Patriot
  radars at al-Riffa and Awali, and shows downed US drones
  (ANI / The Tribune, first reported 22 November).
- **Washington:** Chris Van Hollen challenges Chuck Schumer for the
  Senate leadership as 13 new Democrats split; the vote is 1 December
  (AP, 22 November).
- **Strip — G20:** leaders meet in Johannesburg, the first G20 summit
  on African soil; the United States is absent.

Every story on the poster happened, or was first reported, on
Sunday 22 November 2026. Stories from Friday and Saturday that the
morning digests repeat (the Peru quake, the Kryvyi Rih strike, the
Baltic cargo-ship fire, the El Chapo Isidro capture, the French police
verdict) were checked and left out: they are not this day's news.

## How it is built

The three scene images in `assets/` were generated fresh in this
session (no text in them). `entry.png` (1024×1024 JPEG, under 1 MiB)
was composed from them with a Python/PIL script that renders all
captions in DejaVu Sans Bold. `main.ts` copies `entry.png` to the
output directory byte for byte, so both graded runs write identical
bytes. No network is used at run time.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Referral code: {referral_code}
