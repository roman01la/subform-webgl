import React, { Component, Fragment } from "react";

import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import Sprite from "../components/ui/Sprite";
import Filter from "../components/ui/Filter";
import Text from "../components/ui/Text";

import PIXIView from "../components/pixi/PIXIView";

class MultiplayerScreen extends Component {
  render() {
    const { width, height } = this.props;

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
        {/* <Sprite
          src="/img/bg.jpg"
          scaleWith={width}
          pivot={[0, -height]}
          anchor={[0, 1]}
        /> */}

        <PIXIView
          fill={0x000000}
          alpha={0.1}
          row={0}
          colSpan={3}
          childrenLayout={{
            mode: "stack-horizontal",
            crossBefore: 8,
            crossAfter: 8
          }}
        >
          <PIXIView
            fill={0xffffff}
            mode="parent-directed"
            childrenLayout={{
              mode: "stack-horizontal",
              crossBefore: 8,
              crossAfter: 8,
              mainBeforeFirst: 16,
              mainAfterLast: 16
            }}
          >
            <PIXIView>
              <Text style={{ fontSize: 14 }}>Button</Text>
            </PIXIView>
          </PIXIView>
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
        />
      </PIXIView>
    );
  }
}

export default MultiplayerScreen;
