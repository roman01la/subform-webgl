import React, { Component, Fragment } from "react";
import { Application, ticker } from "pixi.js";
import { render, Stage } from "react-pixi-fiber";
import FPS from "yy-fps";

import * as Subform from "./lib/subform";
import MultiplayerScreen from "./screens/multiplayer";

const ratio = devicePixelRatio;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const view = document.getElementById("canvas");

view.style.transformOrigin = "0 0";
view.style.transform = `scale(${1 / ratio})`;
view.style.position = "absolute";

const app = new Application(WIDTH, HEIGHT, {
  backgroundColor: 0x10bb99,
  resolution: ratio,
  antialias: true,
  view
});

class App extends Component {
  state = {
    width: WIDTH,
    height: HEIGHT
  };
  handleResize = () => {
    this.setState(
      s => ({
        width: window.innerWidth,
        height: window.innerHeight
      }),
      () => {
        this.props.renderer.resize(this.state.width, this.state.height);
      }
    );
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  render() {
    const { width, height } = this.state;

    return <MultiplayerScreen width={width} height={height} />;
  }
}

render(<App renderer={app.renderer} />, app.stage);

const fps = new FPS({ side: "bottom-left" });

ticker.shared.add(() => fps.frame());

Subform.init(layoutFn => {
  ticker.shared.add(() => {
    Subform.layout(layoutFn, app.stage);
  });
});
