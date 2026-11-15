# Illinois Legacy — structured import preparation

**Status:** Prepared, not imported into the unified franchise model. Source of truth: [Illinois Legacy Log](https://docs.google.com/document/d/1HGrU6zCfyts7KhSwJtMV8xHbflsUxgeNhl3HwpXvGb8/edit). Existing `illinois-legacy.js` already contains a source-derived archive; reuse it rather than duplicating prose. The connected Illinois Dynasty spreadsheet may hold additional statistical snapshots but is not treated as verified here.

## Scope and checkpoint

College Hoops 2K8 simulated Illinois Fighting Illini men’s basketball universe; Bruce Weber is head coach throughout the recorded period. The story starts in 2007–08 and is paused **after** the 2011–12 Big Ten Tournament, **before** the NCAA Tournament opener versus Baylor. Never import real-world Illinois results as fictional legacy canon.

## Season records

| Season | Overall | Big Ten | Finish | Postseason |
| --- | --- | --- | --- | --- |
| 2007–08 | 17–17 | Unknown | Unknown | Not recorded |
| 2008–09 | 18–14 | Unknown | Unknown | Not recorded |
| 2009–10 | 17–14 | Unknown | Unknown | Not recorded |
| 2010–11 | 16–15 | 7–11 | Tied 7th | Not recorded |
| 2011–12 | 24–10 through Big Ten tournament | 12–6 | 3rd | Big Ten Tournament champion; NCAA East No. 8 seed, Baylor pending |

2011–12 regular season: **21–10 overall, 12–6 Big Ten**. An unsaved loss at Indiana was replaced by a simulated win; **20–11 / 11–7 is superseded**. The 2011–12 statistics snapshots may predate that replay and must retain their capture context rather than being represented as recalculated final totals.

## Verified 2011–12 tournament events

- Big Ten quarterfinal: Illinois 82, Penn State 69.
- Big Ten semifinal: Illinois 57, Michigan State 49; Mekel Defares Player of the Game.
- Big Ten final: Illinois 57, Ohio State 47; Shema Mattox Player of the Game.
- NCAA East Regional: No. 8 Illinois vs No. 9 Baylor, March 16, 2012, SEFCU Arena; **result pending**.

## Explicitly designated character profiles (only these should receive character pages)

- **Bruce Weber** — head coach; character tracking begins fall 2007. His earlier coach-card career record is a historical snapshot, not necessarily updated after the replay.
- **Shema Mattox** — center, No. 43; joined fall 2008; Big Ten defensive standout. Junior snapshot: 11.9 PPG, 5.3 RPG, 1.8 BPG; senior regular-season snapshot: 17.3 PPG, 5.9 RPG. Big Ten title-game Player of the Game.
- **Mekel Defares** — forward, No. 20; 2011–12 Big Ten Tournament scoring: 10 vs Penn State, 19 vs Michigan State, 18 vs Ohio State (47 total).
- **Robin Summers** — point guard, No. 1; 2011–12 tournament champion.
- **Vern Leadbetter** — forward, No. 42; 2010 incoming four-star recruit, 2011–12 tournament champion.

**Source rule:** Do not create character pages for every roster member; roster presence is not character designation. Link first meaningful character mentions and roster-table names to existing profiles.

## Recruiting and awards caution

2010 incoming class: Vern Leadbetter and Laramie Osimani, both four-star power forwards, with source rankings. The 2010 class joins the 2010–11 season; signing dates are not established. Mattox was identified as Big Ten Best Defender on a 2011–12 conference card, but a distinct 2011–12 end-of-season award announcement is **not verified**. Do not infer NBA draft picks, All-Americans, or NCAA outcomes.

## Import design (not yet executed)

1. Create stable IDs for Illinois seasons (2007–08 to 2011–12), the five explicit characters, and the three Big Ten tournament games.
2. Create season records linked to the coach and the conference. Attach tournament games to 2011–12 with final scores, known honors, and available source box scores.
3. Link designated characters to their season roster entries while preserving all other roster entries as roster records, not promoted characters.
4. Preserve conference standings, source checkpoint metadata, and historical statistical snapshots. Never silently replace a snapshot with a simulated result.
5. Keep `illinois-legacy.js` as a read-only legacy archive until the unified import has been compared and verified.
6. Add tests for 2011–12 record correction, pending Baylor result, the five-character rule, and idempotent import.
7. Import into **Illinois only**; Washington and other universes remain isolated. Public-reader publication is a separate owner action.

## Open questions for future capture

Earlier postseason finishes, missing conference results, later NBA draft outcomes, 2011–12 NCAA game result, and uncaptured statistical fields are unknown—not zero and not inferred.
