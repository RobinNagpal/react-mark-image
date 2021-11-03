import React, { ReactElement } from 'react';
import RectangleSelector from './../../hocs/RectangleSelector';
import PointSelector from './../../hocs/PointSelector';
import OvalSelector from './../../hocs/OvalSelector';
import styled from 'styled-components';
import { RenderToolbarProps } from '../../types/index';
import BackSvg from './icons/arrowLeft.svg';
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
  background-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? '#ccc' : '#efefef'};
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
const BackIcon = styled(StyledIcon)`
  background-image: url(${BackSvg});
`;
const TrashIcon = styled(StyledIcon)`
  background-image: url(${TrashSvg});
`;

// https://www.w3schools.com/howto/howto_css_icon_bar.asp#
export default function ToolBar({
  deleteAnnotation,
  options,
  selectedAnnotation,
  selectedSelectorType,
  setSelectedSelectorType,
  unSelectAnnotation,
}: RenderToolbarProps): ReactElement {
  return (
    <OptionsBarDiv>
      {selectedAnnotation ? (
        <>
          <BackIcon isSelected={false} onClick={() => unSelectAnnotation()} />
          {options.renderSelectedAnnotationIcons?.({
            annotation: selectedAnnotation,
            unSelectAnnotation: unSelectAnnotation,
          })}
          <TrashIcon
            isSelected={false}
            onClick={() => deleteAnnotation(selectedAnnotation)}
          />
        </>
      ) : (
        <>
          <SquareIcon
            isSelected={selectedSelectorType === RectangleSelector.TYPE}
            onClick={() => setSelectedSelectorType(RectangleSelector.TYPE)}
          />
          <CircleIcon
            isSelected={selectedSelectorType === OvalSelector.TYPE}
            onClick={() => setSelectedSelectorType(OvalSelector.TYPE)}
          />
          <PointIcon
            isSelected={selectedSelectorType === PointSelector.TYPE}
            onClick={() => setSelectedSelectorType(PointSelector.TYPE)}
          />
        </>
      )}
    </OptionsBarDiv>
  );
}
