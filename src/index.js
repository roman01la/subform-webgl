import React, { Component, Fragment } from "react";
import { Application, ticker } from "pixi.js";
import { render, Stage } from "react-pixi-fiber";

import * as Subform from "./lib/subform";

import TextInput from "./components/ui/TextInput";
import Button from "./components/ui/Button";
import Sprite from "./components/ui/Sprite";
import Filter from "./components/ui/Filter";
import View from "./components/ui/View";

import { H1, H3 } from "./components/typography";

import PIXIView from "./components/pixi/PIXIView";

import FPS from "yy-fps";

const ratio = devicePixelRatio;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const view = document.getElementById("canvas");

view.style.transformOrigin = "0 0";
view.style.transform = `scale(${1 / ratio})`;
view.style.position = "absolute";

const fps = new FPS({ side: "bottom-left" });

ticker.shared.add(() => fps.frame());

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

    return (
      <PIXIView
        mode="self-directed"
        width={width}
        height={height}
        childrenLayout={{
          mode: "grid",
          rows: {
            beforeFirst: 16,
            between: 8,
            afterLast: 16,
            sizes: [64, "1s", 50]
          },
          cols: {
            beforeFirst: 16,
            afterLast: 16,
            sizes: ["1s", "1s", "1s"]
          }
        }}
      >
        <PIXIView
          fill={0x00ff00}
          row={0}
          colSpan={3}
          childrenLayout={{
            mode: "stack-horizontal",
            mainBetween: 8,
            mainBeforeFirst: "1s",
            mainAfterLast: "1s",
            crossBefore: 16,
            crossAfter: 16
          }}
        >
          <H3>Header</H3>
          <TextInput />
          <Button onPress={() => undefined}>Press me</Button>
        </PIXIView>

        <PIXIView
          row={1}
          colSpan={3}
          childrenLayout={{
            mode: "stack-horizontal",
            mainBetween: 8
          }}
        >
          <PIXIView fill={0xffffff} />
          <PIXIView fill={0xffffff} />
          <PIXIView fill={0xffffff} />
        </PIXIView>

        <PIXIView
          fill={0xffffff}
          row={2}
          colSpan={3}
          childrenLayout={{
            mode: "stack-horizontal"
          }}
        >
          <H3>Footer</H3>
        </PIXIView>
      </PIXIView>
    );
  }
}

render(<App renderer={app.renderer} />, app.stage);

Subform.init(layoutFn => {
  ticker.shared.add(() => {
    Subform.layout(layoutFn, app.stage);
  });
});
