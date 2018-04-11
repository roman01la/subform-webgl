import React, { Component, Fragment } from "react";
import { Texture, loader } from "pixi.js";
import { Sprite as PIXISprite } from "react-pixi-fiber";

class Sprite extends Component {
  state = {
    texture: undefined,
    ar: undefined
  };
  componentDidMount() {
    loader.add("bg", this.props.src).load((loader, resources) => {
      const texture = Texture.from(resources.bg.data);
      const ar = texture.width / texture.height;

      this.setState(s => ({ texture, ar }));
    });
  }
  render() {
    const { texture, ar } = this.state;
    const { src, scaleWith, ...props } = this.props;

    const height = ar ? scaleWith / ar : undefined;

    return texture ? (
      <PIXISprite
        texture={texture}
        width={scaleWith}
        height={height}
        {...props}
      />
    ) : null;
  }
}

export default Sprite;
