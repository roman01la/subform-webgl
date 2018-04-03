import React, { Component } from "react";
import { Container } from "react-pixi-fiber";
import Touchable from "./Touchable";
import Text from "./Text";
import PIXIView from "../pixi/PIXIView";

class Button extends Component {
  inFocusStyle = {
    fill: 0xffff00
  };
  idleStyle = {
    fill: 0xffffff
  };
  render() {
    const { inFocusStyle, idleStyle } = this;
    const { onPress, children } = this.props;
    return (
      <Touchable
        inFocusStyle={inFocusStyle}
        idleStyle={idleStyle}
        onPress={onPress}
        childrenLayout={{
          mode: "stack-horizontal",
          mainBeforeFirst: 0,
          mainAfterLast: 0,
          crossBefore: 0,
          crossAfter: 0
        }}
      >
        {style => (
          <PIXIView
            mode="parent-directed"
            width="hug"
            height="hug"
            childrenLayout={{
              mode: "stack-horizontal"
            }}
            {...style}
          >
            <Text style={{ fontSize: 14 }}>{children}</Text>
          </PIXIView>
        )}
      </Touchable>
    );
  }
}

export default Button;
