import React, {
  ComponentType,
  MouseEvent,
  TouchEvent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  AnnotationProps,
  IAnnotation,
  ISelector,
  SelectionMode,
} from '../types/index';
import compose from '../utils/compose';
import withRelativeMousePos, {
  WithRelativeMousePosProps,
} from '../utils/withRelativeMousePos';

import defaultProps from './defaultProps';
import ImageElement from './Image';
import Overlay from './Overlay';
import ToolBar from './ToolBar/ToolBar';

const Container = styled.div<{ allowTouch?: boolean }>`
  clear: both;
  position: relative;
  width: 100%;

  &:hover ${Overlay} {
    opacity: 1;
  }

  touch-action: ${({ allowTouch }) => (allowTouch ? 'pinch-zoom' : 'auto')};
`;

const ItemsDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export type AnnotationPropsOptional = {
  [K in keyof AnnotationProps]?: AnnotationProps[K]; // so that it retains the types
};

function Annotation(options: AnnotationProps & WithRelativeMousePosProps) {
  const props: AnnotationProps = {
    ...defaultProps,
    ...options,
  };

  const [selectedSelectorType, setSelectedSelectorType] = useState<string>(
    props.shapes[0]
  );

  const [activeAnnotation, setActiveAnnotation] = useState<
    IAnnotation | undefined
  >();

  const [annotations, setAnnotations] = useState<IAnnotation[]>(
    options.annotations
  );

  const [showEditor, setShowEditor] = useState<boolean>(false);

  const targetRef = React.createRef<any>();

  const addTargetTouchEventListeners = () => {
    // Safari does not recognize touch-action CSS property,
    // so we need to call preventDefault ourselves to stop touch from scrolling
    // Event handlers must be set via ref to enable e.preventDefault()
    // https://github.com/facebook/react/issues/9809

    targetRef.current.ontouchstart = onTouchStart;
    targetRef.current.ontouchend = onTouchEnd;
    targetRef.current.ontouchmove = onTargetTouchMove;
    targetRef.current.ontouchcancel = onTargetTouchLeave;
  };
  const removeTargetTouchEventListeners = () => {
    targetRef.current.ontouchstart = undefined;
    targetRef.current.ontouchend = undefined;
    targetRef.current.ontouchmove = undefined;
    targetRef.current.ontouchcancel = undefined;
  };

  useEffect(() => {
    if (props.allowTouch) {
      addTargetTouchEventListeners();
    } else {
      removeTargetTouchEventListeners();
    }
  }, [options.allowTouch]);

  const setInnerRef = (el: HTMLImageElement | null) => {
    if (el) {
      options.relativeMousePos.innerRef(el);
      props.innerRef(el);
    }
  };

  const getSelectorByType = (type: string): ISelector => {
    return props.selectors.find((s) => s.TYPE === type)!;
  };

  const onTargetMouseMove = (e: MouseEvent) => {
    options.relativeMousePos.onMouseMove(e);
    onMouseMove(e);
  };
  const onTargetTouchMove = (e: TouchEvent) => {
    options.relativeMousePos.onTouchMove(e);
    onTouchMove(e);
  };

  const onTargetMouseLeave = (e: MouseEvent) => {
    options.relativeMousePos.onMouseLeave(e);
  };
  const onTargetTouchLeave = (e: TouchEvent) => {
    options.relativeMousePos.onTouchLeave(e);
  };

  const onMouseUp = (e: MouseEvent) => callSelectorMethod('onMouseUp', e);
  const onMouseDown = (e: MouseEvent) => callSelectorMethod('onMouseDown', e);
  const onMouseMove = (e: MouseEvent) => callSelectorMethod('onMouseMove', e);
  const onTouchStart = (e: TouchEvent) => callSelectorMethod('onTouchStart', e);
  const onTouchEnd = (e: TouchEvent) => callSelectorMethod('onTouchEnd', e);
  const onTouchMove = (e: TouchEvent) => callSelectorMethod('onTouchMove', e);
  const onClick = (e: MouseEvent) => callSelectorMethod('onClick', e);

  const onAnnotationFinal = (annotation: IAnnotation) => {
    const newAnnotationArray = [...annotations, annotation];
    setAnnotations(newAnnotationArray);
    options.onAnnotationsUpdate(newAnnotationArray);
    setActiveAnnotation(undefined);
  };

  const callSelectorMethod = (
    methodName:
      | 'onMouseUp'
      | 'onMouseDown'
      | 'onMouseMove'
      | 'onTouchStart'
      | 'onTouchEnd'
      | 'onTouchMove'
      | 'onClick',
    e: MouseEvent | TouchEvent
  ) => {
    const { disableAnnotation, editorMode } = props;
    if (disableAnnotation) {
      return;
    }

    if (!!options[methodName]) {
      (options[methodName] as any)(e);
    } else {
      const selector = getSelectorByType(selectedSelectorType);
      const selectorMethod = selector.methods[methodName];
      if (selectorMethod) {
        const value: IAnnotation | undefined = selectorMethod(
          activeAnnotation,
          e,
          editorMode
        );

        setActiveAnnotation(value);

        if (value?.selection?.mode === SelectionMode.Editing) {
          setShowEditor(true);
        } else if (value?.selection?.mode === SelectionMode.Final) {
          onAnnotationFinal(value);
        }
      }
    }
  };

  const {
    renderHighlight,
    renderSelector,
    renderEditor,
    renderOverlay,
    allowTouch,
    className,
    style,
    alt,
    src,
  } = props;

  console.log(activeAnnotation);
  return (
    <>
      <ToolBar
        selectedSelectorType={selectedSelectorType}
        setSelectedSelectorType={setSelectedSelectorType}
      />
      <Container
        style={props.style}
        onMouseLeave={onTargetMouseLeave}
        onTouchCancel={onTargetTouchLeave}
        allowTouch={allowTouch}
      >
        <ImageElement
          className={className}
          style={style}
          alt={alt}
          src={src}
          draggable={false}
          setInnerRef={setInnerRef}
        />
        <ItemsDiv>
          {props.annotations.map((annotation) =>
            renderHighlight({
              key: annotation.data.id,
              annotation,
              renderContent: props.renderContent,
            })
          )}
          {!props.disableSelector &&
            activeAnnotation?.geometry &&
            renderSelector({
              annotation: activeAnnotation,
              renderContent: props.renderContent,
            })}
        </ItemsDiv>
        <ItemsDiv
          onClick={onClick}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onMouseMove={onTargetMouseMove}
          ref={targetRef}
        />
        {!props.disableOverlay &&
          renderOverlay({
            annotations: props.annotations,
            selectorType: selectedSelectorType,
          })}
        {showEditor &&
          activeAnnotation &&
          renderEditor({
            annotation: activeAnnotation,
            onSubmit: onAnnotationFinal,
          })}
        <div>{props.children}</div>
      </Container>
    </>
  );
}

const WrappedAnnotation: ComponentType<AnnotationPropsOptional> = compose(
  withRelativeMousePos()
)(Annotation);

export default WrappedAnnotation;
