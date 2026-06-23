# Sounds Like You

**Cyanite challenge for HACKATUNE 2026 (Munich Music Labs).**

Build a music discovery experience on the Cyanite API that recommends tracks based on
how they actually sound, driven by natural language, seed tracks, and a listener's
taste, rather than by what other people listened to. Every recommendation should be
explainable, so a user can ask "why this track?" and get a clear answer grounded in
Cyanite's audio tags.

Read the full brief in [CHALLENGE.md](CHALLENGE.md).

## What's in this repo

| Path | What it is |
|---|---|
| `CHALLENGE.md` | The challenge: what to build, ideas, and judging criteria |
| `CHALLENGE_AGREEMENT.md` | Terms for participating in the Cyanite challenge (accepted at registration) |
| `data/` | The data pack (catalog, taste profiles, audio links) |
| `docs/cyanite_tag_vocabularies.md` | The controlled vocabularies for Cyanite's tags (for building filters) |
| `.env.sample` | Template for your Cyanite API key |
| `LICENSE` | MIT, for the code and docs in this repo |
| `DATA_LICENSE.md` | Terms for the data pack (Creative Commons music, pseudonymized profiles) |

## Getting started

1. Clone this repo.
2. Copy the env template and add your Cyanite API key (handed out by the organizers at the event):
   ```bash
   cp .env.sample .env
   # then edit .env and set CYANITE_API_KEY
   ```
3. Read [CHALLENGE.md](CHALLENGE.md) and skim [docs/cyanite_tag_vocabularies.md](docs/cyanite_tag_vocabularies.md).
4. Explore `data/` (see below) and start querying the Cyanite API by track ID or text prompt.

For the Cyanite API itself (authentication, search, fetching tags by track ID), refer
to the Cyanite documentation provided at the event.

## The data pack

Everything is restricted to tracks that are indexed in Cyanite, so any track ID you see
is queryable.

| File | Columns | Notes |
|---|---|---|
| `data/catalog.csv` | `track_id, mp3_download_url` | The full queryable catalog (~361,600 tracks) plus a public MP3 URL per track |
| `data/tracks.csv` | `track_id, name, artist_name, duration` | Display info for tracks referenced by the user profiles |
| `data/users.csv` | `user_id, n_likes_available` | Pseudonymized user profiles (numeric IDs only) |
| `data/user_likes.csv` | `user_id, track_id` | Each user's liked tracks, restricted to the catalog |

Use the user profiles as **seeds for content-based taste profiles** (the sound of what a
user likes), not as collaborative-filtering / co-listening signals. See
[DATA_LICENSE.md](DATA_LICENSE.md) for music attribution and data-use terms.

## Cyanite API in one line

Search returns ranked track IDs (free-text prompt search or similar-by-ID, with tag
filtering); you then fetch each result's tags from the Tagging API by track ID. There
are no raw embeddings or vectors. See [CHALLENGE.md](CHALLENGE.md) for the full loop.

## Terms and licenses

- Participating in the Cyanite challenge means accepting [CHALLENGE_AGREEMENT.md](CHALLENGE_AGREEMENT.md). Acceptance is recorded by Munich Music Labs at registration; the copy here is the reference text.
- Code and docs: MIT ([LICENSE](LICENSE)). Data pack: see [DATA_LICENSE.md](DATA_LICENSE.md).
