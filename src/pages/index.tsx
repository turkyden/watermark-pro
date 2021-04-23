import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

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

export default function IndexPage() {
  const form = useForm();

  return (
    <div className="w-screen h-screen flex justify-between">
      <div className="w-full h-full bg-gray-200 flex flex-col justify-center items-center">
        <div>
          <img src="https://jdc.jd.com/img/600x400" alt="占位图" />
        </div>
      </div>
      <div className="w-96 h-full p-4">
        <div className="flex justify-center items-center">
          <h2>💦 WaterMark Pro</h2>
        </div>
        <div className="py-4"></div>
        <FormRender form={form} schema={schema} onFinish={() => {}} />
        <Button block type="primary" onClick={form.submit}>
          导出
        </Button>
      </div>
    </div>
  );
}
