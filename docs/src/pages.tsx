// Every docs page: intro, live demos with their code, and the API table.
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  bright, Checkbox, CloseButton, Coin, CounterPill, dark, GlossButton, Icon, ICONS, IconName, Label, LevelSlot,
  Panel, ProgressBar, Ribbon, RoundButton, ShopTile, Slider, Star, Stars, ThemeProvider, Toggle, ColorName,
} from '../../src';
import { ApiTable, C, Code, CodeBlock, Demo, DemoCard, H2, PageHead, Prop, Row, T } from './ui';
import { MORE_PAGES } from './pages2';
import { TEMPLATE_PAGES } from './templates';
import { PRO_PAGES } from './pro';
import { RESOURCE_PAGES } from './resources';

export type Page = { slug: string; name: string; group: string; title?: string; intro: React.ReactNode; import?: string; demos?: Demo[]; api?: { title?: string; rows: Prop[] }[]; body?: () => React.ReactElement };

const COLORS: ColorName[] = ['orange', 'yellow', 'red', 'blue', 'purple', 'green', 'pink', 'gray'];
const colorType = "ColorName | string";
const STYLE: Prop = ['style', 'Extra style for the outer view.', 'StyleProp<ViewStyle>'];
const PRESS: Prop = ['onPress', 'Called when the user taps it.', '() => void'];

// ---- small stateful demos ----
function ToggleDemo() {
  const [a, setA] = useState(true), [b, setB] = useState(false);
  return <Row gap={24}><Toggle value={a} onChange={setA} /><Toggle value={b} onChange={setB} color="green" /><Toggle value color="purple" width={84} /><Toggle value={false} color="blue" width={48} /></Row>;
}
function CheckDemo() {
  const [a, setA] = useState(true), [b, setB] = useState(false);
  return <Row gap={20}><Checkbox value={a} onChange={setA} /><Checkbox value={b} onChange={setB} /><Checkbox value color="green" /><Checkbox value color="purple" size={44} /></Row>;
}
function SliderDemo() {
  const [v, setV] = useState(0.4), [w, setW] = useState(0.75);
  return <View style={{ width: '100%', maxWidth: 320, gap: 18 }}><Slider value={v} onChange={setV} /><Slider value={w} onChange={setW} color="blue" height={20} /><Label size={18}>{Math.round(v * 100)} · {Math.round(w * 100)}</Label></View>;
}
function CounterDemo() {
  const [c, setC] = useState(1250);
  return <Row gap={20}><CounterPill value={c} icon={<Coin size={42} />} onAdd={() => setC(x => x + 100)} width={160} /><CounterPill value={5} icon={<RoundButton icon="heart" color="red" size={40} />} width={110} /></Row>;
}
function SettingsPanelDemo() {
  const [m, setM] = useState(true), [s, setS] = useState(false), [v, setV] = useState(0.5);
  return (
    <Panel title="Settings" onClose={() => {}} style={{ width: 320 }}>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><Icon name="music" size={30} color="#9A5A2C" shade={null} /><Toggle value={m} onChange={setM} /></View>
        <Slider value={v} onChange={setV} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}><Icon name="sound" size={30} color="#9A5A2C" shade={null} /><Toggle value={s} onChange={setS} /></View>
      </View>
    </Panel>
  );
}

const Swatch = ({ name, hex, ink = C.text, sub = C.faint }: { name: string; hex: string; ink?: string; sub?: string }) => (
  <View style={{ alignItems: 'center', gap: 6, width: 92 }}>
    <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: hex, boxShadow: '0 4px 0 rgba(0,0,0,0.35)' }} />
    <T size={13} weight="800" color={ink}>{name}</T><T size={12} color={sub}>{hex}</T>
  </View>
);

const BASE: Page[] = [
  // ---------------- Getting started ----------------
  {
    slug: 'introduction', name: 'Introduction', group: 'Getting started', title: 'PlayGlaze',
    intro: 'Glossy, chunky game UI for React Native and the web. Every part is drawn in code — no images — and takes any color: one base color makes the shine, the face, the stripes and the 3D lip.',
    body: () => (
      <View>
        <Row gap={18}>
          <GlossButton width={180} title="Play" />
          <GlossButton width={150} color="purple" title="Shop" />
          <RoundButton icon="gear" /><RoundButton icon="trophy" color="blue" />
          <LevelSlot level={1} stars={3} state="done" size={76} />
        </Row>
        <H2>Why PlayGlaze</H2>
        <T color={C.dim}>• Made for games: buttons, panels, level slots, shop tiles, counters, stars.{'\n'}• Any color, any size, sharp on every screen.{'\n'}• Small: no images, one dependency (react-native-svg).{'\n'}• The same code runs in your app and on the web (react-native-web).</T>
        <H2>Next</H2>
        <T color={C.dim}>Read Installation, then pick a component from the menu.</T>
      </View>
    ),
  },
  {
    slug: 'installation', name: 'Installation', group: 'Getting started',
    intro: 'Install the package and react-native-svg, wrap your app in ThemeProvider, and use the components.',
    body: () => (
      <View>
        <H2>1. Install</H2>
        <CodeBlock code={'npm install playglaze react-native-svg'} />
        <H2>2. Requirements</H2>
        <T color={C.dim}>React Native <Code>0.77+</Code> with the New Architecture (PlayGlaze uses the <Code>boxShadow</Code> and <Code>backgroundImage</Code> styles), or <Code>react-native-web</Code> for websites.</T>
        <H2>3. Wrap your app</H2>
        <CodeBlock code={`import { ThemeProvider, bright } from 'playglaze';\n\nexport default function App() {\n  return (\n    <ThemeProvider theme={{ ...bright, displayFont: 'LilitaOne' }}>\n      <Home />\n    </ThemeProvider>\n  );\n}`} />
        <H2>4. Use a component</H2>
        <CodeBlock code={`import { GlossButton, Icon } from 'playglaze';\n\n<GlossButton color="orange" onPress={start}>\n  <Icon name="play" size={32} />\n</GlossButton>`} />
        <H2>Fonts</H2>
        <T color={C.dim}>Labels use <Code>theme.displayFont</Code>. A chunky rounded font looks best: Lilita One, Fredoka or Luckiest Guy (all free on Google Fonts). Add the font file to your app, then pass its name.</T>
      </View>
    ),
  },
  {
    slug: 'theme', name: 'Theme & colors', group: 'Getting started',
    intro: 'A theme holds the named colors, the main color, and the panel, ribbon and text colors. Pass any part of it to ThemeProvider; the rest comes from the bright theme.',
    import: "import { ThemeProvider, bright, dark, useTheme, useTone } from 'playglaze';",
    body: () => (
      <View>
        <H2>Bright colors</H2>
        <T color={C.dim} style={{ marginBottom: 14 }}>Sunny candy colors for daytime games.</T>
        <View style={{ backgroundImage: 'linear-gradient(180deg, #BFE9FF 0%, #D9F7C8 100%)', padding: 20, borderRadius: 12 }}>
          <Row>{COLORS.map(c => <Swatch key={c} name={c} hex={bright.colors[c]} ink="#5A3412" sub="#8A6A4A" />)}</Row>
          <View style={{ height: 20 }} />
          <Row>{COLORS.slice(0, 7).map(c => <GlossButton key={c} color={c} width={120} size="md" title={c} />)}</Row>
        </View>
        <H2>Dark colors</H2>
        <T color={C.dim} style={{ marginBottom: 14 }}>Deeper jewel tones made to glow on a night background.</T>
        <View style={{ backgroundColor: '#100A24', padding: 20, borderRadius: 12 }}>
          <Row>{COLORS.map(c => <Swatch key={c} name={c} hex={dark.colors[c]} />)}</Row>
          <View style={{ height: 20 }} />
          <ThemeProvider theme={{ ...dark, displayFont: 'Lilita One' }}>
            <Row>{COLORS.slice(0, 7).map(c => <GlossButton key={c} color={c} width={120} size="md" title={c} />)}</Row>
          </ThemeProvider>
        </View>
        <H2>Any hex</H2>
        <T color={C.dim}>Every <Code>color</Code> prop also takes a hex such as <Code>#14B8A6</Code>. PlayGlaze builds the light, face, dark and lip shades from it.</T>
        <View style={{ height: 16 }} />
        <Row><GlossButton width={150} color="#14B8A6" title="#14B8A6" /><GlossButton width={150} color="#E11D48" title="#E11D48" /><GlossButton width={150} color="#6366F1" title="#6366F1" /></Row>
        <H2>Dark theme</H2>
        <View style={{ backgroundColor: '#100A24', padding: 28, borderRadius: 12 }}>
          <ThemeProvider theme={{ ...dark, displayFont: 'Lilita One' }}>
            <Row gap={24}>
              <Panel title="Pause" style={{ width: 260 }}><GlossButton size="md"><Icon name="play" size={28} /></GlossButton></Panel>
              <View style={{ gap: 16 }}><GlossButton width={160} title="Play" /><ProgressBar value={0.6} style={{ width: 200 }} /><Toggle value /></View>
            </Row>
          </ThemeProvider>
        </View>
        <CodeBlock style={{ marginTop: 12 }} code={`<ThemeProvider theme={{ ...dark, primary: 'blue' }}>…</ThemeProvider>`} />
        <H2>API</H2>
        <ApiTable title="ThemeProvider" rows={[
          ['theme', 'Any part of a theme. Missing parts come from bright.', 'Partial<Theme>', 'bright'],
          ['children', 'Your app.', 'ReactNode'],
        ]} />
        <ApiTable title="Theme" rows={[
          ['colors', 'The named colors.', 'Record<ColorName, string>'],
          ['primary', 'The color used when a component gets no color.', 'ColorName', "'orange'"],
          ['panel', 'Panel rim, face, top of face and line colors.', '{ rim, face, faceTop, line }'],
          ['ribbon', 'Cookie and filling colors of Ribbon (also the ring of CloseButton and knobs).', '{ cookie, filling }'],
          ['slot', 'Level slot face and rim.', '{ face, rim }'],
          ['groove', 'The dark groove of progress bars and counters.', 'string'],
          ['text', 'Label color, its edge, and dark text on cream.', '{ color, shadow, dark }'],
          ['displayFont', 'Font for labels, ribbons and numbers.', 'string'],
          ['fontFamily', 'Font for normal text.', 'string'],
        ]} />
        <ApiTable title="Hooks and helpers" rows={[
          ['useTheme()', 'The current theme.', '() => Theme'],
          ['useTone(color)', 'The five shades for a color name or hex.', '(c?: ColorProp) => Tone'],
          ['tone(hex)', 'Same, without a theme.', '(hex) => Tone'],
          ['mix / lighten / darken / rgba', 'Color helpers.', 'functions'],
        ]} />
      </View>
    ),
  },

  // ---------------- General ----------------
  {
    slug: 'gloss-button', name: 'GlossButton', group: 'General',
    intro: 'The main button: a glossy candy pill with a 3D lip, soft stripes and a white shine. It sinks when pressed.',
    import: "import { GlossButton } from 'playglaze';",
    demos: [
      { title: 'Colors', desc: 'Use a theme color name, or any hex.', render: () => <Row>{COLORS.slice(0, 7).map(c => <GlossButton key={c} color={c} width={140} title={c} />)}<GlossButton width={140} color="#14B8A6" title="#14B8A6" /></Row>,
        code: `<GlossButton color="orange" title="orange" />\n<GlossButton color="purple" title="purple" />\n<GlossButton color="#14B8A6" title="#14B8A6" />` },
      { title: 'Sizes', desc: 'xl 72, lg 60 (default), md 48, sm 38, xs 30 points tall.', render: () => <Row>{(['xl', 'lg', 'md', 'sm', 'xs'] as const).map(s => <GlossButton key={s} size={s} width={{ xl: 200, lg: 170, md: 140, sm: 110, xs: 80 }[s]} title={s} />)}</Row>,
        code: `<GlossButton size="xl" title="xl" />\n<GlossButton size="md" title="md" />\n<GlossButton size="xs" title="xs" />` },
      { title: 'Icon content', desc: 'Put any content inside: an Icon, a Label, or both.', render: () => <Row><GlossButton size="xl" width={200}><Icon name="play" size={44} shade="rgba(122,58,10,0.8)" /></GlossButton><GlossButton size="md" width={130} color="green"><Icon name="check" size={30} /></GlossButton><GlossButton size="md" width={130} color="red"><Icon name="close" size={30} /></GlossButton><GlossButton size="md" width={160} color="purple"><Coin size={26} /><Label size={20}>250</Label></GlossButton></Row>,
        code: `<GlossButton size="xl">\n  <Icon name="play" size={44} />\n</GlossButton>\n\n<GlossButton color="purple">\n  <Coin size={26} />\n  <Label size={20}>250</Label>\n</GlossButton>` },
      { title: 'Shape and stripes', desc: 'radius makes a square-ish button; stripes={false} gives a plain face.', render: () => <Row><GlossButton width={150} radius={16} title="radius 16" color="blue" /><GlossButton width={150} stripes={false} title="no stripes" color="green" /></Row>,
        code: `<GlossButton radius={16} title="radius 16" />\n<GlossButton stripes={false} title="no stripes" />` },
      { title: 'Disabled', render: () => <GlossButton width={160} disabled title="disabled" />, code: `<GlossButton disabled title="disabled" />` },
    ],
    api: [{ rows: [
      ['color', 'Button color: a theme color name or any hex.', colorType, 'theme.primary'],
      ['size', 'Height preset.', "'xl' | 'lg' | 'md' | 'sm' | 'xs'", "'lg'"],
      ['title', 'Text label, drawn with Label.', 'string'],
      ['children', 'Any content (icons, labels). Shown after title.', 'ReactNode'],
      ['width', 'Fixed width. Without it the button fills its parent.', 'number'],
      ['radius', 'Corner radius. Default is a full pill.', 'number', 'height / 2'],
      ['stripes', 'Draw the soft diagonal stripes.', 'boolean', 'true'],
      ['disabled', 'Gray and not pressable.', 'boolean', 'false'],
      PRESS, STYLE,
      ['…', 'Other Pressable props (onLongPress, hitSlop, testID…).', 'PressableProps'],
    ] }],
  },
  {
    slug: 'round-button', name: 'RoundButton', group: 'General',
    intro: 'A round glossy icon button for home screens and HUDs: settings, shop, profile, pause.',
    import: "import { RoundButton } from 'playglaze';",
    demos: [
      { title: 'Icons and colors', render: () => <Row><RoundButton icon="gear" /><RoundButton icon="cart" /><RoundButton icon="user" /><RoundButton icon="pause" color="blue" /><RoundButton icon="heart" color="red" /><RoundButton icon="trophy" color="purple" /><RoundButton icon="gift" color="green" /></Row>,
        code: `<RoundButton icon="gear" onPress={openSettings} />\n<RoundButton icon="pause" color="blue" />\n<RoundButton icon="heart" color="red" />` },
      { title: 'Sizes', render: () => <Row><RoundButton icon="home" size={40} /><RoundButton icon="home" size={56} /><RoundButton icon="home" size={72} /><RoundButton icon="home" size={96} /></Row>,
        code: `<RoundButton icon="home" size={40} />\n<RoundButton icon="home" size={96} />` },
      { title: 'Custom content', desc: 'Leave out icon and pass children.', render: () => <Row><RoundButton color="yellow"><Label size={24}>?</Label></RoundButton><RoundButton color="pink"><Label size={22}>x2</Label></RoundButton></Row>,
        code: `<RoundButton color="pink">\n  <Label size={22}>x2</Label>\n</RoundButton>` },
    ],
    api: [{ rows: [
      ['icon', 'A built-in icon name (see Icon).', 'IconName'],
      ['children', 'Custom content, used when icon is not set.', 'ReactNode'],
      ['color', 'Button color.', colorType, 'theme.primary'],
      ['size', 'Diameter in points.', 'number', '64'],
      ['disabled', 'Gray and not pressable.', 'boolean', 'false'],
      PRESS, STYLE,
    ] }],
  },
  {
    slug: 'close-button', name: 'CloseButton', group: 'General',
    intro: 'The popup close button: a brown ring around a glossy ball with a white ×. Panel shows one when you pass onClose.',
    import: "import { CloseButton } from 'playglaze';",
    demos: [
      { title: 'Basic', render: () => <Row><CloseButton /><CloseButton size={52} /><CloseButton size={52} color="red" /><CloseButton size={52} color="blue" /></Row>,
        code: `<CloseButton onPress={close} />\n<CloseButton size={52} color="red" />` },
    ],
    api: [{ rows: [
      ['size', 'Diameter in points.', 'number', '40'],
      ['color', 'Ball color (the ring uses theme.ribbon.cookie).', colorType, 'theme.primary'],
      PRESS, STYLE,
    ] }],
  },
  {
    slug: 'icon', name: 'Icon', group: 'Data display',
    intro: 'Twenty common game icons, drawn as SVG, white with a soft shade under them by default.',
    import: "import { Icon } from 'playglaze';",
    demos: [
      { title: 'All icons', render: () => (
        <Row gap={10}>{(Object.keys(ICONS) as IconName[]).map(n => (
          <View key={n} style={{ width: 86, alignItems: 'center', gap: 6, paddingVertical: 8, borderRadius: 10, backgroundColor: '#3E3C4A' }}>
            <Icon name={n} size={30} /><T size={12} color={C.dim}>{n}</T>
          </View>))}
        </Row>),
        code: `<Icon name="play" size={32} />\n<Icon name="heart" color="#F5332B" shade="#9B1C1C" />\n<Icon name="music" color="#9A5A2C" shade={null} />` },
    ],
    api: [{ rows: [
      ['name', 'Icon name.', Object.keys(ICONS).map(k => `'${k}'`).join(' | ')],
      ['size', 'Width and height.', 'number', '24'],
      ['color', 'Fill color.', 'string', "'#fff'"],
      ['shade', 'Color of the soft copy under the icon; null for a flat icon.', 'string | null', "'rgba(0,0,0,0.28)'"],
    ] }],
  },
  {
    slug: 'label', name: 'Label', group: 'Data display',
    intro: 'Bold game text: white with a thick darker edge under it, in the theme’s display font.',
    import: "import { Label } from 'playglaze';",
    demos: [
      { title: 'Basic', render: () => <Row gap={24}><Label size={36}>1250</Label><Label size={28} edge="#5B21B6">Level 7</Label><Label size={22} color="#FFC21A" edge="#7A3A0A">x2</Label></Row>,
        code: `<Label size={36}>1250</Label>\n<Label size={28} edge="#5B21B6">Level 7</Label>` },
    ],
    api: [{ rows: [
      ['size', 'Font size.', 'number', '20'],
      ['color', 'Text color.', 'string', 'theme.text.color'],
      ['edge', 'The darker color under the text.', 'string', 'theme.text.shadow'],
      ['display', 'Use theme.displayFont (else theme.fontFamily).', 'boolean', 'true'],
      ['…', 'Any Text prop.', 'TextProps'],
    ] }],
  },

  // ---------------- Layout ----------------
  {
    slug: 'panel', name: 'Panel', group: 'Layout',
    intro: 'The popup card: a cream face inside a thick glossy rim, with an optional cookie title and close button. Use it for pause, settings, shop and reward screens.',
    import: "import { Panel } from 'playglaze';",
    demos: [
      { title: 'With title and close button', render: () => (
        <Panel title="Paused" onClose={() => {}} style={{ width: 300 }}>
          <View style={{ gap: 14 }}>
            <GlossButton size="md"><Icon name="play" size={30} /></GlossButton>
            <GlossButton size="md"><Icon name="refresh" size={28} /></GlossButton>
            <GlossButton size="md"><Icon name="home" size={28} /></GlossButton>
          </View>
        </Panel>),
        code: `<Panel title="Paused" onClose={resume}>\n  <GlossButton size="md"><Icon name="play" /></GlossButton>\n  <GlossButton size="md"><Icon name="refresh" /></GlossButton>\n  <GlossButton size="md"><Icon name="home" /></GlossButton>\n</Panel>` },
      { title: 'Settings', desc: 'Panels hold any controls.', render: () => <SettingsPanelDemo />,
        code: `<Panel title="Settings" onClose={close}>\n  <Toggle value={music} onChange={setMusic} />\n  <Slider value={volume} onChange={setVolume} />\n</Panel>` },
      { title: 'Any colors, no title', render: () => <Row gap={24}><Panel rim="#7C3AED" face="#EDE4FF" style={{ width: 240 }}><Label size={18} color="#5B21B6" edge="rgba(255,255,255,0.8)">Purple rim</Label></Panel><Panel rim="#16A34A" face="#E7F8E0" style={{ width: 240 }}><Label size={18} color="#166534" edge="rgba(255,255,255,0.8)">Green rim</Label></Panel></Row>,
        code: `<Panel rim="#7C3AED" face="#EDE4FF">…</Panel>` },
    ],
    api: [{ rows: [
      ['title', 'Text on the cookie title.', 'string'],
      ['titleNode', 'Your own title content (e.g. stars or an icon).', 'ReactNode'],
      ['titleWidth', 'Width of the cookie title.', 'number', '190'],
      ['onClose', 'Shows the close button and is called on tap.', '() => void'],
      ['rim', 'Rim color.', 'string', 'theme.panel.rim'],
      ['face', 'Face color.', 'string', 'theme.panel.face'],
      ['rimWidth', 'Rim thickness.', 'number', '9'],
      ['radius', 'Outer corner radius.', 'number', '30'],
      ['padding', 'Inner padding.', 'number', '18'],
      ['children', 'Panel content.', 'ReactNode'],
      STYLE,
      ['contentStyle', 'Style for the cream face.', 'StyleProp<ViewStyle>'],
    ] }],
  },
  {
    slug: 'ribbon', name: 'Ribbon', group: 'Layout',
    intro: 'The title plate: a scalloped cookie bar with a filling peeking out under it.',
    import: "import { Ribbon } from 'playglaze';",
    demos: [
      { title: 'Basic', render: () => <Row gap={24}><Ribbon width={200} title="Shop" /><Ribbon width={240} height={70} title="Levels" /></Row>,
        code: `<Ribbon width={200} title="Shop" />\n<Ribbon width={240} height={70} title="Levels" />` },
      { title: 'Colors and content', render: () => <Row gap={24}><Ribbon width={200} title="Ice" color="#3B6FD8" filling="#9BD4FF" /><Ribbon width={200} title="Berry" color="#B0306A" filling="#FFC1DA" /><Ribbon width={170} tilt={0}><Stars count={3} size={26} /></Ribbon></Row>,
        code: `<Ribbon width={200} title="Ice" color="#3B6FD8" filling="#9BD4FF" />\n<Ribbon width={170} tilt={0}>\n  <Stars count={3} />\n</Ribbon>` },
    ],
    api: [{ rows: [
      ['width', 'Width in points (required).', 'number'],
      ['height', 'Height of the cookie.', 'number', '56'],
      ['title', 'Text on the cookie.', 'string'],
      ['children', 'Other content on the cookie.', 'ReactNode'],
      ['color', 'Cookie color.', 'string', 'theme.ribbon.cookie'],
      ['filling', 'Filling color.', 'string', 'theme.ribbon.filling'],
      ['tilt', 'Rotation in degrees.', 'number', '-2'],
      STYLE,
    ] }],
  },

  // ---------------- Data entry ----------------
  {
    slug: 'toggle', name: 'Toggle', group: 'Data entry',
    intro: 'An on/off switch: a striped colored groove when on, gray when off, with a springy knob.',
    import: "import { Toggle } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Tap to switch.', render: () => <ToggleDemo />,
      code: `const [music, setMusic] = useState(true);\n\n<Toggle value={music} onChange={setMusic} />\n<Toggle value={on} onChange={setOn} color="green" />` }],
    api: [{ rows: [
      ['value', 'On or off.', 'boolean'],
      ['onChange', 'Called with the new value.', '(v: boolean) => void'],
      ['color', 'Color when on.', colorType, 'theme.primary'],
      ['width', 'Width; height is half of it.', 'number', '64'],
      STYLE,
    ] }],
  },
  {
    slug: 'checkbox', name: 'Checkbox', group: 'Data entry',
    intro: 'A rounded square check box: cream when off, solid with a white check when on.',
    import: "import { Checkbox } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => <CheckDemo />, code: `<Checkbox value={agree} onChange={setAgree} />\n<Checkbox value color="green" />` }],
    api: [{ rows: [
      ['value', 'Checked or not.', 'boolean'],
      ['onChange', 'Called with the new value.', '(v: boolean) => void'],
      ['color', 'Rim and checked color.', colorType, 'theme.primary'],
      ['size', 'Width and height.', 'number', '32'],
      STYLE,
    ] }],
  },
  {
    slug: 'slider', name: 'Slider', group: 'Data entry',
    intro: 'A cream groove with a colored fill and a draggable glossy knob. Good for music and sound volume.',
    import: "import { Slider } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Drag the knob or tap the groove.', render: () => <SliderDemo />, code: `const [volume, setVolume] = useState(0.4);\n\n<Slider value={volume} onChange={setVolume} />` }],
    api: [{ rows: [
      ['value', 'Position from 0 to 1.', 'number'],
      ['onChange', 'Called with the new value (0–1) while dragging.', '(v: number) => void'],
      ['color', 'Fill and knob color.', colorType, 'theme.primary'],
      ['height', 'Groove height; the knob is twice this.', 'number', '16'],
      STYLE,
    ] }],
  },

  // ---------------- Game ----------------
  {
    slug: 'progress-bar', name: 'ProgressBar', group: 'Game',
    intro: 'A groove with a glossy, striped fill. Use it for level progress, XP, timers and loading.',
    import: "import { ProgressBar } from 'playglaze';",
    demos: [
      { title: 'Colors', render: () => <View style={{ width: '100%', maxWidth: 420, gap: 14 }}><ProgressBar value={0.72} /><ProgressBar value={0.45} color="blue" /><ProgressBar value={0.3} color="red" /><ProgressBar value={0.6} color="purple" /></View>,
        code: `<ProgressBar value={0.72} />\n<ProgressBar value={0.45} color="blue" />` },
      { title: 'With text and a cream groove', render: () => <View style={{ width: '100%', maxWidth: 420, gap: 14 }}><ProgressBar value={0.9} color="green" height={30}><Label size={16}>90%</Label></ProgressBar><ProgressBar value={0.4} height={18} groove="#E6D3AE" /></View>,
        code: `<ProgressBar value={0.9} color="green" height={30}>\n  <Label size={16}>90%</Label>\n</ProgressBar>\n<ProgressBar value={0.4} groove="#E6D3AE" />` },
    ],
    api: [{ rows: [
      ['value', 'Fill from 0 to 1.', 'number'],
      ['color', 'Fill color.', colorType, 'theme.primary'],
      ['height', 'Bar height.', 'number', '22'],
      ['groove', 'Groove color.', 'string', 'theme.groove'],
      ['children', 'Content centered on the bar (e.g. a Label).', 'ReactNode'],
      STYLE,
    ] }],
  },
  {
    slug: 'stars', name: 'Star / Stars', group: 'Game',
    intro: 'Chunky stars for level results. Stars draws a row with the middle star raised.',
    import: "import { Star, Stars } from 'playglaze';",
    demos: [
      { title: 'Stars', render: () => <Row gap={32}><Stars count={0} size={34} /><Stars count={1} size={34} /><Stars count={2} size={34} /><Stars count={3} size={34} /></Row>,
        code: `<Stars count={2} size={34} />` },
      { title: 'Single star', render: () => <Row><Star size={40} /><Star size={40} on={false} /><Star size={56} color="#38BDF8" /><Star size={56} color="#F472B6" /></Row>,
        code: `<Star size={40} />\n<Star on={false} />\n<Star color="#38BDF8" />` },
    ],
    api: [
      { title: 'Stars', rows: [
        ['count', 'How many stars are gold.', 'number'],
        ['of', 'Total stars.', 'number', '3'],
        ['size', 'Size of the side stars (the middle one is 15% bigger).', 'number', '22'],
        ['gap', 'Space between stars.', 'number', '-2'],
      ] },
      { title: 'Star', rows: [
        ['on', 'Gold (true) or gray (false).', 'boolean', 'true'],
        ['size', 'Width and height.', 'number', '28'],
        ['color', 'Color when on.', 'string', "'#FFC21A'"],
      ] },
    ],
  },
  {
    slug: 'level-slot', name: 'LevelSlot', group: 'Game',
    intro: 'A level tile for level maps and grids: the number and stars, a tick when done, a lock when locked.',
    import: "import { LevelSlot } from 'playglaze';",
    demos: [
      { title: 'States', render: () => <Row><LevelSlot level={1} stars={3} state="done" /><LevelSlot level={2} stars={1} state="done" /><LevelSlot level={3} state="current" /><LevelSlot level={4} /><LevelSlot level={5} state="locked" /></Row>,
        code: `<LevelSlot level={1} stars={3} state="done" onPress={() => play(1)} />\n<LevelSlot level={3} state="current" />\n<LevelSlot level={5} state="locked" />` },
      { title: 'Colors and sizes', render: () => <Row><LevelSlot level={10} stars={2} color="#A12CF0" /><LevelSlot level={20} stars={3} color="#1FB5F5" size={110} /><LevelSlot level={7} stars={1} color="#52C41A" size={70} /></Row>,
        code: `<LevelSlot level={10} stars={2} color="#A12CF0" />\n<LevelSlot level={20} size={110} />` },
    ],
    api: [{ rows: [
      ['level', 'Level number.', 'number'],
      ['stars', 'Stars earned (0–3).', 'number', '0'],
      ['state', 'Look of the tile. locked is not pressable.', "'open' | 'done' | 'current' | 'locked'", "'open'"],
      ['size', 'Width in points.', 'number', '88'],
      ['color', 'Rim color.', colorType, 'theme.slot.rim'],
      PRESS, STYLE,
    ] }],
  },
  {
    slug: 'counter-pill', name: 'CounterPill', group: 'Game',
    intro: 'A currency or lives counter for the top bar: a dark pill with an icon on the left and an optional + button.',
    import: "import { CounterPill, Coin } from 'playglaze';",
    demos: [{ title: 'Basic', desc: 'Tap + to add 100.', render: () => <CounterDemo />,
      code: `<CounterPill value={coins} icon={<Coin size={42} />} onAdd={openShop} width={160} />\n<CounterPill value={5} icon={<RoundButton icon="heart" color="red" size={40} />} />` }],
    api: [{ rows: [
      ['value', 'The number or text shown.', 'number | string'],
      ['icon', 'Shown over the left end (a Coin, a RoundButton…).', 'ReactNode'],
      ['onAdd', 'Shows a green + button and is called on tap.', '() => void'],
      ['width', 'Pill width.', 'number', '130'],
      STYLE,
    ] }],
  },
  {
    slug: 'coin', name: 'Coin', group: 'Game',
    intro: 'A shiny coin for counters, prices and rewards. Any color makes gems, tokens or tickets.',
    import: "import { Coin } from 'playglaze';",
    demos: [{ title: 'Colors and sizes', render: () => <Row gap={20}><Coin size={32} /><Coin size={48} /><Coin size={64} /><Coin size={64} color="#38BDF8" /><Coin size={64} color="#A78BFA" /><Coin size={64} color="#F87171" /></Row>,
      code: `<Coin size={48} />\n<Coin size={64} color="#38BDF8" />` }],
    api: [{ rows: [
      ['size', 'Diameter.', 'number', '40'],
      ['color', 'Coin color.', 'string', "'#FFC21A'"],
    ] }],
  },
  {
    slug: 'shop-tile', name: 'ShopTile', group: 'Game',
    intro: 'A shop slot: a cream card with your item and a buy button with the price.',
    import: "import { ShopTile } from 'playglaze';",
    demos: [{ title: 'Basic', render: () => (
      <Row gap={18}>
        <ShopTile price={100} priceIcon={<Coin size={20} />}><Coin size={54} /></ShopTile>
        <ShopTile price={250} priceIcon={<Coin size={20} />}><Icon name="bolt" size={56} color="#FFC21A" shade="#B45309" /></ShopTile>
        <ShopTile price="$0.99" color="green"><Icon name="heart" size={56} color="#F5332B" shade="#9B1C1C" /></ShopTile>
        <ShopTile price="$4.99" badge={<RoundButton icon="star" color="red" size={34} />}><Icon name="gift" size={56} color="#A12CF0" shade="#5B21B6" /></ShopTile>
      </Row>),
      code: `<ShopTile price={250} priceIcon={<Coin size={20} />} onBuy={buy}>\n  <Icon name="bolt" size={56} color="#FFC21A" />\n</ShopTile>\n\n<ShopTile price="$4.99" badge={<RoundButton icon="star" color="red" size={34} />}>\n  …\n</ShopTile>` }],
    api: [{ rows: [
      ['children', 'The item shown on the card.', 'ReactNode'],
      ['price', 'Price text on the button.', 'string | number'],
      ['priceIcon', 'Shown before the price (e.g. a Coin).', 'ReactNode'],
      ['onBuy', 'Called when the buy button is tapped.', '() => void'],
      ['color', 'Buy button color.', colorType, "'purple'"],
      ['width', 'Card width.', 'number', '104'],
      ['badge', 'Shown on the top-right corner (e.g. a sale mark).', 'ReactNode'],
      STYLE,
    ] }],
  },
];

const ORDER = ['Getting started', 'General', 'Layout', 'Navigation', 'Data entry', 'Data display', 'Feedback', 'Game', 'Templates', 'Pro', 'Resources'];
const ALL = [...BASE, ...MORE_PAGES, ...TEMPLATE_PAGES, ...PRO_PAGES, ...RESOURCE_PAGES];
export const PAGES: Page[] = ORDER.flatMap(g => ALL.filter(p => p.group === g));

export function PageView({ page }: { page: Page }) {
  return (
    <View>
      <PageHead title={page.title ?? page.name} intro={page.intro} importLine={page.import} />
      {page.body ? page.body() : null}
      {page.demos ? <><H2>Examples</H2>{page.demos.map(d => <DemoCard key={d.title} demo={d} />)}</> : null}
      {page.api ? <><H2>API</H2>{page.api.map((a, i) => <ApiTable key={i} title={a.title} rows={a.rows} />)}</> : null}
    </View>
  );
}
