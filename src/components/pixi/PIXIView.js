import { CustomPIXIComponent } from "react-pixi-fiber";
import { Graphics } from "pixi.js";
import { applyPropsToInstance } from "../../lib/subform";

const PIXIView = CustomPIXIComponent(
  {
    customDisplayObject: props => new Graphics(),
    customApplyProps: function(instance, oldProps, newProps) {
      const { fill, x, y, width, height, alpha = 1 } = newProps;

      instance.updateLayout = (x, y, width, height) => {
        instance.clear();

        if (fill !== undefined) {
          instance.beginFill(fill, alpha);
          instance.drawRect(0, 0, width, height);
          instance.endFill();
        }

        instance.x = x;
        instance.y = y;
      };

      instance.updateLayout(x, y, width, height);

      applyPropsToInstance(instance, newProps);
    }
  },
  "PIXIView"
);

export default PIXIView;
