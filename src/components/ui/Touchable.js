import React, { Component } from "react";
import PIXITouchable from "../pixi/PIXITouchable";
import PIXIView from "../pixi/PIXIView";

class Touchable extends Component {
  state = {
    isInFocus: false
  };
  focusIn = () => {
    this.setState(
      s => ({ isInFocus: true }),
      () => {
        if (typeof this.props.onFocusIn === "function") {
          this.props.onFocusIn();
        }
      }
    );
  };
  focusOut = () => {
    this.setState(
      s => ({ isInFocus: false }),
      () => {
        if (typeof this.props.onFocusOut === "function") {
          this.props.onFocusOut();
        }
      }
    );
  };
  render() {
    const { isInFocus } = this.state;
    const {
      inFocusStyle,
      idleStyle,
      onPress,
      children,
      onFocusIn,
      onFocusOut,
      ...props
    } = this.props;

    const style = isInFocus ? inFocusStyle : idleStyle;

    return (
      <PIXITouchable
        onFocusIn={this.focusIn}
        onFocusOut={this.focusOut}
        onPress={onPress}
        mode="parent-directed"
        width="hug"
        height="hug"
        {...props}
      >
        {typeof children === "function" ? children(style) : children}
      </PIXITouchable>
    );
  }
}

export default Touchable;
