import React, { useState, useReducer } from 'react';
import { Button, Upload } from 'antd';
import {
  PlusOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined,
  GithubOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import FormRender, { useForm } from 'form-render';
import JSZip from 'jszip';
import Draggable from 'react-draggable';
import { useSize } from 'ahooks';
import { saveAs } from 'file-saver';
import { Watermark } from '@/components';
import initialImage from '@/assets/watermark.jpg';
import '../../node_modules/pattern.css/dist/pattern.css';
import './index.css';
import { Scaler, useScaler } from './../components/scaler';
import Weixin from '@/assets/weixin.png';
import Alipay from '@/assets/alipay.png';

import { getBase64 } from '@/untils';

const schema = {
  type: 'object',
  properties: {
    text: {
      title: 'Text',
      readOnly: false,
      required: false,
      default: '仅用于办理住房公积金，他用无效。',
      props: {
        allowClear: false,
      },
      type: 'string',
    },
    fillStyle: {
      title: 'Color',
      readOnly: false,
      required: false,
      type: 'string',
      format: 'color',
      default: '#000000',
    },
    fontSize: {
      title: 'Font Size (px)',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 26,
      min: 12,
      max: 64,
    },
    rotate: {
      title: 'Rotate (^)',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 20,
      min: 0,
      max: 45,
    },
    watermarkWidth: {
      title: 'Width (px)',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 252,
      min: 100,
      max: 560,
    },
    watermarkHeight: {
      title: 'Height (px)',
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

const initialState = {
  collapsed: true,
  options: initalOptions,
  fileList: [
    {
      uid: '0',
      name: '水印示例.png',
      status: 'done',
      url: initialImage,
      originFileObj: '',
    },
  ],
  current: 0,
  previewImage: initialImage,
  fileName: '水印示例.png',
};

function reducer(state, action) {
  switch (action.type) {
    case 'COLLAPSE_GUI':
      return {
        ...state,
        collapsed: !state.collapsed,
      };
      break;
    case 'SET_OPTIONS':
      return {
        ...state,
        options: action.payload,
      };
      break;
    case 'SET_CURRENT':
      return {
        ...state,
        options: action.payload,
      };
      break;
    default:
      throw new Error();
  }
}

export default function IndexPage() {
  const [{ collapsed, options }, dispatch] = useReducer(reducer, initialState);
  const form = useForm();

  const [scale, scaleAction] = useScaler(60);

  const { height: screenHeight = window.innerHeight } = useSize(document.body);

  const [fileList, setFileList] = useState([
    {
      uid: '0',
      name: '水印示例.png',
      status: 'done',
      url: initialImage,
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
    zip.file(
      'LICENSE',
      `MIT License

    Copyright (c) 2021-present Turkyden

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.`,
    );
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      const { name, originFileObj } = file;
      zip.file(name, originFileObj);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'watermark.zip');
    console.log(fileList);
  };

  return (
    <div className="w-full">
      <header className="fixed z-40 top-4 left-4 flex justify-start items-center content-center">
        <div className="pr-4 text-gray-800">
          <div className="text-2xl font-semibold font-sans z-50">
            WaterMark Pro
          </div>
        </div>
        <a href="https://github.com/Turkyden/watermark-pro" target="_blank">
          <img
            className="w-24"
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/Turkyden/watermark-pro?style=social"
          />
        </a>
      </header>

      {/* hero */}
      <section
        className="w-full relative bg-gray-200 text-gray-300 pattern-checks-sm flex flex-col justify-center items-center overflow-hidden"
        style={{ height: screenHeight - 128 }}
        onWheel={scaleAction.onWheel}
      >
        <div style={{ transform: `scale(${scale / 100})` }}>
          <div className="text-gray-800 text-xl pb-2 px-2">{fileName}</div>
          <Watermark url={previewImage} options={options} />
        </div>
        <Draggable defaultPosition={{ x: -16, y: 16 }} handle=".handle">
          <div className="absolute z-50 top-0 right-0 w-64 px-4 bg-white rounded-md shadow-lg">
            <div className="flex justify-between items-center py-2 text-gray-500">
              {React.createElement(
                collapsed ? CaretDownOutlined : CaretUpOutlined,
                { onClick: () => dispatch({ type: 'COLLAPSE_GUI' }) },
              )}
              <span className="handle | text-lg" style={{ cursor: 'grab' }}>
                : : :
              </span>
              <SearchOutlined />
            </div>
            <div className={[collapsed ? 'block' : 'hidden', 'pb-4'].join(' ')}>
              <div className="flex justify-center items-center">
                <div className="text-base pb-2 text-gray-600 font-semibold font-sans">
                  💦 WaterMark Pro
                </div>
              </div>
              <FormRender
                form={form}
                schema={schema}
                watch={{
                  '#': (v) =>
                    dispatch({
                      type: 'SET_OPTIONS',
                      payload: {
                        ...initalOptions,
                        ...v,
                      },
                    }),
                }}
              />
              <Button
                block
                type="primary"
                className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400"
                onClick={onExport}
              >
                导出
              </Button>
              <div className="py-1"></div>
              <Button block type="ghost" onClick={onExportAll}>
                批量导出 .zip
              </Button>
            </div>
          </div>
        </Draggable>
        <Scaler scale={scale} {...scaleAction} />
        <div className="absolute bottom-2 left-4">
          <div className="flex items-center">
            <div className="py px-4 bg-gray-800 bg-opacity-75 text-gray-200 rounded-sm">
              Ctrl
            </div>
            <div className="py px-2 text-gray-800">+</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="#4B5563"
                d="M11.141 4c-1.582 0-2.387.169-3.128.565a3.453 3.453 0 0 0-1.448 1.448C6.169 6.753 6 7.559 6 9.14v5.718c0 1.582.169 2.387.565 3.128.337.63.818 1.111 1.448 1.448.74.396 1.546.565 3.128.565h1.718c1.582 0 2.387-.169 3.128-.565a3.453 3.453 0 0 0 1.448-1.448c.396-.74.565-1.546.565-3.128V9.14c0-1.582-.169-2.387-.565-3.128a3.453 3.453 0 0 0-1.448-1.448C15.247 4.169 14.441 4 12.86 4H11.14zm0-2h1.718c2.014 0 3.094.278 4.072.801a5.452 5.452 0 0 1 2.268 2.268c.523.978.801 2.058.801 4.072v5.718c0 2.014-.278 3.094-.801 4.072a5.452 5.452 0 0 1-2.268 2.268c-.978.523-2.058.801-4.072.801H11.14c-2.014 0-3.094-.278-4.072-.801a5.452 5.452 0 0 1-2.268-2.268C4.278 17.953 4 16.873 4 14.859V9.14c0-2.014.278-3.094.801-4.072A5.452 5.452 0 0 1 7.07 2.801C8.047 2.278 9.127 2 11.141 2zM11 6h2v5h-2V6z"
              />
            </svg>
            <div className="text-gray-600 pl-4">画布缩放</div>
          </div>
        </div>
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
        <div className="animate-bounce w-full absolute bottom-2 left-0 text-center">
          <ArrowDownOutlined className="text-2xl" />
        </div>
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
                <span className="title-font font-medium">批量处理</span>
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
                <span className="title-font font-medium">批量导出</span>
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
        <table className="border-collapse border-solid border gray-200 text-center m-auto">
          <thead>
            <tr>
              <th className="border border-solid border-gray-200">微信</th>
              <th className="border border-solid border-gray-200">支付宝</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-solid border-gray-200">
                <img src={Weixin} width={150} alt="微信支付" />
              </td>
              <td className="border border-solid border-gray-200">
                <img src={Alipay} width={140} alt="支付宝支付" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="text-gray-600 body-font bg-gray-900">
        <div className="container px-5 pt-16 pb-24 mx-auto">
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
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Second Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Third Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
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
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Second Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Third Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
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
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href="https://tailblocks.cc/"
                    target="_blank"
                  >
                    Tailblocks
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
                    Third Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
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
                    Second Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Third Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
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
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    First Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Second Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Third Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
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
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    First Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Second Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Third Link
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-indigo-500 hover:underline"
                    href=""
                    target="_blank"
                  >
                    Fourth Link
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
    </div>
  );
}
