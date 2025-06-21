export interface TrackItem {
  rank: string;
  title: string;
  difficulty: string;
  grade: string;
  score: string;
  accuracy: string;
}

export class ImageRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1200;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  private loadImage(path: string): Promise<HTMLImageElement>{
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject();
      img.src = path;
    });
  }

  async drawBackground() {
    const background = await this.loadImage('./background.jpg');
    this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
  }

  drawHeader(playerInfo: {
    player: string;
    reality: string;
  }) {
    // 1. 绘制基础半透明背景
    const gradient = this.ctx.createLinearGradient(0, 0, 0, 120);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

    // 绘制圆角矩形
    this.ctx.beginPath();
    this.ctx.moveTo(0.5, 0);
    this.ctx.lineTo(this.canvas.width - 0.5, 0);
    this.ctx.arcTo(this.canvas.width, 0, this.canvas.width, 0.5, 0.5);
    this.ctx.lineTo(this.canvas.width, 119.5);
    this.ctx.arcTo(this.canvas.width, 120, this.canvas.width - 0.5, 120, 0.5);
    this.ctx.lineTo(0.5, 120);
    this.ctx.arcTo(0, 120, 0, 119.5, 0.5);
    this.ctx.lineTo(0, 0.5);
    this.ctx.arcTo(0, 0, 0.5, 0, 0.5);
    this.ctx.closePath();

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // 2. 添加内部边框
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.stroke();

    // 3. 添加顶部发光效果
    const glowGradient = this.ctx.createLinearGradient(0, 0, 0, 20);
    glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.ctx.fillStyle = glowGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, 20);

    this.ctx.fillStyle = '#fff';

    // 标题区域
    this.ctx.font = '24px ChillRoundF';
    this.ctx.fillText(document.title, 50, 50);

    this.ctx.font = '16px ChillRoundF';
    this.ctx.fillText('https://milthm.adproqwq.top/', 50, 70);
    this.ctx.fillText('Hope you have a good day!', 50, 90);

    // 右侧玩家信息
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Player: ${playerInfo.player}`, this.canvas.width - 50, 50);
    this.ctx.fillText(`Reality: ${playerInfo.reality}`, this.canvas.width - 50, 70);
    this.ctx.fillText(`Date: ${new Date().toLocaleString()}`, this.canvas.width - 50, 90);
    this.ctx.textAlign = 'left';
  }

  async drawTrackItem(
    x: number,
    y: number,
    track: TrackItem
  ){
    // 绘制曲绘
    const img = await this.loadImage(`./musicImg/${track.title}.jpg`);
    this.ctx.drawImage(img, x, y, 100, 74);

    // 绘制文字信息
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '14px ChillRoundF';

    let textY = y + 10;
    this.ctx.fillText(`#${track.rank} ${track.title}`, x + 110, textY);

    textY += 18;
    this.ctx.fillText(`难度：${track.difficulty}`, x + 110, textY);

    textY += 14;
    this.ctx.fillText(`评级：${track.grade}`, x + 110, textY);

    textY += 14;
    this.ctx.fillText(`分数：${track.score}`, x + 110, textY);

    textY += 14;
    this.ctx.fillText(`准度：${track.accuracy}`, x + 110, textY);
  }

  async drawTrackList(tracks: TrackItem[]){
    const xStart = 50;
    const columnGap = 350;
    let yOffset = 130;

    for(let index = 0;index < tracks.length;index++){
      const track = tracks[index];

      const x = index % 2 === 0 ? xStart : xStart + columnGap;

      if (index % 2 === 0 && index !== 0) {
        yOffset += 100;
      }

      await this.drawTrackItem(x, yOffset, track);
    }
  }

  drawFooter(){
    const x = 600, y = 1190;

    this.ctx.fillText('Designed by adproqwq', x, y);
  }

  async render(tracks: TrackItem[], playerInfo: {
    player: string;
    reality: string;
  }): Promise<HTMLCanvasElement>{
    await this.drawBackground();
    this.drawHeader(playerInfo);
    await this.drawTrackList(tracks);
    this.drawFooter();

    return this.canvas;
  }
}