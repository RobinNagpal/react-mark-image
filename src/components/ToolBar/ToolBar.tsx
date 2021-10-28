import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { RenderToolbarProps } from './../../types';
import CircleSvg from './icons/circle.svg';
import PointSvg from './icons/point.svg';
import SquareSvg from './icons/square.svg';
import TrashSvg from './icons/trash.svg';

const OptionsBarDiv = styled.div`
  border: 1px solid #ccc;
  background-color: #efefef;
  width: 100%;
  display: flex;
`;

const StyledIcon = styled.a`
  border-right: 1px solid #ccc;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const CircleIcon = styled(StyledIcon)`
  background-image: url(${CircleSvg});
`;
const PointIcon = styled(StyledIcon)`
  background-image: url(${PointSvg});
`;
const SquareIcon = styled(StyledIcon)`
  background-image: url(${SquareSvg});
`;
const TrashIcon = styled(StyledIcon)`
  background-image: url(${TrashSvg});
`;

// https://www.w3schools.com/howto/howto_css_icon_bar.asp#
export default function ToolBar(props: RenderToolbarProps): ReactElement {
  console.log(props);
  return (
    <OptionsBarDiv>
      <CircleIcon />
      <PointIcon />
      <SquareIcon />
      <TrashIcon />
    </OptionsBarDiv>
  );
}
