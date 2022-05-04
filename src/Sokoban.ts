import { Item, ICoordinate } from "./Item";
import { MovableItem, Direction } from "./MovableItem";

type BoxState = "IN_SLOT" | "DEFAULT";
type SokobanMapCell = "wall" | "player" | "slot" | "box" | null;
export type SokobanMap = Array<SokobanMapCell[]>;

export class Sokoban {
  public player: MovableItem;
  public boxes: MovableItem<BoxState>[] = [];
  public walls: Item[] = [];
  public slots: Item[] = [];

  constructor(public map: SokobanMap) {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === "player") {
          this.player = new MovableItem({ x, y });
        }

        if (cell === "wall") {
          this.walls.push(new Item({ x, y }));
        }

        if (cell === "box") {
          this.boxes.push(new MovableItem<BoxState>({ x, y }, "DEFAULT"));
        }

        if (cell === "slot") {
          this.slots.push(new Item({ x, y }));
        }
      });
    });
  }

  private hasWallIn({ x, y }: ICoordinate): boolean {
    // Since walls are not moveable, we can just lookup to the initial map
    // instead of searching in this.walls in order to improve time complexity
    return this.map[y][x] === "wall";
  }

  private findBoxIn({ x, y }: ICoordinate): MovableItem<BoxState> {
    return this.boxes.find(
      (box) => box.coordinate.x === x && box.coordinate.y === y
    );
  }

  private hasSlotIn({ x, y }: ICoordinate): boolean {
    // Since slots are not moveable, we can just lookup to the initial map
    // instead of searching in this.slots in order to improve time complexity
    return this.map[y][x] === "slot";
  }

  public movePlayer(dir: Direction): void {
    const nextCoordinate = this.player.getNextCoordinateByDirection(dir);
    const hasWall = this.hasWallIn(nextCoordinate);

    // If there is an wall in the next coordinate, player can't move.
    if (hasWall) {
      return;
    }

    const box = this.findBoxIn(nextCoordinate);

    // If there is no box in coordinate, it means that that slot is empty
    // and player can move without wondering anything else.
    if (!box) {
      return this.player.move(dir);
    }

    const hasFollowingBox = this.findBoxIn(
      box.getNextCoordinateByDirection(dir)
    );
    const hasFollowingWall = this.hasWallIn(
      box.getNextCoordinateByDirection(dir)
    );

    // If there is an element (box | wall) after the previous box, player can't move.
    if (hasFollowingBox || hasFollowingWall) {
      return;
    }

    // Move the player to direction.
    this.player.move(dir);
    // Player pushes box in the same direction.
    box.move(dir);

    // If the pushed box is in target slot, mark it as IN_SLOT.
    if (this.hasSlotIn(box.coordinate)) {
      box.state = "IN_SLOT";
    }
  }

  public getMapDimensions() {
    return { width: this.map[0].length, height: this.map.length };
  }

  public isCompleted() {
    return this.boxes.every((box) => box.state === "IN_SLOT");
  }
}
