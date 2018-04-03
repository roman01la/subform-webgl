import React, { Component } from "react";
import Text from "./ui/Text";

export const H1 = ({ children }) => (
  <Text style={{ fontSize: 32 }}>{children}</Text>
);
export const H2 = ({ children }) => (
  <Text style={{ fontSize: 24 }}>{children}</Text>
);
export const H3 = ({ children }) => (
  <Text style={{ fontSize: 16 }}>{children}</Text>
);
