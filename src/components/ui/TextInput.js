import React, { Component, Fragment } from "react";
import { Container } from "react-pixi-fiber";
import Touchable from "./Touchable";
import Text from "./Text";
import PIXIView from "../pixi/PIXIView";

class TextInput extends Component {
  static defaultProps = {
    x: 0,
    y: 0
  };
  state = {
    value: ""
  };
  inFocusStyle = {
    fill: 0xffff00
  };
  idleStyle = {
    fill: 0xffffff
  };
  handleChange = event => {
    if (event.key === "Backspace") {
      return this.setState(s => ({ value: s.value.slice(0, -1) }));
    }

    if (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 65 && event.keyCode <= 90)
    ) {
      return this.setState(s => ({ value: s.value + event.key }));
    }
  };
  addChangeListener = () => {
    window.addEventListener("keydown", this.handleChange);
  };
  removeChangeListener = () => {
    window.removeEventListener("keydown", this.handleChange);
  };
  render() {
    const { inFocusStyle, idleStyle } = this;
    const { width, height } = this.props;
    const { value } = this.state;

    return (
      <Touchable
        inFocusStyle={inFocusStyle}
        idleStyle={idleStyle}
        onFocusIn={this.addChangeListener}
        onFocusOut={this.removeChangeListener}
        childrenLayout={{
          mode: "stack-horizontal",
          mainBeforeFirst: 0,
          mainAfterLast: 0,
          crossBefore: 0,
          crossAfter: 0
        }}
      >
        {style => {
          return (
            <PIXIView
              mode="parent-directed"
              width="hug"
              height="hug"
              childrenLayout={{
                mode: "stack-horizontal",
                mainBeforeFirst: 4,
                mainAfterLast: 4
              }}
              {...style}
            >
              <Text style={{ fontSize: 14 }}>{this.state.value}</Text>
            </PIXIView>
          );
        }}
      </Touchable>
    );
  }
}

export default TextInput;
