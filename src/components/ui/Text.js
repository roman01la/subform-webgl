import React, { Component } from "react";
import { Text as PIXIText } from "react-pixi-fiber";
import PIXIView from "../pixi/PIXIView";

class Text extends Component {
  render() {
    const { children, style } = this.props;

    return (
      <PIXIView>
        <PIXIText ref={this.onTextRef} text={children} style={{ ...style }} />
      </PIXIView>
    );
  }
}

export default Text;
