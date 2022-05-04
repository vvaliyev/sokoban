import { Sokoban } from "./Sokoban";
import { mapsByLevel, renderConfig, keyboardConfig } from "./config";
import { SokobanCanvasRenderer } from "./SokobanCanvasRenderer";

const canvas = document.querySelector("canvas");

const sokoban = new Sokoban(mapsByLevel[1]);
const sokobanCanvasRenderer = new SokobanCanvasRenderer(
  sokoban,
  canvas,
  renderConfig
);

document.addEventListener("keydown", (e) => {
  const dir = keyboardConfig[e.key];
  if (dir) {
    sokoban.movePlayer(dir);
    sokobanCanvasRenderer.render();
  }
});

sokobanCanvasRenderer.render();
