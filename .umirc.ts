import { defineConfig } from 'umi';

export default defineConfig({
  title:
    'Watermark Pro 最安全，最快速的纯前端图片加水印，拒绝上传保证个人信息安全。',
  metas: [
    {
      name: 'keywords',
      content: '水印生成工具, lowcode, 低代码',
    },
    {
      name: 'description',
      content:
        '💦 最安全，最快速的纯前端图片加水印，拒绝上传保证个人信息安全。',
    },
  ],
  hash: true,
  analytics: {
    baidu: 'd4071b11b31dd14a32c788c74c1d5b6b',
  },
  // runtimePublicPath: true,
  // publicPath:
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://cdn.jsdelivr.net/gh/turkyden/watermark-pro@gh-pages/'
  //     : '/',
  theme: {
    'primary-color': '#6366F1',
    'border-radius-base': '4px',
  },
  antd: {
    dark: false, // 开启暗色主题
    compact: true, // 开启紧凑主题
  },
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  headScripts: [
    `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2368901,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `,
  ],
});
