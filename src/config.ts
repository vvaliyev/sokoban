import { SokobanMap } from "./Sokoban";

const cellSize = 36;
const playerImage = new Image(cellSize, cellSize);
const wallImage = new Image(cellSize, cellSize);
const boxImage = new Image(cellSize, cellSize);
const inSlotBoxImage = new Image(cellSize, cellSize);
const slotImage = new Image(cellSize, cellSize);

playerImage.src = "images/player.gif";
wallImage.src = "images/wall.gif";
boxImage.src = "images/box.gif";
inSlotBoxImage.src = "images/box-success.gif";
slotImage.src = "images/slot.gif";

export const mapsByLevel: Record<number, SokobanMap> = {
  1: [
    [null, "wall", "wall", "wall", "wall", "wall", null, null, null],
    [null, "wall", null, null, null, "wall", "wall", "wall", "wall"],
    [null, "wall", null, null, null, "wall", null, null, "wall"],
    [null, "wall", "wall", null, null, null, null, "slot", "wall"],
    ["wall", "wall", "wall", null, "wall", "wall", "wall", "slot", "wall"],
    ["wall", null, "box", null, "wall", null, "wall", "slot", "wall"],
    ["wall", null, "box", "box", "wall", null, "wall", "wall", "wall"],
    ["wall", "player", null, null, "wall", null, null, null, null],
    ["wall", "wall", "wall", "wall", "wall", null, null, null, null],
  ],
};

export const renderConfig = {
  wallImage,
  boxImage: {
    DEFAULT: boxImage,
    IN_SLOT: inSlotBoxImage,
  },
  slotImage,
  playerImage,
  cellSize,
};

export const keyboardConfig = {
  w: "up",
  ArrowUp: "up",
  d: "right",
  ArrowRight: "right",
  a: "left",
  ArrowLeft: "left",
  s: "down",
  ArrowDown: "down",
};
