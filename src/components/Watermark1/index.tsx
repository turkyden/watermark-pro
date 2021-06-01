import { useEffect, useRef } from 'react';
import Watermark from './Watermark';

interface Options {
  text: string;
  fontSize: number;
  fillStyle: string;
  watermarkWidth: number;
  watermarkHeight: number;
  rotate: number;
}

interface WatermarkProps {
  url: string;
  options: Options;
}

const ReactWatermark: React.FC<WatermarkProps> = ({
  url = 'https://jdc.jd.com/img/600x400',
  options,
}) => {
  const ref = useRef(null);
  const watermark = useRef(null);

  useEffect(() => {
    watermark.current = new Watermark(ref.current) as any;
    watermark.current?.draw(url);
  }, []);

  useEffect(() => {
    watermark.current?.setOptions(options);
    watermark.current?.draw(url);
  }, [url, options]);

  return (
    <canvas
      ref={ref}
      className="border-4 border-solid border-gray-300 hover:border-blue-500 shadow-2xl "
    />
  );
};

export default ReactWatermark;
