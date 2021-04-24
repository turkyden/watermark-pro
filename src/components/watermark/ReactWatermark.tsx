import { useEffect, useRef, useCallback } from 'react';
import Watermark from './Watermark';

interface WatermarkProps {
  url: string;
  width: number;
  height: number;
  text: string;
  fontSize: number;
  fillStyle: string;
  watermarkWidth: number;
  watermarkHeight: number;
}

const ReactWatermark: React.FC<WatermarkProps> = ({
  url = 'https://jdc.jd.com/img/600x400',
  width = 400,
  height = 400,
  text = '仅用于办理住房公积金，他用无效。',
  fontSize = '23',
  fillStyle = '#000000',
  watermarkWidth = 280,
  watermarkHeight = 180,
}) => {
  const ref = useRef(null);
  const watermark = useRef(null);

  useEffect(() => {
    watermark.current = new Watermark(ref.current) as any;
    watermark.current?.draw(url);
  }, []);

  useCallback(() => {
    watermark.current?.setOptions({
      text,
      fillStyle,
      fontSize,
      watermarkWidth,
      watermarkHeight,
    });
  }, [
    width,
    height,
    text,
    fillStyle,
    fontSize,
    watermarkWidth,
    watermarkHeight,
  ]);

  return <canvas ref={ref} width={width} height={height} />;
};

export default ReactWatermark;
