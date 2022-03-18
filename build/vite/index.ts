import vue from '@vitejs/plugin-vue';
import type { Plugin } from 'vite';

import PurgeIcons from 'vite-plugin-purge-icons';
import usePluginImport from 'vite-plugin-importer';
import { configSvgPlugin } from './svgPlugin';
import { mockConfig } from './mock';
// import { configThemePlugin } from "./theme";

export default function createPlugin(isBuild) {
  const plugins: (Plugin | Plugin[])[] | undefined = [
    vue(),
    PurgeIcons(),
    usePluginImport({
      libraryName: 'ant-design-vue',
      libraryDirectory: 'es',
      style: true,
    }),
    mockConfig(isBuild),
  ];
  plugins.push(configSvgPlugin(isBuild));
  // plugins.push(configThemePlugin());

  return plugins;
}
