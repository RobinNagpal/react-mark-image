import React, {
  ComponentType,
  MouseEvent,
  TouchEvent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { AnnotationProps, EditorMode, ISelector } from '../types/index';
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

const Annotation: ComponentType<AnnotationPropsOptional> = compose(
  withRelativeMousePos()
)(function Annotation(options: AnnotationProps & WithRelativeMousePosProps) {
  const props: AnnotationProps = {
    ...defaultProps,
    ...options,
  };

  const [selectorType, setSelectorType] = useState<string>(props.shapes[0]);
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
  const onSubmit = () => {
    props.onSubmit(props.value!);
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
    const { disableAnnotation, editorMode, onChange, onSubmit } = props;
    if (disableAnnotation) {
      return;
    }

    if (!!options[methodName]) {
      (options[methodName] as any)(e);
    } else {
      const selector = getSelectorByType(selectorType);
      if (selector && (selector.methods[methodName] as any)) {
        const value = (selector.methods[methodName] as any)(props.value, e);

        if (typeof value === 'undefined') {
          if (process.env.NODE_ENV !== 'production') {
            console.error(`
              ${methodName} of selector type ${selectorType} returned undefined.
              Make sure to explicitly return the previous state
            `);
          }
        } else {
          if (
            editorMode === EditorMode.HighlightOnly &&
            value.selection?.showEditor
          ) {
            value.selection.showEditor = false;
            onSubmit(value);
          } else {
            onChange(value);
          }
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

  return (
    <>
      <ToolBar selectorType={selectorType} setSelectorType={setSelectorType} />
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
            props.value &&
            props.value.geometry &&
            renderSelector({
              annotation: props.value,
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
            selectorType: selectorType,
          })}
        {!props.disableEditor &&
          props.value &&
          props.value.selection &&
          props.value.selection.showEditor &&
          renderEditor({
            annotation: props.value,
            onChange: props.onChange,
            onSubmit: onSubmit,
          })}
        <div>{props.children}</div>
      </Container>
    </>
  );
});

export default Annotation;
