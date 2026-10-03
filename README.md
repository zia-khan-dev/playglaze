# PlayGlaze

Glossy, chunky **game UI for React Native and the web**, drawn entirely in code.
Every component takes any color: one base color makes the highlight, face, stripes and 3D lip.

UI only: no game logic, no images, no native code beyond `react-native-svg`.

## Install

```sh
npm install playglaze react-native-svg
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
| Containers | `Panel`, `Ribbon` |
| Controls | `Toggle`, `Checkbox`, `Slider`, `ProgressBar` |
| Game parts | `Star`, `Stars`, `LevelSlot`, `CounterPill`, `Coin`, `ShopTile` |
| Basics | `Label`, `Icon` (20 common game icons), `Stripes`, `Gloss` |
| Theme | `ThemeProvider`, `bright`, `dark`, `useTheme`, `useTone`, color helpers |

Colors: `orange`, `yellow`, `red`, `blue`, `purple`, `green`, `pink`, `gray`, or any hex such as `#14B8A6`.

## Docs site

The showcase in `docs/` runs the same components through react-native-web (Vite).

```sh
cd docs && npm install && npm run dev
```

Deploy on Vercel: import the repo and set **Root Directory** to `docs` (framework: Vite).

## License

MIT
