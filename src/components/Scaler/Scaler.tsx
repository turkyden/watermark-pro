import Draggable from 'react-draggable';
import { PlusOutlined, MinusOutlined, ReloadOutlined } from '@ant-design/icons';

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
        <div className="px-2 py-2 text-gray-500 hover:text-gray-400">
          <PlusOutlined onClick={onZoomUp} />
        </div>
        <div className="px-2 py-2 text-gray-500 hover:text-gray-400">
          <MinusOutlined onClick={onZoomDown} />
        </div>
        <div className="px-2 py-2 text-gray-500 hover:text-gray-400">
          <ReloadOutlined onClick={onReset} />
        </div>
        <div className="px-2 py-2 text-gray-500">
          <span>{scale}%</span>
        </div>
      </div>
    </Draggable>
  );
}
