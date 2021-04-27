import React, { useState, useEffect, useRef } from 'react';
import { Button, Drawer, Upload } from 'antd';
import {
  PlusOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import FormRender, { useForm } from 'form-render';
import JSZip from 'jszip';
import Draggable from 'react-draggable';
import { useSize, useToggle } from 'ahooks';
import { saveAs } from 'file-saver';
import { Watermark } from '@/components';
import imageUrl from '@/assets/watermark.jpg';
import '../../node_modules/pattern.css/dist/pattern.css';
import './index.css';
import { Scaler, useScaler } from './../components/scaler';
import Weixin from '@/assets/weixin.png';
import Alipay from '@/assets/alipay.png';

const schema = {
  type: 'object',
  properties: {
    text: {
      title: '水印文案',
      readOnly: false,
      required: false,
      default: '仅用于办理住房公积金，他用无效。',
      props: {
        allowClear: false,
      },
      type: 'string',
    },
    fontSize: {
      title: '字体大小',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 24,
      min: 12,
      max: 64,
    },
    fillStyle: {
      title: '字体颜色',
      readOnly: false,
      required: false,
      type: 'string',
      format: 'color',
      default: '#000000',
    },
    watermarkWidth: {
      title: '水印框宽度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 252,
      min: 100,
      max: 560,
    },
    watermarkHeight: {
      title: '水印框高度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 180,
      min: 100,
      max: 360,
    },
  },
  displayType: 'column',
};

const initalOptions = (() => {
  const object = schema.properties;
  let defaultObj = {} as any;
  for (const key in object) {
    defaultObj[key] = object[key].default;
  }
  return defaultObj;
})();

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function IndexPage() {
  const [guiPosition, setGuiPosition] = useState({ x: -16, y: 16 });
  const [collapsed, { toggle: toggleCollapsed }] = useToggle(true);
  const [options, setOptions] = useState(initalOptions);
  const form = useForm();

  const [scale, { onWheel, onZoomUp, onZoomDown, onReset }] = useScaler(60);

  const { height: screenHeight = window.innerHeight } = useSize(document.body);

  const [fileList, setFileList] = useState([
    {
      uid: '0',
      name: '水印示例.png',
      status: 'done',
      url: imageUrl,
      originFileObj: '',
    },
  ]);
  const initalImage = fileList.length > 0 ? fileList[0].url : '';
  const initalFilename = fileList.length > 0 ? fileList[0].name : '';
  const [previewImage, setPreviewImage] = useState(initalImage || '');
  const [fileName, setFileName] = useState(initalFilename || '');

  const onPreview = async (file: any) => {
    if (!file) return;
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setFileName(file.name);
  };

  const onChange = async ({ fileList }: any) => {
    setFileList(fileList);
    await onPreview(fileList[fileList.length - 1]);
  };

  const onExport = () => {
    const canvasDOM = document.querySelector('canvas');
    if (canvasDOM) {
      canvasDOM.toBlob((blob) => saveAs(blob, fileName));
    }
  };

  const onExportAll = async () => {
    const zip = new JSZip();
    zip.file('Hello.txt', 'Hello World\n');
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      const { name, originFileObj } = file;
      zip.file(name, originFileObj);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'watermark.zip');
  };

  return (
    <div className="w-full" onWheel={onWheel}>
      <header className="fixed z-50 top-4 left-4 flex justify-start items-center content-center">
        <div className="text-2xl font-normal pr-4 text-gray-800">
          💦 WaterMark Pro
        </div>
        <a href="https://github.com/Turkyden/watermark-pro" target="_blank">
          <img
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/Turkyden/watermark-pro?style=social"
          />
        </a>
      </header>

      {/* hero */}
      <section
        className="w-full relative bg-gray-200 text-gray-300 pattern-checks-sm flex flex-col justify-center items-center overflow-hidden"
        style={{ height: screenHeight - 128 }}
      >
        <div style={{ transform: `scale(${scale / 100})` }}>
          <div className="text-gray-800 text-xl pb-2 px-2">{fileName}</div>
          <Watermark url={previewImage} options={options} />
        </div>
        <Draggable
          position={guiPosition}
          onDrag={(e, { x, y }) => setGuiPosition({ x, y })}
          handle=".handle"
        >
          <div className="absolute z-50 top-0 right-0 w-64 px-4 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center py-2 text-gray-500">
              {React.createElement(
                collapsed ? CaretDownOutlined : CaretUpOutlined,
                { onClick: () => toggleCollapsed() },
              )}
              <span className="handle | text-lg" style={{ cursor: 'grab' }}>
                : : :
              </span>
              <SearchOutlined />
            </div>
            <div className={[collapsed ? 'block' : 'hidden', 'pb-4'].join(' ')}>
              <div className="flex justify-center items-center py-2 text-gray-500">
                <div className="text-lg pb-2">💦 WaterMark Pro</div>
              </div>
              <FormRender
                form={form}
                schema={schema}
                watch={{
                  '#': (v) => {
                    setOptions({
                      ...initalOptions,
                      ...v,
                    });
                  },
                }}
              />
              <Button block type="primary" onClick={onExport}>
                导出
              </Button>
              <div className="py-2"></div>
              <Button block type="ghost" onClick={onExportAll}>
                批量导出 .zip
              </Button>
            </div>
          </div>
        </Draggable>
        <Scaler
          scale={scale}
          onZoomUp={onZoomUp}
          onZoomDown={onZoomDown}
          onReset={onReset}
        />
      </section>

      <section className="w-full h-34 p-4 overflow-auto bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 shadow">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
          onChange={onChange}
        >
          {fileList.length >= 8 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </section>

      {/* feather */}
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
              最安全，最快速的纯前端图片加水印，拒绝上传保证个人信息安全。
            </p>
            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
              主要用途
            </h2>
            <p className="text-gray-500">
              在各种证件上添加“仅用于办理XXXX，他用无效。”，防止证件被他人盗用！
            </p>
            <a
              className="block"
              href="https://www.sohu.com/a/257807692_160569"
              target="_blank"
            >
              新闻：身份证复印件被盗用所造成的损失，你想象不到！
            </a>
            <a
              className="block"
              href="https://www.zhihu.com/question/20632460"
              target="_blank"
            >
              知乎：身份证复印件给别人怎么避免安全问题？
            </a>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">批量处理</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">批量导出</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
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
            className="flex justify-center items-center w-32 text-center mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            <GithubOutlined />
            <span className="pl-2">Resource</span>
          </a>
        </div>
      </section>

      <section className="w-full pb-32">
        <h2 className="text-6xl text-center">☕</h2>
        <p className="text-center py-2">
          如果这个小工具对你<span className="text-2xl"> 有用</span>
        </p>
        <p className="text-center pb-10">
          你可以赞助作者 or 请他喝一杯咖啡吧！
        </p>
        <table class="border-collapse border-solid border gray-200 text-center m-auto">
          <thead>
            <tr>
              <th class="border border-solid border-gray-200">微信</th>
              <th class="border border-solid border-gray-200">支付宝</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-solid border-gray-200">
                <img src={Weixin} width={150} alt="微信支付" />
              </td>
              <td class="border border-solid border-gray-200">
                <img src={Alipay} width={140} alt="支付宝支付" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="text-gray-600 body-font bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                实用工具
              </h2>
              <nav className="list-none mb-10">
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
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
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
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                开源项目
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                友情链接
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                更多作品
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-300 tracking-widest text-lg mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 hover:text-indigo-500 hover:underline">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
            <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
                <label
                  htmlFor="footer-field"
                  className="leading-7 text-sm text-gray-300"
                >
                  E-Mail
                </label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  value="wj871287@gmail.com"
                  readOnly
                  className="w-full bg-opacity-50 rounded border border-gray-300 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded cursor-pointer"
                onClick={() => window.open('https://github.com/Turkyden')}
              >
                联系我们
              </button>
            </div>
            <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2020 Copyright —
              <a
                href="https://github.com/Turkyden"
                className="text-indigo-400 hover:text-indigo-500 ml-1 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Turkyden
              </a>
            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              Created with 💜 <b>MIT</b>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
