import { ICoordinate, Item } from "./Item";

export type Direction = "up" | "down" | "right" | "left";

export class MovableItem<State = never> extends Item {
  // Generic optional state which can be used to store additional information about the item.
  private _state: State;

  constructor(coordinate: ICoordinate) {
    super(coordinate);
  }

  public getNextCoordinateByDirection(direction: Direction): ICoordinate {
    switch (direction) {
      case "up":
        return { ...this.coordinate, y: this.coordinate.y - 1 };
      case "down":
        return { ...this.coordinate, y: this.coordinate.y + 1 };
      case "left":
        return { ...this.coordinate, x: this.coordinate.x - 1 };
      case "right":
        return { ...this.coordinate, x: this.coordinate.x + 1 };
    }
  }

  public move(dir: Direction): void {
    this.coordinate = this.getNextCoordinateByDirection(dir);
  }

  public get state(): State {
    return this._state;
  }
  public set state(value: State) {
    this._state = value;
  }
}
