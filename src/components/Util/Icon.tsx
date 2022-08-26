import React from "react";
import icons from "../../data/icons";

interface Props {
  name?: string;
  color?: string;
  width?: string;
  height?: string;
}

const Icon = ({ name, color, width, height }: Props) => {
  const getIcon = () => {
    return icons(name, color, width, height);
  };

  return <div>{}</div>;
};

export default Icon;
