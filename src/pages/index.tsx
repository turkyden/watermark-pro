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
import { saveAs } from 'file-saver';
import { Watermark } from '@/components';

const schema = {
  type: 'object',
  properties: {
    text: {
      title: '水印文案',
      readOnly: false,
      required: false,
      default: '测试水印',
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
      default: 23,
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
      default: 280,
    },
    watermarkHeight: {
      title: '水印框高度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 180,
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
  const [collapsed, { toggle: toggleCollapsed }] = useToggle(true);
  const [options, setOptions] = useState(initalOptions);
  const form = useForm();
  const watch = {
    // # 为全局
    '#': (v) => {
      setOptions({
        ...initalOptions,
        ...v,
      });
    },
  };

  const { width: screenWidth = 0, height: screenHeight = 0 } = useSize(
    document.body,
  );

  const onExport = async () => {
    const canvasDOM = document.querySelector('canvas');
    if (canvasDOM) {
      canvasDOM.toBlob((blob) => saveAs(blob, 'pretty image.png'));
    }
  };

  const [fileList, setFileList] = useState([
    {
      uid: '0',
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

  const [guiPosition, setGuiPosition] = useState({ x: -16, y: 16 });
  return (
    <div className="w-screen h-screen oveflow-hidden">
      <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center bg-gray-300 bg-cover bg-center bg-no-repeat oveflow-hidden">
        <Watermark url={previewImage} options={options} />
        <Draggable
          position={guiPosition}
          onDrag={(e, { x, y }) => setGuiPosition({ x, y })}
          handle=".handle"
        >
          <div className="absolute z-50 top-0 right-0 w-64 px-4 bg-white rounded-xl shadow-lg">
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
              <FormRender form={form} schema={schema} watch={watch} />
              <Button block type="primary" onClick={onExport}>
                导出
              </Button>
            </div>
          </div>
        </Draggable>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-34 p-4 overflow-auto bg-white bg-opacity-95 shadow">
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
