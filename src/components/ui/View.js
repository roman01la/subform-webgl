import React, { Component } from "react";
import PIXIView from "../pixi/PIXIView";

class View extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <PIXIView
        {...props}
        ref={inst => {
          this.inst = inst;
        }}
      >
        {typeof children === "function" ? children(this.inst) : children}
      </PIXIView>
    );
  }
}

export default View;
