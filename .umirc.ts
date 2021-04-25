import { defineConfig } from 'umi';

export default defineConfig({
  theme: {
    'primary-color': '#6366F1',
  },
  antd: {
    dark: false, // 开启暗色主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
