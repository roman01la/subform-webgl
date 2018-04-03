import { CustomPIXIComponent } from "react-pixi-fiber";
import Viewport from "pixi-viewport";

const PIXIViewport = CustomPIXIComponent(
  {
    customDisplayObject: ({
      screenWidth,
      screenHeight,
      worldWidth,
      worldHeight
    }) =>
      new Viewport({
        screenWidth,
        screenHeight,
        worldWidth,
        worldHeight
      }),
    customApplyProps: function(instance, oldProps, newProps) {
      const { x, y } = newProps;

      instance.left = -x;
      instance.top = -y;

      instance.wheel();

      if (newProps.follow !== undefined) {
        instance.follow(newProps.follow);
      }
    }
  },
  "PIXIViewport"
);

export default PIXIViewport;
