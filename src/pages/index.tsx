import React, { useState, useEffect } from 'react';
import { Button, Drawer, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormRender, { useForm } from 'form-render';
import { Rnd } from 'react-rnd';

import '../../node_modules/react-rnd';

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
  const form = useForm();

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);

  const [visible, setVisuble] = useState(true);
  const onClose = () => useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const onCancel = () => setPreviewVisible(false);

  const onPreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const onChange = ({ fileList }: any) => setFileList(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="w-screen h-screen flex justify-between">
      <div className="w-full" style={{ height: 700 }}>
        <Rnd
          className="flex justify-center items-center border border-solid border-gray-300 hover:border-blue-500 bg-gray-300 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://jdc.jd.com/img/600x400)` }}
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
        ></Rnd>
      </div>
      <div className="w-full p-10 overflow-auto bg-white shadow">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
          onChange={onChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={onCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      <Rnd
        dragHandleClassName="handle"
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
      >
        <div className="fixed w-64 p-4 bg-white">
          <div className="handle | flex justify-center items-center">
            <h2>💦 WaterMark Pro</h2>
          </div>
          <div className="py-4"></div>
          <FormRender form={form} schema={schema} onFinish={() => {}} />
          <Button block type="primary" onClick={form.submit}>
            导出
          </Button>
        </div>
      </Rnd>
    </div>
  );
}
