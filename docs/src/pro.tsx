// Pro screen pages: only in local builds where the private playglaze-pro folder sits next to this repo.
// The public build finds nothing here, so it ships no pro code.
import React, { useState } from 'react';
import { View } from 'react-native';
import { Coin, Icon, RoundButton } from '../../src';
import type { Page } from './pages';
import { Phone } from './templates';
import { CodeBlock, H2, T, C } from './ui';

const mods = (import.meta as any).glob('../../../playglaze-pro/src/screens.tsx', { eager: true }) as Record<string, any>;
const P = Object.values(mods)[0];

const SKY = 'linear-gradient(180deg, #7DD3FC 0%, #A7F3D0 60%, #4ADE80 100%)';

function ShopDemo() {
  return (
    <Phone bg={SKY}><P.Backdrop>
      <P.ShopScreen onBuy={() => {}} onClose={() => {}} tabs={[
        { key: 'coins', icon: 'star', items: [
          { id: 'c1', price: '$0.99', art: <Coin size={50} /> },
          { id: 'c2', price: '$4.99', art: <View style={{ flexDirection: 'row' }}><Coin size={42} /><Coin size={42} /></View>, badge: <RoundButton icon="star" color="red" size={30} /> },
          { id: 'b1', price: 500, art: <Icon name="bolt" size={52} color="#FFC21A" shade="#B45309" /> },
          { id: 'h1', price: 900, art: <Icon name="heart" size={52} color="#F5332B" shade="#9B1C1C" /> },
        ] },
        { key: 'packs', icon: 'gift', items: [{ id: 'p1', price: '$2.99', art: <Icon name="gift" size={56} color="#A12CF0" shade="#5B21B6" /> }] },
      ]} />
    </P.Backdrop></Phone>
  );
}
function LevelsDemo() {
  const levels = Array.from({ length: 50 }, (_, i) => ({
    stars: i < 6 ? [3, 2, 3, 1, 3, 2][i] : 0, state: i < 6 ? 'done' : i === 6 ? 'current' : 'locked',
    tier: (i + 1) % 10 === 0 ? 'super' : (i + 1) % 5 === 0 ? 'hard' : 'normal',
  }));
  return <Phone bg={SKY}><P.Backdrop dim={0.2}><P.LevelMapScreen levels={levels} onPick={() => {}} /></P.Backdrop></Phone>;
}
function DailyDemo() {
  const [claimed, setClaimed] = useState(false);
  const days = [50, 80, 100, 'x2', 200, 300, 'Box'].map((a, i) => ({
    amount: a, art: i === 3 ? <Icon name="bolt" size={30} color="#FFC21A" shade="#B45309" /> : i === 6 ? <Icon name="gift" size={40} color="#A12CF0" shade="#5B21B6" /> : undefined,
  }));
  return <Phone bg={SKY}><P.Backdrop><P.DailyRewardScreen days={days} today={2} claimedToday={claimed} onClaim={() => setClaimed(true)} onClose={() => {}} /></P.Backdrop></Phone>;
}
function CompleteDemo() {
  const [k, setK] = useState(0);
  return <Phone bg={SKY}><P.Backdrop><P.LevelCompleteScreen key={k} level={12} stars={3} score={8450} coins={120} onReplay={() => setK(x => x + 1)} onNext={() => {}} onDouble={() => {}} /></P.Backdrop></Phone>;
}

const SCREENS = [
  { slug: 'pro-shop', name: 'ShopScreen', Demo: ShopDemo, intro: 'Tabs of items; real-money prices are green, coin prices show a coin. You get onBuy(item, tab).',
    code: `<ShopScreen\n  tabs={[{ key: 'coins', icon: 'star', items: [{ id: 'c1', price: '$0.99', art: <Coin size={50} /> }] }]}\n  onBuy={(item) => buy(item.id)}\n  onClose={close}\n/>` },
  { slug: 'pro-levels', name: 'LevelMapScreen', Demo: LevelsDemo, intro: 'Paged level grid that opens on the current level; hard levels red, super-hard purple.',
    code: `<LevelMapScreen\n  levels={levels} // { stars, state: 'done' | 'current' | 'open' | 'locked', tier?: 'hard' | 'super' }[]\n  onPick={(i) => startLevel(i)}\n/>` },
  { slug: 'pro-daily', name: 'DailyRewardScreen', Demo: DailyDemo, intro: 'A 7-day calendar from data; days before today show as claimed, the last day is big.',
    code: `<DailyRewardScreen days={days} today={2} claimedToday={claimed} onClaim={claim} onClose={close} />` },
  { slug: 'pro-complete', name: 'LevelCompleteScreen', Demo: CompleteDemo, intro: 'Stars pop in, score and coins count up, optional ×2 coins button for a rewarded ad. Tap replay to see it again.',
    code: `<LevelCompleteScreen level={12} stars={3} score={8450} coins={120} onNext={next} onReplay={replay} onDouble={watchAd} />` },
];

export const PRO_DEMOS: { name: string; Demo: () => React.ReactElement }[] = !P ? [] : SCREENS.map(s => ({ name: s.name, Demo: s.Demo }));

export const PRO_PAGES: Page[] = !P ? [] : SCREENS.map(s => ({
  slug: s.slug, name: s.name, group: 'Pro', title: `${s.name} (Pro)`, intro: s.intro,
  body: () => (
    <View>
      <View style={{ alignItems: 'center', paddingVertical: 12 }}><s.Demo /></View>
      <T color={C.dim}>{"import { " + s.name + " } from '@playglaze/pro';"}</T>
      <H2>Code</H2>
      <CodeBlock code={s.code} />
    </View>
  ),
}));
