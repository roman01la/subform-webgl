import { CustomPIXIComponent } from "react-pixi-fiber";
import { Graphics } from "pixi.js";
import { applyPropsToInstance } from "../../lib/subform";
import { im } from "../../lib/InteractionManager";

const PIXITouchable = CustomPIXIComponent(
  {
    customDisplayObject: props => new Graphics(),
    customApplyProps: function(instance, oldProps, newProps) {
      const { fill, alpha, onFocusIn, onFocusOut, onPress } = newProps;

      instance.interactive = true;

      instance.on("mousedown", event => {
        if (im.isViewInFocus(instance) === false) {
          im.setViewInFocus(instance);
          if (typeof onFocusIn === "function") {
            onFocusIn(event);
          }
          instance.onFocusOut = onFocusOut;
        }
      });

      instance.on("click", event => {
        if (typeof onPress === "function") {
          onPress(event);
        }
      });

      instance.updateLayout = (x, y, width, height) => {
        instance.clear();

        instance.beginFill(fill, alpha);
        instance.drawRect(0, 0, width, height);
        instance.endFill();

        instance.x = x;
        instance.y = y;
      };

      applyPropsToInstance(instance, newProps);
    }
  },
  "PIXITouchable"
);

export default PIXITouchable;
