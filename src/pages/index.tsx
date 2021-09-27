import React, { useState, useReducer, useMemo } from 'react';
import { Button, Upload } from 'antd';
import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import FormRender, { useForm } from 'form-render';
import JSZip from 'jszip';
import { useSize } from 'ahooks';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';

import { Scaler, useScaler } from '@/components/Scaler';
import Watermark from '@/components/Watermark';
import Control from '@/components/Control';
import HotKey from '@/components/HotKey';

import Market from '@/sections/Market';

import { getBase64 } from '@/untils';

import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

import initialImage from '@/assets/watermark.jpg';
import '../../node_modules/pattern.css/dist/pattern.css';
import './index.css';

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
      default: '#00000080',
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
  options: initalOptions,
  fileList: [
    {
      uid: '0',
      name: '水印示例.png',
      status: 'done',
      url: initialImage,
      preview: initialImage,
      originFileObj: '',
    },
  ],
  current: 0,
  previewImage: initialImage,
  fileName: '水印示例.png',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_OPTIONS':
      return {
        ...state,
        options: action.payload,
      };
      break;
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
      break;
    default:
      throw new Error();
  }
}

export default function IndexPage() {
  const [{ options }, dispatch] = useReducer(reducer, initialState);
  const form = useForm();

  const [scale, scaleAction] = useScaler(60);

  const { height: screenHeight = window.innerHeight } = useSize(document.body);

  const [fileList, setFileList] = useState([
    {
      uid: '0',
      name: '水印示例.png',
      status: 'done',
      url: initialImage,
      preview: initialImage,
      originFileObj: initialImage,
      thumbUrl: initialImage,
    },
  ]);

  const [selected, setSeleted] = useState('0');

  const { fileName, previewImage } = useMemo(() => {
    const selectedFile = fileList.find((value) => value.uid === selected);
    return {
      fileName: selectedFile ? selectedFile.name : '未命名',
      previewImage: selectedFile
        ? selectedFile.preview
        : 'https://jdc.jd.com/img/1200x800',
    };
  }, [fileList, selected]);

  const onPreview = (file: any) => setSeleted(file.uid);

  const onChange = async ({ file, fileList: currentFileList }) => {
    const isRemove = currentFileList < fileList;
    if (isRemove) {
      if (currentFileList.length === 0) {
        setSeleted('-1');
        setFileList([]);
        return false;
      }
      const lastFile = currentFileList[currentFileList.length - 1];
      setSeleted(lastFile.uid);
      setFileList(currentFileList);
    } else {
      file.preview = await getBase64(file.originFileObj);
      setSeleted(file.uid);
      setFileList(
        currentFileList.map((v: any) => {
          return v.uid === file.uid ? file : v;
        }),
      );
    }
  };

  const onExport = async () => {
    const canvasDOM = document.querySelector('canvas');
    if (canvasDOM) {
      canvasDOM.toBlob((blob) => saveAs(blob, fileName));
      await onConfetti();
    }
  };

  const onConfetti = async () => {
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    const sleep = () =>
      new Promise((resolve, reject) => {
        window.setTimeout(() => resolve(''), 100);
      });
    for (let index = 0; index < 5; index++) {
      await sleep();
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(30, 90),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
    }
  };

  const onExportAll = async () => {
    const zip = new JSZip();
    zip.file(
      'LICENSE',
      `MIT License

    Copyright (c) 2021-present turkyden

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
    const renderCanvas = (ms: number = 1000) => {
      return new Promise<Blob>((resolve, reject) => {
        window.setTimeout(() => {
          const canvasDOM = document.querySelector('canvas');
          if (canvasDOM) {
            canvasDOM.toBlob((blob) => resolve(blob));
          } else {
            reject('error: render');
          }
        }, ms);
      });
    };
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      const { name, uid } = file;
      setSeleted(uid);
      const imgBlob = await renderCanvas();
      zip.file(name, imgBlob);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `watermark_${new Date().getTime()}.zip`);
    await onConfetti();
  };

  return (
    <div className="w-full">
      {/* Header */}
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

      {/* Canvas */}
      <section
        className="pattern-checks-sm | w-full relative bg-gray-200 text-gray-300 flex flex-col justify-center items-center overflow-hidden"
        style={{ height: screenHeight - 128 }}
        onWheel={scaleAction.onWheel}
      >
        <div style={{ transform: `scale(${scale / 100})` }}>
          <div className="text-gray-800 text-xl">
            <span className="inline-block p-2">{fileName}</span>
          </div>
          <Watermark url={previewImage} options={options} />
        </div>
        <Control title="💦 WaterMark Pro" defaultPosition={{ x: -16, y: 16 }}>
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
            Export
          </Button>
          <div className="py-1"></div>
          <Button block type="ghost" onClick={onExportAll}>
            Export .zip
          </Button>
        </Control>
        <Scaler scale={scale} {...scaleAction} />
        <HotKey />
      </section>

      {/* Upload Block */}
      <section className="w-full h-34 p-4 overflow-auto bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 shadow">
        {/* <ImgCrop modalTitle="Image Crop" rotate grid> */}
        <Upload
          method="get"
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
        {/* </ImgCrop> */}
        <div className="animate-bounce w-full absolute bottom-2 left-0 text-center text-gray-300">
          <ArrowDownOutlined
            className="text-2xl"
            onClick={() =>
              window.scrollTo({
                top: window.outerHeight,
                behavior: 'smooth',
              })
            }
          />
        </div>
      </section>

      {/* Market Pages */}
      <Market />
    </div>
  );
}
