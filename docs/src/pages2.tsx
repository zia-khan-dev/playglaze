// Docs pages for the second set of components.
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Badge, BoosterSlot, Coin, DailyRewardDay, GlossButton, Hearts, Icon, Label, LeaderboardRow, Popup,
  ProgressRing, QuestCard, RewardPop, RoundButton, Segmented, Select, Tabs, TextField,
} from '../../src';
import type { Page } from './pages';
import { Row, T, C } from './ui';

const STYLE = ['style', 'Extra style for the outer view.', 'StyleProp<ViewStyle>'] as [string, string, string];
const colorType = 'ColorName | string';

function PopupDemo() {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ width: '100%', height: 420, borderRadius: 12, overflow: 'hidden', backgroundImage: 'linear-gradient(180deg, #7DD3FC 0%, #4ADE80 100%)', alignItems: 'center', justifyContent: 'center' }}>
      <GlossButton width={200} title="Open popup" onPress={() => setOpen(true)} />
      <Popup visible={open} onClose={() => setOpen(false)} title="Reward" width={290}>
        <View style={{ alignItems: 'center', gap: 14 }}>
          <Coin size={72} />
          <Label size={30} color="#8A4A1C" edge="rgba(255,255,255,0.8)">+250</Label>
          <GlossButton size="md" color="green" onPress={() => setOpen(false)}><Icon name="check" size={28} /></GlossButton>
        </View>
      </Popup>
    </View>
  );
}
function TabsDemo() {
  const [tab, setTab] = useState('coins');
  return (
    <View style={{ width: 340 }}>
      <Tabs items={[{ key: 'coins', label: 'Coins' }, { key: 'gems', label: 'Gems' }, { key: 'packs', icon: 'gift' }]} value={tab} onChange={setTab} />
      <View style={{ height: 110, backgroundColor: '#FCF3DE', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
        <Label size={22} color="#8A4A1C" edge="rgba(255,255,255,0.8)">{tab}</Label>
      </View>
    </View>
  );
}
const SIZES = [
  { value: 'easy', label: 'Easy', group: 'Normal' }, { value: 'medium', label: 'Medium', group: 'Normal' },
  { value: 'hard', label: 'Hard', group: 'Challenge', badge: 'x1.5' }, { value: 'super', label: 'Super hard', group: 'Challenge', badge: 'x2' },
];
function SelectDemo() {
  const [a, setA] = useState('medium'), [b, setB] = useState<string>();
  return (
    <View style={{ height: 300, flexDirection: 'row', gap: 18, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Select options={SIZES} value={a} onChange={setA} width={220} />
      <Select options={SIZES} value={b} onChange={setB} placeholder="Difficulty" color="blue" width={220} />
    </View>
  );
}

function SegDemo() {
  const [a, setA] = useState('one'), [b, setB] = useState('week');
  return (
    <View style={{ width: 340, gap: 18 }}>
      <Segmented items={[{ key: 'one', label: 'One' }, { key: 'two', label: 'Two' }, { key: 'three', label: 'Three' }]} value={a} onChange={setA} />
      <Segmented color="purple" items={[{ key: 'day', label: 'Day' }, { key: 'week', label: 'Week' }, { key: 'all', icon: 'trophy' }]} value={b} onChange={setB} />
    </View>
  );
}
function FieldDemo() {
  const [v, setV] = useState('');
  return <View style={{ width: 320, gap: 14 }}><TextField icon="user" placeholder="Player name" value={v} onChangeText={setV} /><TextField color="blue" placeholder="Team code" /></View>;
}
function RewardPopDemo() {
  const [k, setK] = useState(0);
  return (
    <Row gap={30}>
      <GlossButton width={160} color="green" title="Collect" onPress={() => setK(x => x + 1)} />
      <View style={{ width: 120, height: 60, justifyContent: 'flex-end' }}>
        {k > 0 ? <RewardPop key={k}><Coin size={28} /><Label size={26}>+50</Label></RewardPop> : null}
      </View>
    </Row>
  );
}
function BoosterDemo() {
  const [sel, setSel] = useState(1);
  return <Row gap={18}>{(['bolt', 'refresh', 'star', 'heart'] as const).map((n, i) => <BoosterSlot key={n} icon={n} count={[3, 1, 0, 12][i]} selected={sel === i} onPress={() => setSel(i)} />)}</Row>;
}

export const MORE_PAGES: Page[] = [
  {
    slug: 'tabs', name: 'Tabs', group: 'Navigation',
    intro: 'Folder tabs that sit on top of a panel: the active tab matches the panel face. Use them for shop sections and leaderboards.',
    import: "import { Tabs } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Labels, icons, or both.', render: () => <TabsDemo />,
      code: `const [tab, setTab] = useState('coins');\n\n<Tabs\n  items={[{ key: 'coins', label: 'Coins' }, { key: 'gems', label: 'Gems' }, { key: 'packs', icon: 'gift' }]}\n  value={tab}\n  onChange={setTab}\n/>` }],
    api: [{ rows: [
      ['items', 'The tabs.', '{ key: string; label?: string; icon?: IconName }[]'],
      ['value', 'Key of the active tab.', 'string'],
      ['onChange', 'Called with the tapped key.', '(key: string) => void'],
      ['height', 'Height of the active tab.', 'number', '44'],
      STYLE,
    ] }],
  },
  {
    slug: 'segmented', name: 'Segmented', group: 'Navigation',
    intro: 'A joined row of glossy options. The chosen one is colored, the others gray. Good for filters (day / week / all) and modes.',
    import: "import { Segmented } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => <SegDemo />,
      code: `<Segmented\n  items={[{ key: 'one', label: 'One' }, { key: 'two', label: 'Two' }, { key: 'three', label: 'Three' }]}\n  value={mode}\n  onChange={setMode}\n/>` }],
    api: [{ rows: [
      ['items', 'The options.', '{ key: string; label?: string; icon?: IconName }[]'],
      ['value', 'Key of the chosen option.', 'string'],
      ['onChange', 'Called with the tapped key.', '(key: string) => void'],
      ['color', 'Color of the chosen option.', colorType, 'theme.primary'],
      ['height', 'Height.', 'number', '40'],
      STYLE,
    ] }],
  },
  {
    slug: 'select', name: 'Select', group: 'Data entry',
    intro: 'A select box: a rimmed field showing the chosen option, opening a list under it. Options can be grouped and tagged. The docs use it to pick a skin.',
    import: "import { Select } from 'playglaze';",
    demos: [{ title: 'Grouped options with tags', render: () => <SelectDemo />,
      code: `<Select\n  options={[\n    { value: 'easy', label: 'Easy', group: 'Normal' },\n    { value: 'hard', label: 'Hard', group: 'Challenge', badge: 'x1.5' },\n  ]}\n  value={level}\n  onChange={setLevel}\n  width={220}\n/>` }],
    api: [{ rows: [
      ['options', 'The choices; same group values are listed under one heading.', '{ value: string; label: string; group?: string; badge?: string }[]'],
      ['value', 'The chosen value.', 'string'],
      ['onChange', 'Called with the picked value.', '(value: string) => void'],
      ['placeholder', 'Shown when nothing is chosen.', 'string', "'Select'"],
      ['color', 'Rim color.', colorType, 'theme.primary'],
      ['width', 'Width.', 'number', '200'],
      ['height', 'Height of the field.', 'number', '44'],
      ['maxRows', 'Rows shown before the list scrolls.', 'number', '8'],
      STYLE,
    ] }],
  },
  {
    slug: 'text-field', name: 'TextField', group: 'Data entry',
    intro: 'A white text box with a glossy rim, for player names, team codes and search.',
    import: "import { TextField } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => <FieldDemo />, code: `<TextField icon="user" placeholder="Player name" value={name} onChangeText={setName} />\n<TextField color="blue" placeholder="Team code" />` }],
    api: [{ rows: [
      ['icon', 'Icon at the start.', 'IconName'],
      ['color', 'Rim color.', colorType, 'theme.primary'],
      ['height', 'Height.', 'number', '48'],
      ['…', 'Any TextInput prop (value, onChangeText, placeholder, secureTextEntry…).', 'TextInputProps'],
      STYLE,
    ] }],
  },
  {
    slug: 'badge', name: 'Badge', group: 'Data display',
    intro: 'A red count bubble or dot on the corner of a button or icon: new items, unread mail, free rewards.',
    import: "import { Badge } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => (
      <Row gap={30}>
        <Badge count={3}><RoundButton icon="gift" color="green" /></Badge>
        <Badge count={120}><RoundButton icon="cart" /></Badge>
        <Badge dot><RoundButton icon="gear" color="blue" /></Badge>
        <Badge count={1} color="purple"><RoundButton icon="trophy" color="yellow" /></Badge>
      </Row>),
      code: `<Badge count={3}>\n  <RoundButton icon="gift" color="green" />\n</Badge>\n<Badge dot>\n  <RoundButton icon="gear" />\n</Badge>` }],
    api: [{ rows: [
      ['count', 'Number to show. 0 hides the badge.', 'number'],
      ['dot', 'Show a small dot instead of a number.', 'boolean', 'false'],
      ['max', 'Above this it shows "max+".', 'number', '99'],
      ['color', 'Bubble color.', colorType, "'red'"],
      ['children', 'What the badge sits on.', 'ReactNode'],
      STYLE,
    ] }],
  },
  {
    slug: 'avatar', name: 'Avatar', group: 'Data display',
    intro: 'A player picture in a thick glossy frame, with an optional level badge.',
    import: "import { Avatar } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Pass an image source, your own content, or nothing (a person icon).', render: () => (
      <Row gap={24}>
        <Avatar />
        <Avatar size={96} level={12} />
        <Avatar color="purple" level={7}><Label size={30}>ZK</Label></Avatar>
        <Avatar color="blue" size={56}><Icon name="star" size={30} color="#FFC21A" shade="#B45309" /></Avatar>
      </Row>),
      code: `<Avatar source={{ uri: photoUrl }} level={12} size={96} />\n<Avatar color="purple" level={7}>\n  <Label size={30}>ZK</Label>\n</Avatar>` }],
    api: [{ rows: [
      ['source', 'Image to show.', 'ImageSourcePropType'],
      ['children', 'Content when there is no image.', 'ReactNode'],
      ['size', 'Width and height.', 'number', '72'],
      ['color', 'Frame color.', colorType, 'theme.slot.rim'],
      ['level', 'Level number on a badge under the frame.', 'number'],
      STYLE,
    ] }],
  },
  {
    slug: 'progress-ring', name: 'ProgressRing', group: 'Data display',
    intro: 'A round progress ring for timers, loading and XP, with anything in the middle.',
    import: "import { ProgressRing } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => (
      <Row gap={24}>
        <ProgressRing value={0.75}><Label size={24}>75%</Label></ProgressRing>
        <ProgressRing value={0.4} color="blue" size={110}><Icon name="bolt" size={44} color="#FFC21A" shade="#B45309" /></ProgressRing>
        <ProgressRing value={0.9} color="green" size={80} thickness={8}><Label size={20}>9s</Label></ProgressRing>
      </Row>),
      code: `<ProgressRing value={0.75}>\n  <Label size={24}>75%</Label>\n</ProgressRing>` }],
    api: [{ rows: [
      ['value', 'Fill from 0 to 1.', 'number'],
      ['size', 'Diameter.', 'number', '96'],
      ['thickness', 'Ring thickness.', 'number', 'size × 0.14'],
      ['color', 'Fill color.', colorType, 'theme.primary'],
      ['groove', 'Groove color.', 'string', 'theme.groove'],
      ['children', 'Content in the middle.', 'ReactNode'],
    ] }],
  },
  {
    slug: 'popup', name: 'Popup', group: 'Feedback',
    intro: 'A Panel that pops in over a dimmed backdrop. Use it for pause, rewards, confirmations and offers. It takes every Panel prop.',
    import: "import { Popup } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Tap the button. Close with ×, the check button, or the backdrop.', render: () => <PopupDemo />,
      code: `const [open, setOpen] = useState(false);\n\n<Popup visible={open} onClose={() => setOpen(false)} title="Reward">\n  <Coin size={72} />\n  <Label size={30}>+250</Label>\n  <GlossButton color="green" onPress={() => setOpen(false)}>\n    <Icon name="check" />\n  </GlossButton>\n</Popup>` }],
    api: [{ rows: [
      ['visible', 'Show or hide (animated).', 'boolean'],
      ['onClose', 'Close button and backdrop tap.', '() => void'],
      ['closeOnBackdrop', 'Tapping the backdrop calls onClose.', 'boolean', 'true'],
      ['dim', 'Backdrop darkness, 0–1.', 'number', '0.55'],
      ['width', 'Panel width (max 92% of the parent).', 'number', '320'],
      ['…', 'Every Panel prop: title, rim, face, children…', 'PanelProps'],
    ] }],
  },
  {
    slug: 'reward-pop', name: 'RewardPop', group: 'Feedback',
    intro: 'Text or icons that jump up and fade: "+50", "x2", "Combo!". Change its key to play it again.',
    import: "import { RewardPop } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Tap Collect.', render: () => <RewardPopDemo />,
      code: `<RewardPop key={collectCount}>\n  <Coin size={28} />\n  <Label size={26}>+50</Label>\n</RewardPop>` }],
    api: [{ rows: [
      ['children', 'What pops.', 'ReactNode'],
      ['rise', 'How far it moves up.', 'number', '46'],
      ['duration', 'Length in ms.', 'number', '900'],
      ['delay', 'Wait before starting, in ms.', 'number', '0'],
    ] }],
  },
  {
    slug: 'hearts', name: 'Hearts', group: 'Game',
    intro: 'A row of hearts for lives.',
    import: "import { Hearts } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => <View style={{ gap: 12 }}><Hearts count={5} /><Hearts count={3} /><Hearts count={1} max={3} size={40} /></View>, code: `<Hearts count={3} />\n<Hearts count={1} max={3} size={40} />` }],
    api: [{ rows: [
      ['count', 'Full hearts.', 'number'],
      ['max', 'Total hearts.', 'number', '5'],
      ['size', 'Heart size.', 'number', '28'],
      ['gap', 'Space between hearts.', 'number', '2'],
    ] }],
  },
  {
    slug: 'daily-reward-day', name: 'DailyRewardDay', group: 'Game',
    intro: 'One day of a daily reward calendar: claimed (checked), today (green, ringed), open, or locked. Day 7 can be big.',
    import: "import { DailyRewardDay } from 'playglaze';",
    demos: [{ title: 'A week', render: () => (
      <Row gap={10}>
        <DailyRewardDay day={1} amount={50} state="claimed"><Coin size={34} /></DailyRewardDay>
        <DailyRewardDay day={2} amount={80} state="claimed"><Coin size={34} /></DailyRewardDay>
        <DailyRewardDay day={3} amount={100} state="today"><Coin size={34} /></DailyRewardDay>
        <DailyRewardDay day={4} amount="x2"><Icon name="bolt" size={34} color="#FFC21A" shade="#B45309" /></DailyRewardDay>
        <DailyRewardDay day={5} amount={200} state="locked"><Coin size={34} /></DailyRewardDay>
        <DailyRewardDay day={7} amount="Big box" big><Icon name="gift" size={48} color="#A12CF0" shade="#5B21B6" /></DailyRewardDay>
      </Row>),
      code: `<DailyRewardDay day={1} amount={50} state="claimed"><Coin /></DailyRewardDay>\n<DailyRewardDay day={3} amount={100} state="today" onPress={claim}><Coin /></DailyRewardDay>\n<DailyRewardDay day={7} amount="Big box" big><Icon name="gift" /></DailyRewardDay>` }],
    api: [{ rows: [
      ['day', 'Day number.', 'number'],
      ['children', 'The reward picture.', 'ReactNode'],
      ['amount', 'Text under the picture.', 'string | number'],
      ['state', 'Look of the day.', "'claimed' | 'today' | 'open' | 'locked'", "'open'"],
      ['big', 'Double width (for day 7).', 'boolean', 'false'],
      ['width', 'Width of a normal day.', 'number', '84'],
      ['onPress', 'Called on tap (e.g. claim today).', '() => void'],
      STYLE,
    ] }],
  },
  {
    slug: 'booster-slot', name: 'BoosterSlot', group: 'Game',
    intro: 'A round holder for a booster with its count. When the count is 0 it shows a green + (buy more). The selected one glows.',
    import: "import { BoosterSlot } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Tap to select.', render: () => <BoosterDemo />, code: `<BoosterSlot icon="bolt" count={3} selected={sel === 'bolt'} onPress={() => setSel('bolt')} />\n<BoosterSlot icon="star" count={0} onPress={openShop} />` }],
    api: [{ rows: [
      ['icon', 'Built-in icon.', 'IconName'],
      ['children', 'Your own booster picture (when no icon).', 'ReactNode'],
      ['count', 'How many the player has. 0 shows a +.', 'number', '0'],
      ['selected', 'Glowing ring.', 'boolean', 'false'],
      ['size', 'Diameter.', 'number', '64'],
      ['onPress', 'Called on tap.', '() => void'],
      STYLE,
    ] }],
  },
  {
    slug: 'quest-card', name: 'QuestCard', group: 'Game',
    intro: 'A quest or mission row: the title, a progress bar with "3/5", an optional reward, and a claim button that turns green when done.',
    import: "import { QuestCard } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => (
      <View style={{ width: '100%', maxWidth: 440, gap: 12 }}>
        <QuestCard title="Win 5 levels" progress={3} total={5} reward={<Coin size={26} />} />
        <QuestCard title="Use 3 boosters" progress={3} total={3} reward={<Coin size={26} />} onClaim={() => {}} />
        <QuestCard title="Collect 1000 coins" progress={250} total={1000} color="purple" />
      </View>),
      code: `<QuestCard title="Win 5 levels" progress={3} total={5} reward={<Coin size={26} />} />\n<QuestCard title="Use 3 boosters" progress={3} total={3} onClaim={claim} />` }],
    api: [{ rows: [
      ['title', 'Quest text.', 'string'],
      ['progress', 'Done so far.', 'number'],
      ['total', 'Needed to finish.', 'number'],
      ['reward', 'Shown before the button.', 'ReactNode'],
      ['onClaim', 'Called when the button is tapped.', '() => void'],
      ['color', 'Bar and button color while not done.', colorType, 'theme.primary'],
      STYLE,
    ] }],
  },
  {
    slug: 'leaderboard-row', name: 'LeaderboardRow', group: 'Game',
    intro: 'One leaderboard line. The top 3 get gold, silver and bronze. `me` highlights the player’s own row.',
    import: "import { LeaderboardRow } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => (
      <View style={{ width: '100%', maxWidth: 440, gap: 10 }}>
        <LeaderboardRow rank={1} name="Mia" subtitle="Level 88" score="120,400" />
        <LeaderboardRow rank={2} name="Kenji" subtitle="Level 81" score="98,150" />
        <LeaderboardRow rank={3} name="Aisha" subtitle="Level 79" score="91,020" />
        <LeaderboardRow rank={14} name="You" subtitle="Level 42" score="40,775" me />
      </View>),
      code: `<LeaderboardRow rank={1} name="Mia" subtitle="Level 88" score="120,400" />\n<LeaderboardRow rank={14} name="You" score="40,775" me />` }],
    api: [{ rows: [
      ['rank', 'Position. 1–3 get medal colors.', 'number'],
      ['name', 'Player name.', 'string'],
      ['subtitle', 'Small text under the name.', 'string'],
      ['score', 'Score on the right.', 'number | string'],
      ['avatar', 'Your own avatar node.', 'ReactNode', '<Avatar size={44} />'],
      ['me', 'Highlight as the player’s row.', 'boolean', 'false'],
      STYLE,
    ] }],
  },
];

export const Note = ({ children }: { children: React.ReactNode }) => <T color={C.dim}>{children}</T>;
