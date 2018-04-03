import React, { Component, Fragment } from "react";
import { Texture } from "pixi.js";
import { Sprite as PIXISprite } from "react-pixi-fiber";

class Sprite extends Component {
  static defaultProps = {
    filters: [],
    scale: 1,
    mask: null
  };
  state = {
    texture: undefined
  };
  componentDidMount() {
    const texture = Texture.fromImage(this.props.src);
    this.setState(s => ({ texture }));
  }
  render() {
    const { texture } = this.state;
    const { filters, scale, mask } = this.props;

    return texture ? (
      <PIXISprite
        texture={texture}
        filters={filters}
        scale={scale}
        mask={mask}
      />
    ) : null;
  }
}

export default Sprite;
