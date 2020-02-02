import React from "react";
import styled, { css } from "styled-components";
import useTheme from "../../commons/src/state/useTheme";
const colors = ["red", "blue", "yellow", "green"];

const selectedCss = css`
  border-color: black;
  &&::before {
    content: "选中";
    display: block;
    position: absolute;
    color: white;
    top: 8px;
    right: 8px;
  }
`;

const ColorItem = styled.div<{ selected: boolean }>`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  margin: 8px;
  border: 1px solid currentColor;
  ${props => props.selected && selectedCss};
`;

export default function ThemeColorChange() {
  const [theme, update] = useTheme();

  return (
    <div>
      {colors.map(color => (
        <ColorItem
          key={color}
          selected={theme.color === color}
          style={{
            background: color
          }}
          onClick={() => update(color)}
        ></ColorItem>
      ))}
    </div>
  );
}
