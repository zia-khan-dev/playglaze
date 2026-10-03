// The PlayGlaze showcase: every component, in every color, on one page.
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  bright, Checkbox, Coin, CounterPill, GlossButton, Icon, Label, LevelSlot, Panel, ProgressBar,
  Ribbon, RoundButton, ShopTile, Slider, Stars, ThemeProvider, Toggle, ColorName,
} from '../../src';

const theme = { ...bright, displayFont: 'Lilita One', fontFamily: 'Nunito' };
const COLORS: ColorName[] = ['orange', 'yellow', 'red', 'blue', 'purple', 'green', 'pink'];

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 56 }}>
      <Text style={{ fontFamily: 'Lilita One', fontSize: 30, color: '#FFE9C2', marginBottom: 4 }}>{title}</Text>
      {note ? <Text style={{ fontFamily: 'Nunito', fontSize: 15, color: '#B9B4C8', marginBottom: 20 }}>{note}</Text> : null}
      {children}
    </View>
  );
}

const Row = ({ children, gap = 20 }: { children: React.ReactNode; gap?: number }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap }}>{children}</View>
);

function Code({ children }: { children: string }) {
  return (
    <View style={{ backgroundColor: '#1C1B22', borderRadius: 12, padding: 14, marginTop: 18 }}>
      <Text style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, color: '#E7E3F2' }}>{children}</Text>
    </View>
  );
}

export default function App() {
  const [music, setMusic] = useState(true);
  const [sfx, setSfx] = useState(false);
  const [vol, setVol] = useState(0.35);
  const [check, setCheck] = useState(true);
  const [coins, setCoins] = useState(1250);
  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', paddingVertical: 48, paddingHorizontal: 16 }}>
        <View style={{ width: '100%', maxWidth: 980 }}>
          {/* hero */}
          <View style={{ alignItems: 'center', marginBottom: 64 }}>
            <Ribbon width={340} height={84} title="PlayGlaze" tilt={-3} />
            <Text style={{ fontFamily: 'Nunito', fontWeight: '800', fontSize: 20, color: '#FFE9C2', marginTop: 18, textAlign: 'center' }}>
              Glossy, chunky game UI for React Native — drawn in code, any color.
            </Text>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 24 }}>
              <GlossButton width={180} title="Get started" />
              <GlossButton width={150} color="purple" title="GitHub" />
            </View>
          </View>

          <Section title="Buttons" note="One base color makes the whole button: highlight, face, stripes and the 3D lip. Press one to see it sink.">
            <Row>{COLORS.map(c => <GlossButton key={c} color={c} width={170} title={c} />)}</Row>
            <View style={{ height: 24 }} />
            <Row>
              <GlossButton size="xl" width={240}><Icon name="play" size={40} shade="rgba(122,58,10,0.8)" /></GlossButton>
              <GlossButton size="md" width={140} color="green"><Icon name="check" size={28} /></GlossButton>
              <GlossButton size="md" width={140} color="red"><Icon name="close" size={28} /></GlossButton>
              <GlossButton size="sm" width={110} color="blue" title="small" />
              <GlossButton size="xs" width={90} color="purple" title="xs" />
              <GlossButton size="md" width={140} disabled title="disabled" />
              <GlossButton size="md" width={140} color="#14B8A6" title="any hex" />
            </Row>
            <Code>{`<GlossButton color="orange" size="lg" title="Play" onPress={start} />\n<GlossButton color="#14B8A6"><Icon name="play" /></GlossButton>`}</Code>
          </Section>

          <Section title="Round buttons" note="Icon buttons for the home screen and HUD.">
            <Row>
              <RoundButton icon="gear" />
              <RoundButton icon="cart" />
              <RoundButton icon="user" />
              <RoundButton icon="pause" color="blue" />
              <RoundButton icon="heart" color="red" />
              <RoundButton icon="trophy" color="purple" />
              <RoundButton icon="gift" color="green" size={80} />
              <RoundButton icon="home" color="pink" size={48} />
            </Row>
          </Section>

          <Section title="Panels and titles" note="A cream card in a thick glossy rim, with a cookie title and a close button.">
            <Row gap={32}>
              <Panel title="Paused" onClose={() => {}} style={{ width: 300 }}>
                <View style={{ gap: 14 }}>
                  <GlossButton size="md"><Icon name="play" size={30} /></GlossButton>
                  <GlossButton size="md"><Icon name="refresh" size={28} /></GlossButton>
                  <GlossButton size="md"><Icon name="home" size={28} /></GlossButton>
                </View>
              </Panel>
              <Panel title="Settings" onClose={() => {}} style={{ width: 320 }}>
                <View style={{ gap: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Icon name="music" size={30} color="#9A5A2C" shade={null} />
                    <Toggle value={music} onChange={setMusic} />
                  </View>
                  <Slider value={vol} onChange={setVol} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Icon name="sound" size={30} color="#9A5A2C" shade={null} />
                    <Toggle value={sfx} onChange={setSfx} />
                  </View>
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
                    <View style={{ flex: 1 }}><GlossButton size="md"><Icon name="check" size={28} /></GlossButton></View>
                    <View style={{ flex: 1 }}><GlossButton size="md" color="red"><Icon name="close" size={28} /></GlossButton></View>
                  </View>
                </View>
              </Panel>
              <Panel rim="#7C3AED" face="#EDE4FF" title="Any rim" style={{ width: 260 }}>
                <Label size={18} color="#5B21B6" edge="rgba(255,255,255,0.8)">Rim and face take any color.</Label>
              </Panel>
            </Row>
            <View style={{ height: 28 }} />
            <Row>
              <Ribbon width={200} title="Shop" />
              <Ribbon width={200} title="Levels" color="#3B6FD8" filling="#9BD4FF" />
              <Ribbon width={160} tilt={0}><Stars count={3} size={26} /></Ribbon>
            </Row>
          </Section>

          <Section title="Controls" note="Toggle, check box, slider and progress bars.">
            <Row gap={28}>
              <Toggle value={music} onChange={setMusic} />
              <Toggle value={!music} onChange={v => setMusic(!v)} color="green" />
              <Toggle value={true} color="purple" width={80} />
              <Checkbox value={check} onChange={setCheck} />
              <Checkbox value={!check} onChange={v => setCheck(!v)} color="green" />
              <View style={{ width: 220 }}><Slider value={vol} onChange={setVol} /></View>
            </Row>
            <View style={{ height: 24, }} />
            <View style={{ gap: 14, maxWidth: 520 }}>
              <ProgressBar value={0.72} />
              <ProgressBar value={0.45} color="blue" />
              <ProgressBar value={0.9} color="green" height={28}><Label size={15}>90%</Label></ProgressBar>
              <ProgressBar value={0.3} color="red" height={16} groove="#E6D3AE" />
              <ProgressBar value={0.6} color="purple" height={14} />
            </View>
          </Section>

          <Section title="Level slots" note="Open, done (tick), current (white ring) and locked.">
            <Row gap={16}>
              <LevelSlot level={1} stars={3} state="done" />
              <LevelSlot level={2} stars={2} state="done" />
              <LevelSlot level={3} stars={0} state="current" />
              <LevelSlot level={4} state="locked" />
              <LevelSlot level={5} state="locked" />
              <LevelSlot level={10} stars={1} color="#A12CF0" />
            </Row>
          </Section>

          <Section title="Counters and shop" note="A currency pill with a + button, coins, stars and shop tiles.">
            <Row gap={24}>
              <CounterPill value={coins} icon={<Coin size={42} />} onAdd={() => setCoins(c => c + 100)} width={160} />
              <CounterPill value="5" icon={<RoundButton icon="heart" color="red" size={40} />} width={110} />
              <Coin size={56} />
              <Coin size={56} color="#38BDF8" />
              <Stars count={2} size={34} />
            </Row>
            <View style={{ height: 28 }} />
            <Row gap={18}>
              <ShopTile price={100} priceIcon={<Coin size={20} />}><Coin size={54} /></ShopTile>
              <ShopTile price={250} priceIcon={<Coin size={20} />}><Icon name="bolt" size={56} color="#FFC21A" shade="#B45309" /></ShopTile>
              <ShopTile price="$0.99" color="green"><Icon name="heart" size={56} color="#F5332B" shade="#9B1C1C" /></ShopTile>
              <ShopTile price="$4.99" badge={<RoundButton icon="star" color="red" size={34} />}><Icon name="gift" size={56} color="#A12CF0" shade="#5B21B6" /></ShopTile>
            </Row>
          </Section>

          <Section title="Install">
            <Code>{`npm install playglaze react-native-svg\n\nimport { ThemeProvider, bright, GlossButton } from 'playglaze';\n\n<ThemeProvider theme={{ ...bright, primary: 'blue' }}>\n  <GlossButton title="Play" />\n</ThemeProvider>`}</Code>
            <Text style={{ fontFamily: 'Nunito', fontSize: 14, color: '#8F8AA3', marginTop: 24 }}>
              Needs React Native 0.77+ (New Architecture: boxShadow and backgroundImage) or react-native-web. MIT license.
            </Text>
          </Section>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
}
