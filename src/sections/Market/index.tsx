import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import Wechat from '@/assets/wechat.png';
import Alipay from '@/assets/alipay.png';

export const Market: React.FC = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-gray-400 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
              最安全，最快速的纯前端图片加水印，无需上传保证个人信息安全。
              <br />
              在各种证件上添加
              <span className="text-indigo-500">
                「仅用于办理XXXX，他用无效」
              </span>
              防止证件被他人盗用！
            </p>
            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8"></span>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://images.pexels.com/photos/3839649/pexels-photo-3839649.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=720&w=400"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    新闻：身份证复印件被盗用所造成的损失，你想象不到！
                  </h1>
                  <p className="leading-relaxed mb-3">
                    你能想象你的别墅一夜之间没有了吗？你能想象你一夜之间欠了银行十几万吗？你能想象因为身份证复印件没有签注而被人告上法庭吗？惨痛案例告诫人们--身份证复印件签注书写太重要了！知道的人越多，就一定会有更少的人受骗。
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href="http://www.360doc.com/content/15/0923/17/22513831_501073654.shtml"
                      target="_blank"
                    >
                      阅读详情
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=720&w=400"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    百科：为什么身份证复印件要加水印？避免证件被盗用，这样加水印才安全
                  </h1>
                  <p className="leading-relaxed mb-3">
                    在日常生活中，提供身份证或者其它证件复印件，是现代人经常会遇到的事，但这里边有些不可不知的风险。在大多场合理论来说，没有证件原件甚至本人在场的情况下，复印件并不能起到足够的证明作用。
                  </p>
                  <div className="flex items-center flex-wrap">
                    <a
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href="https://baijiahao.baidu.com/s?id=1648694020038096353&wfr=spider&for=pc"
                      target="_blank"
                    >
                      阅读详情
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      8.3K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      123
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=720&w=400"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    知乎：身份证复印件给别人怎么避免安全问题？涉及的法律纠纷有哪些？
                  </h1>
                  <p className="leading-relaxed mb-3">
                    在大多场合理论上来说，没有证件原件甚至本人在场的情况下，复印件并不能起到足够的证明作用。但由于审核不明等特殊原因，也有极大风险。所以，所提供的复印件最好加上水印，以防万一。
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href="https://www.zhihu.com/question/20632460"
                      target="_blank"
                    >
                      阅读详情
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      4.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      23
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
              纯前端项目、拒绝上传、保护信息安全
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              仅借助您的 Web 浏览器和{' '}
              <a
                href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob"
                target="_blank"
              >
                HTML5
              </a>{' '}
              新特性，轻松实现加注水印与图片导出功能
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">Canvas 画布缩放</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">图片裁剪</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  支持多种图片格式 (.png .jpg .gif)
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">批量处理、导出</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">可离线断网使用</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">代码完全开源</span>
              </div>
            </div>
          </div>
          <a
            href="https://github.com/Turkyden/watermark-pro"
            target="_blank"
            className="flex justify-center items-center w-32 text-center mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 focus:outline-none hover:bg-indigo-600 rounded-full text-lg"
          >
            <GithubOutlined />
            <span className="pl-2">Resource</span>
          </a>
        </div>
      </section>

      <section className="w-full pb-32">
        <h2 className="text-3xl text-center">参与贡献</h2>
        <p className="text-center py-2">感谢以下开发者的积极贡献！</p>
        <div className="text-center pt-4">
          <img src="https://contrib.rocks/image?repo=Turkyden/watermark-pro" />
        </div>
      </section>

      <section className="w-full pb-32">
        <h2 className="text-3xl text-center">捐赠</h2>
        <p className="text-center py-2">如果这个小工具对你有帮助</p>
        <p className="text-center pb-10">
          你也可以赞助作者 or 请他喝一杯 <span className="text-2xl">☕</span>{' '}
          哦！
        </p>
        <table className="border-0 text-center m-auto">
          <tbody>
            <tr>
              <td>
                <img src={Wechat} width={320} alt="微信支付" />
              </td>
              <td>
                <img src={Alipay} width={320} alt="支付宝支付" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="text-gray-600 body-font bg-gray-900">
        <div className="container px-5 pt-16 pb-24 mx-auto">
          <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                实用工具
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Iconfont 图标库
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://cli.im/"
                    target="_blank"
                  >
                    草料二维码
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    美图秀秀
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    RGB 色彩转换
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://color.adobe.com/zh/create/color-wheel"
                    target="_blank"
                  >
                    Adobe 标准色卡
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                设计酷站
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://www.zcool.com.cn/"
                    target="_blank"
                  >
                    站酷
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    UI 中国
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    优设网
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Dribbble
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Behance
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                开源项目
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://tailblocks.cc/"
                    target="_blank"
                  >
                    TailwindCSS
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://tailblocks.cc/"
                    target="_blank"
                  >
                    Ant Design
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    X-Render
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    React-Dnd
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                友情链接
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="http://h5.dooring.cn/"
                    target="_blank"
                  >
                    H5 Dooring
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    PC Dooring
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    徐小夕·趣学前端
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Yck 前端真好玩
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                更多作品
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://www.github.com/Turkyden/react-darkreader"
                    target="_blank"
                  >
                    React Darkreader
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://www.github.com/Turkyden/image-hover"
                    target="_blank"
                  >
                    Image Hover Effects
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://www.github.com/Turkyden/vue-typical"
                    target="_blank"
                  >
                    Vue Typical
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://www.github.com/Turkyden/digital-go"
                    target="_blank"
                  >
                    Digital Go
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="container mx-auto py-4 px-5 flex justify-center items-center">
            <p className="text-gray-500 text-sm text-center sm:text-center">
              <span className="pl-4">
                MIT & Created with 💜 By
                <a
                  href="https://github.com/Turkyden"
                  className="text-gray-400 hover:text-indigo-400 ml-1 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @Turkyden
                </a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Market;
