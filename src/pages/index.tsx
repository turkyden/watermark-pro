import React, { useState, useEffect, useRef } from 'react';
import { Button, Drawer, Upload } from 'antd';
import {
  PlusOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import FormRender, { useForm } from 'form-render';
import { Rnd } from 'react-rnd';
import Draggable from 'react-draggable';
import { useSize, useToggle } from 'ahooks';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import { Watermark } from '../components';

const schema = {
  type: 'object',
  properties: {
    inputName: {
      title: '水印文案',
      readOnly: false,
      required: false,
      props: {
        allowClear: false,
      },
      type: 'string',
    },
    color_azGFr9: {
      title: '字体颜色',
      readOnly: false,
      required: false,
      type: 'string',
      format: 'color',
    },
    slider_Qfdcat: {
      title: '透明度',
      description: '',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
    },
    slider_jj9Ft6: {
      title: '字体大小',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
    },
    slider_rnzPob: {
      title: '水印框宽度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
    },
    slider_MLZmTc: {
      title: '水印框高度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
    },
  },
  displayType: 'column',
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function IndexPage() {
  const [collapsed, { toggle: toggleCollapsed }] = useToggle(true);

  const form = useForm();

  const watch = {
    // # 为全局
    '#': (val: any) => {
      console.log('表单的时时数据为：', val);
    },
    input1: (val: any) => {
      if (val !== undefined) {
        form.onItemChange('input2', val);
      }
    },
  };

  const { width: screenWidth = 0, height: screenHeight = 0 } = useSize(
    document.body,
  );

  const onExport = async () => {
    const canvasDOM = document.querySelector('canvas');
    if (canvasDOM) {
      const canvas = await html2canvas(canvasDOM as HTMLElement);
      canvas.toBlob((blob) => saveAs(blob, 'pretty image.png'));
    }
  };

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);

  const [fileList, setFileList] = useState([
    {
      uid: '0',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '1',
      name: 'image.png',
      status: 'done',
      url: 'https://jdc.jd.com/img/600x400',
    },
  ]);

  const initalImage = fileList.length > 0 ? fileList[0].url : '';
  const [previewImage, setPreviewImage] = useState(initalImage || '');

  const onPreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const onChange = async ({ fileList, file }: any) => {
    setFileList(fileList);
    await onPreview(fileList[fileList.length - 1]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="w-screen h-screen">
      <div
        className="w-full bg-gray-100"
        style={{ height: screenHeight - 144 }}
      >
        <Rnd
          className="canvas | flex justify-center items-center border border-solid border-gray-300 hover:border-blue-500 bg-gray-300 bg-cover bg-center bg-no-repeat"
          bounds="parent"
          size={{ width, height }}
          position={{ x, y }}
          onDragStop={(e, d) => {
            setX(d.x);
            setY(d.y);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setWidth(ref.offsetWidth);
            setHeight(ref.offsetHeight);
            setX(position.x);
            setY(position.y);
          }}
        >
          <Watermark width={width} height={height} />
        </Rnd>
        <Draggable position={{ x: screenWidth - 340, y: 20 }} handle=".handle">
          <div className="w-64 px-4 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center py-2">
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
              <div className="flex justify-center items-center py-2">
                <h2>💦 WaterMark Pro</h2>
              </div>
              <FormRender
                form={form}
                schema={schema}
                onFinish={() => {}}
                watch={watch}
              />
              <Button block type="primary" onClick={onExport}>
                导出
              </Button>
            </div>
          </div>
        </Draggable>
      </div>
      <div className="w-full p-4 overflow-auto bg-white shadow">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
          onChange={onChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </div>
    </div>
  );
}
