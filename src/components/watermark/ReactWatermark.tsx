import { useEffect, useRef, useCallback } from 'react';
import Watermark from './Watermark';
interface Options {
  text: string;
  fontSize: number;
  fillStyle: string;
  watermarkWidth: number;
  watermarkHeight: number;
}

interface WatermarkProps {
  url: string;
  options: Options;
  scale: number;
}

const ReactWatermark: React.FC<WatermarkProps> = ({
  url = 'https://jdc.jd.com/img/600x400',
  options,
  scale,
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
      className="border-2 border-solid border-gray-300 hover:border-blue-500"
      style={{ transform: `scale(${scale / 100})` }}
    />
  );
};

export default ReactWatermark;
