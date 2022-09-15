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

  return <canvas ref={ref} width="1024" height="683" />;
};

export default ReactWatermark;
