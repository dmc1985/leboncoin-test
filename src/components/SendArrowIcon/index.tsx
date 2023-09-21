import React, { ReactElement } from "react";

export interface Props {
  color: string;
}

const SendArrowIcon = ({ color }: Props): ReactElement => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="20.000000pt"
    height="22.000000pt"
    viewBox="0 0 20.000000 22.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,22.000000) scale(0.100000,-0.100000)"
      fill={color}
      stroke="none"
    >
      <path
        d="M20 162 c17 -54 17 -58 -1 -110 l-18 -53 57 32 c31 18 74 42 94 53
44 24 46 29 16 44 -13 6 -55 29 -94 50 l-71 40 17 -56z"
      />
    </g>
  </svg>
);

export default SendArrowIcon;
