import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { Popover } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  InsertRowBelowOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

export default function Scaler({
  scale,
  onZoomUp,
  onZoomDown,
  onReset,
}: {
  scale: number;
  onZoomUp: () => void;
  onZoomDown: () => void;
  onReset: () => void;
}) {
  return (
    <Draggable handle=".scaler-handle">
      <div className="absolute z-50 bottom-4 right-2/2 shadow-lg rounded flex bg-gray-800">
        <div
          className="scaler-handle | px-2 py-2 select-none flex flex-col justify-center items-center"
          style={{ cursor: 'grab' }}
        >
          <svg
            className="octicon octicon-grabber"
            fill="#6B7280"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"
            ></path>
          </svg>
        </div>
        <div className="px-2 py-2 text-gray-500 hover:text-blue-500">
          <PlusOutlined onClick={onZoomUp} />
        </div>
        <div className="px-2 py-2 text-gray-500 hover:text-blue-500">
          <MinusOutlined onClick={onZoomDown} />
        </div>
        <div className="px-2 py-2 text-gray-500 hover:text-blue-500">
          <ReloadOutlined onClick={onReset} />
        </div>
        <div className="px-2 py-2 text-gray-500">
          <span>{scale}%</span>
        </div>
        {/* <div className="px-4 py-2 text-gray-500 hover:text-blue-500">
          <Hotkeys />
        </div> */}
      </div>
    </Draggable>
  );
}

function Hotkeys() {
  // remove the browser scale on wheel
  useEffect(() => {
    document.addEventListener(
      'keydown',
      function (event) {
        if (
          (event.ctrlKey === true || event.metaKey === true) &&
          (event.which === 61 ||
            event.which === 107 ||
            event.which === 173 ||
            event.which === 109 ||
            event.which === 187 ||
            event.which === 189)
        ) {
          event.preventDefault();
        }
      },
      false,
    );
    // Chrome IE 360
    window.addEventListener(
      'mousewheel',
      (event: any) => {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false },
    );

    //firefox
    window.addEventListener(
      'DOMMouseScroll',
      (event: any) => {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  }, []);

  const content = (
    <div className="text-gray-400">
      <div className="flex justify-between items-center">
        <p>
          <code className="border border-solid border-gray-600 px-2 rounded-sm">
            ctrl
          </code>{' '}
          +{' '}
          <code className="border border-solid border-gray-600 px-2 rounded-sm">
            space
          </code>
        </p>
        <p className="pl-4 text-xs">Drag Canvas</p>
      </div>
    </div>
  );

  return (
    <Popover title={undefined} content={content}>
      <InsertRowBelowOutlined />
    </Popover>
  );
}
