import { Sokoban } from "./Sokoban";
import { renderConfig } from "./config";
import { Item } from "./Item";

export class SokobanCanvasRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(
    private sokaban: Sokoban,
    private canvas: HTMLCanvasElement,
    private config: typeof renderConfig
  ) {
    this.ctx = this.canvas.getContext("2d");

    const { width, height } = this.sokaban.getMapDimensions();
    this.canvas.width = width * config.cellSize;
    this.canvas.height = height * config.cellSize;
  }

  private drawItem(item: Item, image: HTMLImageElement) {
    this.ctx.drawImage(
      image,
      item.coordinate.x * this.config.cellSize,
      item.coordinate.y * this.config.cellSize
    );
  }

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.sokaban.walls.forEach((wall) =>
      this.drawItem(wall, this.config.wallImage)
    );
    this.sokaban.slots.forEach((slot) => {
      this.drawItem(slot, this.config.slotImage);
    });
    this.drawItem(this.sokaban.player, this.config.playerImage);
    this.sokaban.boxes.forEach((box) => {
      this.drawItem(box, this.config.boxImage[box.state]);
    });

    if (this.sokaban.isCompleted()) {
      // handle finish
    }
  }
}
