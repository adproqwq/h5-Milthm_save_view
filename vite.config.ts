import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unfonts from 'unplugin-fonts/vite';
import wasm from '@rollup/plugin-wasm';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('mdui-'),
        },
      },
    }),
    Unfonts({
      custom: {
        families: [
          {
            name: '寒蝉全圆体',
            local: 'ChillRoundF',
            src: './src/assets/ChillRoundFRegular.ttf',

          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        wasm({
          include: /\.wasm$/i,
        }),
      ],
    },
  },
  server: {
    port: 3000,
  },
})
