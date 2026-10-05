# Changelog

## 0.5.0

- Skins: `plate` sets the Ribbon title shape per skin (`cookie`, `plate`, `banner`); cartoon and minimal use `plate`.
- Docs: optional Pro pages, shown only in local builds that have the private `@playglaze/pro` package next to this repo.

## 0.4.0

- **Select:** a select box with grouped options and tags.
- **Skin features for richer skins:** `texture` / `faceTexture` (wood, stone, carbon, halftone, paper, felt, metal, scratch, scanlines, pixel, bubbles, sparkle), `drop: 'glow'` and `label: 'glow'` with a `glow` color, `trim` (a second line inside the outline), `skew` (slanted bar buttons), and `theme` (colors that suit the skin, applied under your own theme). New `Texture` export.
- Icons: `down`, `sun`, `moon`.
- Docs: the skin picker is now a Select; a light/dark button switches the site and the components (`bright` / `dark` theme). `?mode=light` links work.

## 0.3.0

- **Two new free skins:** `cartoon` (flat colors, thick ink outline, hard lip, outlined labels) and `minimal` (flat hyper-casual, small corners, no lips or gloss). `SKINS` lists all free skins by name.
- Docs: a skin switcher in the top bar (remembered per browser; `?skin=cartoon` links work too).

## 0.2.0

- **Skins:** the material and shapes of every component (gradients, gloss, stripes, lips, shadows, outlines, corner radius, label edge) now come from a `Skin`, separate from the theme's colors. `<ThemeProvider theme={...} skin={...}>` or `<SkinProvider>`. `glossy` is the default and looks exactly like 0.1.0.
- New exports: `Skin`, `glossy`, `SkinProvider`, `useSkin`, `skinKit`, `shadows`, `Surface`. `Gloss` takes an optional `end` alpha.
## 0.1.1

- **Theme:** the dark theme now has its own deep jewel-tone palette (it was almost the same as the bright one).

## 0.1.0

First release.

- **Buttons:** GlossButton, RoundButton, CloseButton
- **Layout:** Panel, Ribbon, Popup
- **Navigation:** Tabs, Segmented
- **Data entry:** Toggle, Checkbox, Slider, TextField
- **Data display:** Badge, Avatar, ProgressRing, Label, Icon
- **Game:** ProgressBar, Star, Stars, LevelSlot, CounterPill, Coin, ShopTile, Hearts, DailyRewardDay, BoosterSlot, QuestCard, LeaderboardRow, RewardPop
- **Themes:** `bright` (sunny candy colors) and `dark` (deep jewel tones); any color as a name or hex
- **Docs:** a page per component with live examples and API tables, plus 11 screen templates
