import React, { Component, Fragment } from "react";
import { filters as pixiFilters } from "pixi.js";

const filters = {
  blur: {
    fclass: pixiFilters.BlurFilter,
    props: ["blur", "quality", "resolution", "padding"]
  }
};

class Filter extends Component {
  constructor(props) {
    super(props);

    const FilterClass = filters[props.type].fclass;
    const filterProps = filters[props.type].props;
    const filter = new FilterClass();

    filterProps.forEach(prop => {
      const value = props[prop];
      if (value !== undefined) {
        filter[prop] = props[prop];
      }
    });

    this.state = {
      filter
    };
  }
  render() {
    const { children, type, ...props } = this.props;
    const { filter } = this.state;

    return children(filter);
  }
}

export default Filter;
