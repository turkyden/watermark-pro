import React, { useState } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from '@ant-design/icons';

export interface ControlsProps extends Partial<DraggableProps> {
  title: string;
  visible?: boolean;
  children?: React.ReactNode;
}

export const Control: React.FC<ControlsProps> = ({
  title = '🎛️ React Control',
  visible = true,
  children,
  defaultPosition = { x: -16, y: 16 },
  handle = '#react_control_handle',
  ...draggableProps
}) => {
  const [collapsed, setCollapsed] = useState(visible);

  const handleCollapse = () => setCollapsed((pre) => !pre);

  return (
    <Draggable
      defaultPosition={defaultPosition}
      handle={handle}
      {...draggableProps}
    >
      <div className="absolute z-50 top-0 right-0 w-64 px-4 bg-white rounded-md shadow-lg">
        <div className="flex justify-between items-center py-2 text-gray-500 select-none">
          {React.createElement(
            collapsed ? CaretDownOutlined : CaretUpOutlined,
            { onClick: handleCollapse },
          )}
          <span
            id="react_control_handle"
            className="text-lg"
            style={{ cursor: 'grab' }}
          >
            : : :
          </span>
          <SearchOutlined />
        </div>
        <div className={[collapsed ? 'block' : 'hidden', 'pb-4'].join(' ')}>
          <div className="flex justify-center items-center">
            <div className="text-base pb-2 text-gray-600 font-semibold font-sans">
              {title}
            </div>
          </div>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Control;
