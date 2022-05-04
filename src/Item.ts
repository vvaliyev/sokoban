export interface ICoordinate {
  x: number;
  y: number;
}

export class Item {
  constructor(public coordinate: ICoordinate) {}
}
