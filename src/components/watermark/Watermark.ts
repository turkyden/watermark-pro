const canvasTextAutoLine = (ctx, width, str, initX, initY, lineHeight = 20) => {
  // ctx.fillText(str, 0, lineHeight);
  // return;
  let lineWidth = 0;
  let lastSubStrIndex = 0;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > width - initX) {
      //减去initX,防止边界出现的问题
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }
    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
  }
};

interface Options {
  text: string;
  fontSize: number;
  fillStyle: string;
  watermarkWidth: number;
  watermarkHeight: number;
}

class Watermark {
  private canvas: HTMLCanvasElement;
  private img: CanvasImageSource;
  private cw: HTMLCanvasElement = document.createElement('canvas');
  // document.getElementById("test").appendChild(cw);
  private img_width: number = 100;
  private img_height: number = 160;
  private userOptions: Options = {
    text: '仅用于办理XXXX，他用无效。',
    fontSize: 23,
    fillStyle: 'rgba(100, 100, 100, 0.4)',
    watermarkWidth: 280,
    watermarkHeight: 180,
  };

  constructor(canvas, opt = {}) {
    this.canvas = canvas;
    // const watermarkCanvas = document.createElement("canvas");
    // watermarkCanvas.width = "160px";
    // watermarkCanvas.height = "100px";
    this.createWatermarkCanvas();
  }

  /**创建水印 */
  createWatermarkCanvas() {
    const { userOptions, cw } = this;
    const {
      text,
      fontSize,
      fillStyle,
      watermarkWidth,
      watermarkHeight,
    } = userOptions;
    const rotate = 20;
    const wctx = cw.getContext('2d');
    //清除小画布
    // wctx.clearRect(0, 0, cw.width, cw.height);
    const { sqrt, pow, sin, tan } = Math;
    cw.width = sqrt(pow(watermarkWidth, 2) + pow(watermarkHeight, 2));
    cw.height = watermarkHeight;
    if (wctx) {
      wctx.font = `${fontSize}px 黑体`;
      //文字倾斜角度
      wctx.rotate((-rotate * Math.PI) / 180);
      wctx.fillStyle = fillStyle;
      const Y = parseInt(sin((rotate * Math.PI) / 180) * watermarkWidth, 10);
      const X = -parseInt(Y / tan(((90 - rotate) * Math.PI) / 180), 10);
      canvasTextAutoLine(
        wctx,
        watermarkWidth,
        text,
        X + 10,
        Y + fontSize + 20,
        fontSize * 1.4,
      );
    }
  }

  _draw() {
    this.drawImage();
    this.addWatermark();
  }

  drawImage() {
    const { canvas, img, img_width, img_height } = this;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img_width;
    canvas.height = img_height;
    ctx.drawImage(img, 0, 0, img_width, img_height);
  }

  // 新增水印
  addWatermark() {
    const { canvas, cw } = this;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    //平铺--重复小块的canvas
    const pat = ctx.createPattern(cw, 'repeat') as CanvasPattern;
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 绘制背景图
  draw(dataURL: string) {
    this.img = new Image();
    this.img.setAttribute('crossOrigin', 'anonymous');
    this.img.onload = () => {
      this.img_width = this.img.width as number;
      const max = window.innerWidth - 100;
      if (this.img_width > max) {
        this.img_width = max;
        this.img_height =
          (max * (this.img.height as number)) / (this.img.width as number);
      } else {
        this.img_height = this.img.height as number;
      }
      this._draw();
    };
    this.img.src = dataURL;
  }

  setOptions = (obj: Options) => {
    this.userOptions = obj;
    this.createWatermarkCanvas();
    if (!this.img) return;
    this._draw();
  };
}

export default Watermark;
