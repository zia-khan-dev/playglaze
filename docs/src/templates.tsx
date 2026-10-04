// Ready-made game screens built only from PlayGlaze components. Copy the code and swap in your art.
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Badge, BoosterSlot, Coin, CounterPill, DailyRewardDay, GlossButton, Hearts, Icon, Label, LeaderboardRow,
  LevelSlot, Panel, ProgressBar, QuestCard, Ribbon, RoundButton, Segmented, ShopTile, Slider, Stars, Tabs, Toggle,
} from '../../src';
import type { Page } from './pages';
import { CodeBlock, H2, Row, T, C } from './ui';

/** A phone-sized stage with a sky-to-grass background standing in for the game art. */
function Phone({ children, bg = 'linear-gradient(180deg, #7DD3FC 0%, #A7F3D0 60%, #4ADE80 100%)' }: { children: React.ReactNode; bg?: string }) {
  return (
    <View style={{
      width: 360, height: 700, borderRadius: 36, overflow: 'hidden', borderWidth: 8, borderColor: '#111017',
      backgroundImage: bg, boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    }}>{children}</View>
  );
}

const TopBar = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 16 }}>
    <CounterPill value="5" icon={<RoundButton icon="heart" color="red" size={38} />} width={96} />
    <CounterPill value="1,250" icon={<Coin size={40} />} onAdd={() => {}} width={150} />
  </View>
);
const Dim = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 20 }}>{children}</View>
);

function Home() {
  return (
    <Phone>
      <TopBar />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Ribbon width={260} height={80} title="My Game" />
      </View>
      <View style={{ paddingHorizontal: 40, gap: 18, paddingBottom: 30 }}>
        <GlossButton size="xl"><Icon name="play" size={46} shade="rgba(122,58,10,0.8)" /></GlossButton>
        <Row gap={14}>
          <View style={{ flex: 1, alignItems: 'center' }}><Badge count={1}><RoundButton icon="gift" color="green" /></Badge></View>
          <View style={{ flex: 1, alignItems: 'center' }}><RoundButton icon="cart" /></View>
          <View style={{ flex: 1, alignItems: 'center' }}><RoundButton icon="trophy" color="purple" /></View>
          <View style={{ flex: 1, alignItems: 'center' }}><RoundButton icon="gear" color="blue" /></View>
        </Row>
      </View>
    </Phone>
  );
}
function Pause() {
  return (
    <Phone>
      <Dim>
        <Panel title="Paused" onClose={() => {}} style={{ width: 290 }}>
          <View style={{ gap: 14 }}>
            <GlossButton size="md" color="green"><Icon name="play" size={30} /></GlossButton>
            <GlossButton size="md"><Icon name="refresh" size={28} /></GlossButton>
            <GlossButton size="md" color="red"><Icon name="home" size={28} /></GlossButton>
            <Row gap={14}><RoundButton icon="music" size={52} color="blue" /><RoundButton icon="sound" size={52} color="blue" /></Row>
          </View>
        </Panel>
      </Dim>
    </Phone>
  );
}
function Complete() {
  return (
    <Phone>
      <Dim>
        <Panel titleNode={<Stars count={3} size={30} />} titleWidth={200} style={{ width: 300 }}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <Label size={30} color="#8A4A1C" edge="rgba(255,255,255,0.8)">Level 12</Label>
            <Label size={40} color="#F59E0B" edge="#7A3A0A">8,450</Label>
            <Row gap={10}><Coin size={36} /><Label size={26} color="#8A4A1C" edge="rgba(255,255,255,0.8)">+120</Label></Row>
            <Row gap={12}>
              <View style={{ width: 80 }}><GlossButton size="md" color="blue"><Icon name="refresh" size={26} /></GlossButton></View>
              <View style={{ width: 140 }}><GlossButton size="md" color="green"><Icon name="play" size={30} /></GlossButton></View>
            </Row>
          </View>
        </Panel>
      </Dim>
    </Phone>
  );
}
function Failed() {
  return (
    <Phone bg="linear-gradient(180deg, #64748B 0%, #334155 100%)">
      <Dim>
        <Panel title="Oops!" rim="#E2463B" style={{ width: 300 }}>
          <View style={{ alignItems: 'center', gap: 14 }}>
            <Hearts count={2} size={34} />
            <Label size={20} color="#8A4A1C" edge="rgba(255,255,255,0.8)">Out of moves</Label>
            <GlossButton size="md" color="purple"><Icon name="plus" size={26} /><Label size={20}>5</Label><Coin size={24} /><Label size={18}>200</Label></GlossButton>
            <Row gap={12}>
              <View style={{ width: 110 }}><GlossButton size="md" color="red"><Icon name="close" size={26} /></GlossButton></View>
              <View style={{ width: 110 }}><GlossButton size="md"><Icon name="refresh" size={26} /></GlossButton></View>
            </Row>
          </View>
        </Panel>
      </Dim>
    </Phone>
  );
}
function Daily() {
  return (
    <Phone>
      <Dim>
        <Panel title="Daily" onClose={() => {}} style={{ width: 326 }} padding={14}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            <DailyRewardDay day={1} amount={50} state="claimed" width={78}><Coin size={30} /></DailyRewardDay>
            <DailyRewardDay day={2} amount={80} state="claimed" width={78}><Coin size={30} /></DailyRewardDay>
            <DailyRewardDay day={3} amount={100} state="today" width={78}><Coin size={30} /></DailyRewardDay>
            <DailyRewardDay day={4} amount="x2" width={78}><Icon name="bolt" size={30} color="#FFC21A" shade="#B45309" /></DailyRewardDay>
            <DailyRewardDay day={5} amount={200} width={78}><Coin size={30} /></DailyRewardDay>
            <DailyRewardDay day={6} amount={300} width={78}><Coin size={30} /></DailyRewardDay>
            <DailyRewardDay day={7} amount="Box" big width={78}><Icon name="gift" size={40} color="#A12CF0" shade="#5B21B6" /></DailyRewardDay>
          </View>
          <GlossButton size="md" color="green" style={{ marginTop: 14 }}><Icon name="check" size={28} /></GlossButton>
        </Panel>
      </Dim>
    </Phone>
  );
}
function Shop() {
  const [tab, setTab] = useState('coins');
  return (
    <Phone>
      <TopBar />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Panel title="Shop" onClose={() => {}} style={{ width: 330 }} padding={12}>
          <Tabs items={[{ key: 'coins', icon: 'star' }, { key: 'boost', icon: 'bolt' }, { key: 'packs', icon: 'gift' }]} value={tab} onChange={setTab} height={40} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center', paddingTop: 16 }}>
            <ShopTile price="$0.99" color="green" width={124}><Coin size={50} /></ShopTile>
            <ShopTile price="$4.99" color="green" width={124} badge={<RoundButton icon="star" color="red" size={30} />}><Row gap={0}><Coin size={42} /><Coin size={42} /></Row></ShopTile>
            <ShopTile price={500} priceIcon={<Coin size={18} />} width={124}><Icon name="bolt" size={52} color="#FFC21A" shade="#B45309" /></ShopTile>
            <ShopTile price={900} priceIcon={<Coin size={18} />} width={124}><Icon name="heart" size={52} color="#F5332B" shade="#9B1C1C" /></ShopTile>
          </View>
        </Panel>
      </View>
    </Phone>
  );
}
function Leaders() {
  const [range, setRange] = useState('week');
  return (
    <Phone>
      <View style={{ flex: 1, justifyContent: 'center', padding: 12 }}>
        <Panel title="Top" onClose={() => {}} padding={12}>
          <Segmented items={[{ key: 'day', label: 'Day' }, { key: 'week', label: 'Week' }, { key: 'all', icon: 'trophy' }]} value={range} onChange={setRange} color="purple" />
          <View style={{ gap: 8, marginTop: 14 }}>
            <LeaderboardRow rank={1} name="Mia" score="120,400" avatar={<Avatar size={40} />} />
            <LeaderboardRow rank={2} name="Kenji" score="98,150" avatar={<Avatar size={40} color="blue" />} />
            <LeaderboardRow rank={3} name="Aisha" score="91,020" avatar={<Avatar size={40} color="purple" />} />
            <LeaderboardRow rank={4} name="Leo" score="77,300" avatar={<Avatar size={40} color="green" />} />
            <LeaderboardRow rank={14} name="You" score="40,775" me avatar={<Avatar size={40} />} />
          </View>
        </Panel>
      </View>
    </Phone>
  );
}
function Settings() {
  const [m, setM] = useState(true), [s, setS] = useState(true), [vib, setVib] = useState(false), [v, setV] = useState(0.7);
  const line = (icon: 'music' | 'sound' | 'bolt', val: boolean, set: (b: boolean) => void) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Icon name={icon} size={32} color="#9A5A2C" shade={null} /><Toggle value={val} onChange={set} />
    </View>
  );
  return (
    <Phone>
      <Dim>
        <Panel title="Settings" onClose={() => {}} style={{ width: 300 }}>
          <View style={{ gap: 16 }}>
            {line('music', m, setM)}
            <Slider value={v} onChange={setV} />
            {line('sound', s, setS)}
            {line('bolt', vib, setVib)}
            <Row gap={12}>
              <View style={{ flex: 1 }}><GlossButton size="sm" color="blue"><Icon name="user" size={22} /></GlossButton></View>
              <View style={{ flex: 1 }}><GlossButton size="sm" color="purple"><Icon name="refresh" size={22} /></GlossButton></View>
            </Row>
          </View>
        </Panel>
      </Dim>
    </Phone>
  );
}
function Game() {
  const [sel, setSel] = useState(0);
  return (
    <Phone bg="linear-gradient(180deg, #FDE68A 0%, #FDBA74 100%)">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14 }}>
        <RoundButton icon="pause" color="blue" size={48} />
        <View style={{ flex: 1 }}><ProgressBar value={0.62} color="green" height={26}><Stars count={2} size={14} /></ProgressBar></View>
      </View>
      <View style={{ flex: 1, margin: 16, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.35)', alignItems: 'center', justifyContent: 'center' }}>
        <T color="#7A3A0A" weight="800">your game here</T>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, paddingBottom: 26 }}>
        {(['bolt', 'refresh', 'star'] as const).map((n, i) => <BoosterSlot key={n} icon={n} count={[2, 0, 5][i]} selected={sel === i} onPress={() => setSel(i)} />)}
      </View>
    </Phone>
  );
}
function Quests() {
  return (
    <Phone>
      <View style={{ flex: 1, justifyContent: 'center', padding: 12 }}>
        <Panel title="Quests" onClose={() => {}} padding={12}>
          <View style={{ gap: 10 }}>
            <QuestCard title="Win 5 levels" progress={5} total={5} reward={<Coin size={24} />} onClaim={() => {}} />
            <QuestCard title="Pop 200 bubbles" progress={140} total={200} reward={<Coin size={24} />} />
            <QuestCard title="Use 3 boosters" progress={1} total={3} reward={<Coin size={24} />} />
            <QuestCard title="Get 3 stars" progress={0} total={1} color="purple" reward={<Coin size={24} />} />
          </View>
        </Panel>
      </View>
    </Phone>
  );
}
function Levels() {
  return (
    <Phone>
      <TopBar />
      <View style={{ flex: 1, justifyContent: 'center', padding: 14 }}>
        <Panel title="Levels" padding={14}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <LevelSlot key={i} level={i + 1} size={78} stars={i < 4 ? [3, 2, 3, 1][i] : 0} state={i < 4 ? 'done' : i === 4 ? 'current' : 'locked'} />
            ))}
          </View>
        </Panel>
      </View>
    </Phone>
  );
}

type T2 = { slug: string; name: string; intro: string; Screen: () => React.ReactElement; uses: string; code: string };
const SCREENS: T2[] = [
  { slug: 'tpl-home', name: 'Home', intro: 'The home screen: lives and coins on top, the logo plate, a big play button and four round buttons (daily gift with a badge, shop, leaderboard, settings).', Screen: Home,
    uses: 'CounterPill, Coin, Ribbon, GlossButton, Badge, RoundButton',
    code: `<TopBar />  {/* CounterPill for lives and coins */}\n<Ribbon width={260} height={80} title="My Game" />\n<GlossButton size="xl" onPress={play}><Icon name="play" size={46} /></GlossButton>\n<Badge count={1}><RoundButton icon="gift" color="green" /></Badge>\n<RoundButton icon="cart" />\n<RoundButton icon="trophy" color="purple" />\n<RoundButton icon="gear" color="blue" />` },
  { slug: 'tpl-game', name: 'Game HUD', intro: 'The in-game bar: pause, a star progress bar, and booster slots at the bottom.', Screen: Game,
    uses: 'RoundButton, ProgressBar, Stars, BoosterSlot',
    code: `<RoundButton icon="pause" color="blue" size={48} onPress={pause} />\n<ProgressBar value={score / goal} color="green" height={26}>\n  <Stars count={stars} size={14} />\n</ProgressBar>\n{boosters.map(b => (\n  <BoosterSlot key={b.id} icon={b.icon} count={b.count} selected={sel === b.id} onPress={() => setSel(b.id)} />\n))}` },
  { slug: 'tpl-levels', name: 'Level select', intro: 'A grid of level slots: done with stars, the current one ringed, the rest locked.', Screen: Levels,
    uses: 'Panel, LevelSlot, CounterPill',
    code: `<Panel title="Levels">\n  {levels.map(l => (\n    <LevelSlot key={l.n} level={l.n} stars={l.stars} state={l.state} size={78} onPress={() => open(l.n)} />\n  ))}\n</Panel>` },
  { slug: 'tpl-pause', name: 'Pause', intro: 'Resume, restart and home, plus music and sound buttons.', Screen: Pause,
    uses: 'Panel, GlossButton, RoundButton, Icon',
    code: `<Popup visible={paused} title="Paused" onClose={resume}>\n  <GlossButton size="md" color="green" onPress={resume}><Icon name="play" /></GlossButton>\n  <GlossButton size="md" onPress={restart}><Icon name="refresh" /></GlossButton>\n  <GlossButton size="md" color="red" onPress={home}><Icon name="home" /></GlossButton>\n</Popup>` },
  { slug: 'tpl-complete', name: 'Level complete', intro: 'Stars on the title plate, the score, the coin reward, replay and next.', Screen: Complete,
    uses: 'Panel (titleNode), Stars, Label, Coin, GlossButton',
    code: `<Popup visible title="" titleNode={<Stars count={stars} size={30} />} titleWidth={200}>\n  <Label size={40}>{score}</Label>\n  <Coin size={36} /><Label size={26}>+{coins}</Label>\n  <GlossButton size="md" color="blue" onPress={replay}><Icon name="refresh" /></GlossButton>\n  <GlossButton size="md" color="green" onPress={next}><Icon name="play" /></GlossButton>\n</Popup>` },
  { slug: 'tpl-failed', name: 'Level failed', intro: 'Lives left, a "+5 moves for 200 coins" offer, quit or retry.', Screen: Failed,
    uses: 'Panel (rim), Hearts, GlossButton, Coin',
    code: `<Popup visible title="Oops!" rim="#E2463B">\n  <Hearts count={lives} size={34} />\n  <GlossButton size="md" color="purple" onPress={buyMoves}>\n    <Icon name="plus" /><Label>5</Label><Coin size={24} /><Label>200</Label>\n  </GlossButton>\n  <GlossButton size="md" color="red" onPress={quit}><Icon name="close" /></GlossButton>\n  <GlossButton size="md" onPress={retry}><Icon name="refresh" /></GlossButton>\n</Popup>` },
  { slug: 'tpl-daily', name: 'Daily reward', intro: 'A 7-day calendar: claimed days checked, today ringed, day 7 big.', Screen: Daily,
    uses: 'Panel, DailyRewardDay, Coin, GlossButton',
    code: `<Popup visible title="Daily" onClose={close}>\n  {days.map(d => (\n    <DailyRewardDay key={d.day} day={d.day} amount={d.amount} state={d.state} big={d.day === 7}>\n      <Coin size={30} />\n    </DailyRewardDay>\n  ))}\n  <GlossButton size="md" color="green" onPress={claim}><Icon name="check" /></GlossButton>\n</Popup>` },
  { slug: 'tpl-shop', name: 'Shop', intro: 'Tabs for coins, boosters and packs, and shop tiles with real-money or coin prices.', Screen: Shop,
    uses: 'Panel, Tabs, ShopTile, Coin, RoundButton (sale badge)',
    code: `<Panel title="Shop" onClose={close}>\n  <Tabs items={[{ key: 'coins', icon: 'star' }, { key: 'boost', icon: 'bolt' }, { key: 'packs', icon: 'gift' }]} value={tab} onChange={setTab} />\n  <ShopTile price="$0.99" color="green" onBuy={buy}><Coin size={50} /></ShopTile>\n  <ShopTile price={500} priceIcon={<Coin size={18} />} onBuy={buy}><Icon name="bolt" size={52} /></ShopTile>\n</Panel>` },
  { slug: 'tpl-quests', name: 'Quests', intro: 'Daily missions with progress and a claim button when done.', Screen: Quests,
    uses: 'Panel, QuestCard, Coin',
    code: `<Panel title="Quests" onClose={close}>\n  {quests.map(q => (\n    <QuestCard key={q.id} title={q.title} progress={q.done} total={q.goal} reward={<Coin size={24} />} onClaim={() => claim(q.id)} />\n  ))}\n</Panel>` },
  { slug: 'tpl-leaderboard', name: 'Leaderboard', intro: 'Day / week / all-time filter and ranked rows with your own row highlighted.', Screen: Leaders,
    uses: 'Panel, Segmented, LeaderboardRow, Avatar',
    code: `<Panel title="Top" onClose={close}>\n  <Segmented items={[{ key: 'day', label: 'Day' }, { key: 'week', label: 'Week' }, { key: 'all', icon: 'trophy' }]} value={range} onChange={setRange} color="purple" />\n  {rows.map(r => <LeaderboardRow key={r.id} rank={r.rank} name={r.name} score={r.score} me={r.id === myId} />)}\n</Panel>` },
  { slug: 'tpl-settings', name: 'Settings', intro: 'Music, sound and vibration toggles, a volume slider, and account buttons.', Screen: Settings,
    uses: 'Panel, Toggle, Slider, GlossButton, Icon',
    code: `<Popup visible title="Settings" onClose={close}>\n  <Icon name="music" /><Toggle value={music} onChange={setMusic} />\n  <Slider value={volume} onChange={setVolume} />\n  <Icon name="sound" /><Toggle value={sound} onChange={setSound} />\n</Popup>` },
];

export const TEMPLATE_PAGES: Page[] = SCREENS.map(s => ({
  slug: s.slug, name: s.name, group: 'Templates', title: `${s.name} screen`,
  intro: s.intro,
  body: () => (
    <View>
      <View style={{ alignItems: 'center', paddingVertical: 12 }}><s.Screen /></View>
      <H2>Built with</H2>
      <T color={C.dim}>{s.uses}</T>
      <H2>Code</H2>
      <CodeBlock code={s.code} />
    </View>
  ),
}));
