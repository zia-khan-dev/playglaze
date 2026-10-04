import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const nm = (p: string) => path.resolve(import.meta.dirname, 'node_modules', p);

// The library source (../src) is React Native code; on the web it runs through react-native-web.
export default defineConfig({
  plugins: [react()],
  define: { __DEV__: 'false', 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production') },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: [
      // react-native-svg imports the native asset registry for <Image>; the docs never use it.
      { find: '@react-native/assets-registry/registry', replacement: path.resolve(import.meta.dirname, 'src/assets-registry-stub.ts') },
      { find: /^react-native$/, replacement: nm('react-native-web') },
      { find: /^react-native-svg$/, replacement: nm('react-native-svg/lib/module/ReactNativeSVG.web.js') },
      { find: /^react$/, replacement: nm('react') },
      { find: /^react\/(.*)$/, replacement: nm('react') + '/$1' },
      { find: /^react-dom$/, replacement: nm('react-dom') },
      { find: /^react-dom\/(.*)$/, replacement: nm('react-dom') + '/$1' },
    ],
  },
  server: { fs: { allow: ['..'] } },
});
