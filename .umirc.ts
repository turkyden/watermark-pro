import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: false, // 开启暗色主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
