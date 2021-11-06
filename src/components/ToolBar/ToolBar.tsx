import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AllowedShape, RenderToolbarProps } from '../../types/index';
import BackSvg from './icons/arrowLeft.svg';
import CircleSvg from './icons/circle.svg';
import PointSvg from './icons/point.svg';
import SquareSvg from './icons/square.svg';
import TrashSvg from './icons/trash.svg';

const ToolbarDiv = styled.div`
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

export default function ToolBar({
  allowedShapes,
  deleteAnnotation,
  options,
  selectedAnnotation,
  selectedSelectorType,
  setSelectedSelectorType,
  unSelectSelectedAnnotation,
}: RenderToolbarProps): ReactElement | null {
  return options.showToolBar ? (
    <ToolbarDiv>
      {selectedAnnotation ? (
        <>
          <BackIcon
            isSelected={false}
            onClick={() => unSelectSelectedAnnotation(selectedAnnotation)}
          />
          {options.renderSelectedAnnotationIcons?.({
            annotation: selectedAnnotation,
            unSelectAnnotation: () =>
              unSelectSelectedAnnotation(selectedAnnotation),
          })}
          <TrashIcon
            isSelected={false}
            onClick={() => deleteAnnotation(selectedAnnotation)}
          />
        </>
      ) : (
        <>
          {allowedShapes.includes(AllowedShape.Rectangle) ? (
            <SquareIcon
              isSelected={selectedSelectorType === AllowedShape.Rectangle}
              onClick={() => setSelectedSelectorType(AllowedShape.Rectangle)}
            />
          ) : null}
          {allowedShapes.includes(AllowedShape.Oval) ? (
            <CircleIcon
              isSelected={selectedSelectorType === AllowedShape.Oval}
              onClick={() => setSelectedSelectorType(AllowedShape.Oval)}
            />
          ) : null}
          {allowedShapes.includes(AllowedShape.Point) ? (
            <PointIcon
              isSelected={selectedSelectorType === AllowedShape.Point}
              onClick={() => setSelectedSelectorType(AllowedShape.Point)}
            />
          ) : null}
        </>
      )}
    </ToolbarDiv>
  ) : null;
}
