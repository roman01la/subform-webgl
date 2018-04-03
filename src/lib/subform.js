import { Container, Graphics } from "pixi.js";

const treeToArray = tree => {
  const nodes = [];

  const processTreeNode = node => {
    const childrenIds = [];
    const cnodes = node.children || [];
    const ln = cnodes.length;

    for (let idx = 0; idx < ln; idx++) {
      const node = cnodes[idx];
      if (node.hasOwnProperty("subform/layout")) {
        const id = processTreeNode(node);
        if (typeof id === "number") {
          childrenIds.push(id);
        }
      }
    }

    if (node.hasOwnProperty("subform/layout")) {
      node["subform/layout"].childrenIds = childrenIds;
      nodes.push(node);
      return nodes.length - 1;
    }
  };

  processTreeNode(tree);

  return nodes;
};

export const init = callback => {
  subform_init_layout(layoutFn => {
    callback(layoutFn);
  });
};

const render = function _render(pnodes, snodes, id, px, py) {
  const pnode = pnodes[id];
  const snode = snodes[id];
  const gl = snode.groundLayout;

  const x = px + gl.horizontal.before;
  const y = py + gl.vertical.before;
  const width = gl.horizontal.size;
  const height = gl.vertical.size;

  const ln = snode.childrenIds.length;

  for (let idx = 0; idx < ln; idx++) {
    const cid = snode.childrenIds[idx];
    _render(pnodes, snodes, cid, px, py);
  }

  pnode.updateLayout(x, y, width, height);
};

export const layout = (layoutFn, stage) => {
  const pixiNodes = treeToArray(stage);
  const layoutNodes = pixiNodes.map(node => node["subform/layout"]);
  const solvedNodes = layoutFn(layoutNodes);

  // console.log(solvedNodes);

  render(pixiNodes, solvedNodes, pixiNodes.length - 1, 0, 0);
};

export const applyPropsToInstance = (instance, props) => {
  const {
    mode,
    childrenLayout,
    width,
    height,
    row,
    col,
    rowSpan,
    colSpan
  } = props;

  const config = {};

  const layout = {};

  if (typeof mode === "string") {
    layout.mode = mode;
  }
  if (typeof width === "number" || width === "hug") {
    layout.horizontal = { size: width };
  }
  if (typeof height === "number" || height === "hug") {
    layout.vertical = { size: height };
  }
  if (typeof row === "number") {
    layout.rowIdx = row;
  }
  if (typeof col === "number") {
    layout.colIdx = col;
  }
  if (typeof rowSpan === "number") {
    layout.rowSpan = rowSpan;
  }
  if (typeof colSpan === "number") {
    layout.colSpan = colSpan;
  }

  if (childrenLayout !== undefined) {
    config.childrenLayout = childrenLayout;
  }

  config.layout = props.layout || layout;

  instance["subform/layout"] = config;
};
