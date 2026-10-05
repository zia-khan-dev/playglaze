# PlayGlaze

[![npm](https://img.shields.io/npm/v/playglaze.svg)](https://www.npmjs.com/package/playglaze) [![CI](https://github.com/zia-khan-dev/playglaze/actions/workflows/ci.yml/badge.svg)](https://github.com/zia-khan-dev/playglaze/actions/workflows/ci.yml) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Glossy, chunky **game UI for React Native and the web**, drawn entirely in code.
Every component takes any color: one base color makes the highlight, face, stripes and 3D lip.

UI only: no game logic, no images, no native code beyond `react-native-svg`.

## Install

```sh
npm install playglaze react-native-svg
# or
yarn add playglaze react-native-svg
```

Needs React Native **0.77+** with the New Architecture (it uses `boxShadow` and `backgroundImage` styles), or **react-native-web** for websites.

## Use

```tsx
import { ThemeProvider, bright, GlossButton, Panel, Icon } from 'playglaze';

export default function Pause() {
  return (
    <ThemeProvider theme={{ ...bright, displayFont: 'LilitaOne' }}>
      <Panel title="Paused" onClose={close}>
        <GlossButton onPress={resume}><Icon name="play" size={32} /></GlossButton>
        <GlossButton color="red" title="Quit" onPress={quit} />
      </Panel>
    </ThemeProvider>
  );
}
```

## Components

| Group | Components |
|---|---|
| Buttons | `GlossButton`, `RoundButton`, `CloseButton` |
| Layout | `Panel`, `Ribbon`, `Popup` |
| Navigation | `Tabs`, `Segmented` |
| Data entry | `Toggle`, `Checkbox`, `Slider`, `TextField` |
| Data display | `Badge`, `Avatar`, `ProgressRing`, `Label`, `Icon` (20 game icons) |
| Game | `ProgressBar`, `Star`, `Stars`, `LevelSlot`, `CounterPill`, `Coin`, `ShopTile`, `Hearts`, `DailyRewardDay`, `BoosterSlot`, `QuestCard`, `LeaderboardRow`, `RewardPop` |
| Theme | `ThemeProvider`, `bright`, `dark`, `useTheme`, `useTone`, color helpers |

Colors: `orange`, `yellow`, `red`, `blue`, `purple`, `green`, `pink`, `gray`, or any hex such as `#14B8A6`.

The docs also include **11 ready-made screens**: Home, Game HUD, Level select, Pause, Level complete, Level failed, Daily reward, Shop, Quests, Leaderboard and Settings.

## CLI: pull a Studio project

Design your colors in **PlayGlaze Studio**, then get the theme, ready-made screens and PNG assets into your game:

```sh
npx playglaze login            # paste your token from Studio → Export → CLI
npx playglaze pull <project>   # writes ./playglaze/theme.ts, screens/ and assets/
npx playglaze pull             # later: update the same project
```

## Docs site

The showcase in `docs/` runs the same components through react-native-web (Vite).

```sh
cd docs && npm install && npm run dev
```

Deploy on Vercel: import the repo and set **Root Directory** to `docs` (framework: Vite).

## Contributing

Pull requests are welcome — read [CONTRIBUTING.md](CONTRIBUTING.md) first. `main` is protected: every change goes through a reviewed pull request.

## License

MIT
