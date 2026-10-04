// Docs pages for contributors: how to send a pull request, what gets accepted, and the changelog.
import React from 'react';
import { View } from 'react-native';
import type { Page } from './pages';
import { C, Code, CodeBlock, H2, T } from './ui';

const REPO = 'https://github.com/zia-khan-dev/playglaze';

const List = ({ items }: { items: React.ReactNode[] }) => (
  <View style={{ gap: 6 }}>{items.map((x, i) => <T key={i} color={C.dim}>•  {x}</T>)}</View>
);

export const RESOURCE_PAGES: Page[] = [
  {
    slug: 'contributing', name: 'Contributing', group: 'Resources',
    intro: 'PlayGlaze is open source (MIT). Bug fixes, new components and better docs are welcome. Every change goes through a pull request; nobody pushes to main directly.',
    body: () => (
      <View>
        <H2>How to send a pull request</H2>
        <List items={[
          <>Fork <Code>{REPO}</Code> and create a branch from <Code>main</Code>: <Code>feat/badge-pulse</Code>, <Code>fix/slider-drag</Code> or <Code>docs/panel-examples</Code>.</>,
          <>Install and run the docs: <Code>npm install</Code>, then <Code>cd docs && npm install && npm run dev</Code>.</>,
          <>Make your change. Add or update the component’s docs page (an example and its API table).</>,
          <>Run <Code>npm run check</Code> (type check + docs build). It must pass.</>,
          <>Commit with a Conventional Commit message, push, and open a pull request. Fill in the template.</>,
        ]} />
        <CodeBlock style={{ marginTop: 14 }} code={`git checkout -b feat/badge-pulse\nnpm run check\ngit commit -m "feat(badge): add a pulse animation"\ngit push origin feat/badge-pulse`} />

        <H2>What gets accepted</H2>
        <List items={[
          'It fits the PlayGlaze look: glossy, chunky, a 3D lip, built from one base color with tone().',
          'It is drawn in code: Views, gradients, shadows and react-native-svg. No image files, no copied art from paid kits.',
          'No new runtime dependencies (only react, react-native and react-native-svg).',
          'It works on iOS, Android and the web (react-native-web).',
          'Every color comes from a color prop or the theme. No fixed colors that ignore the theme.',
          'Props are typed, named like the other components (color, size, onPress, style), and have sensible defaults.',
          'The docs page has a live example, the code, and a complete API table.',
          'One topic per pull request, small and easy to review.',
          'The CI checks are green and one maintainer has approved it.',
        ]} />

        <H2>What gets declined</H2>
        <List items={[
          'Game logic, networking, analytics or ads. PlayGlaze is UI only.',
          'Breaking changes to props without a strong reason and a migration note.',
          'Images, fonts or art you do not own or that cannot be shared under MIT.',
          'Large pull requests that mix many unrelated changes.',
        ]} />

        <H2>Commit messages</H2>
        <T color={C.dim}>Use Conventional Commits: <Code>feat:</Code> new component or prop, <Code>fix:</Code> bug fix, <Code>docs:</Code> docs only, <Code>refactor:</Code>, <Code>chore:</Code>. Add <Code>!</Code> for a breaking change, e.g. <Code>feat(panel)!: rename rim to rimColor</Code>.</T>

        <H2>Branch rules</H2>
        <T color={C.dim}><Code>main</Code> is protected: changes land only through a pull request with passing checks and an approving review. Releases are tagged <Code>v0.x.y</Code> and published to npm automatically.</T>
      </View>
    ),
  },
  {
    slug: 'changelog', name: 'Changelog', group: 'Resources',
    intro: 'What changed in each version.',
    body: () => (
      <View>
        <H2>0.1.0</H2>
        <T color={C.dim}>First release.</T>
        <View style={{ height: 8 }} />
        <T color={C.dim}>•  Buttons: GlossButton, RoundButton, CloseButton{'\n'}•  Layout: Panel, Ribbon, Popup{'\n'}•  Navigation: Tabs, Segmented{'\n'}•  Data entry: Toggle, Checkbox, Slider, TextField{'\n'}•  Data display: Badge, Avatar, ProgressRing, Label, Icon{'\n'}•  Game: ProgressBar, Star, Stars, LevelSlot, CounterPill, Coin, ShopTile, Hearts, DailyRewardDay, BoosterSlot, QuestCard, LeaderboardRow, RewardPop{'\n'}•  Themes: bright and dark; any color as a name or hex{'\n'}•  11 ready-made screen templates</T>
      </View>
    ),
  },
];
