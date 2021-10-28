import React, { Component, ComponentType, MouseEvent, TouchEvent } from 'react';
import ToolBar from './ToolBar/ToolBar';
import styled from 'styled-components';
import compose from '../utils/compose';
import withRelativeMousePos, {
  WithRelativeMousePosProps,
} from '../utils/withRelativeMousePos';

import defaultProps from './defaultProps';
import Overlay from './Overlay';
import {
  AnnotationProps,
  EditorMode,
  IAnnotation,
  ISelector,
} from '../types/index';
import ImageElement from './Image';

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
)(
  class Annotation extends Component<
    AnnotationProps & WithRelativeMousePosProps
  > {
    container: HTMLImageElement | undefined;

    public static defaultProps = defaultProps;

    targetRef = React.createRef<any>();

    componentDidMount() {
      if (this.props.allowTouch) {
        this.addTargetTouchEventListeners();
      }
    }

    addTargetTouchEventListeners = () => {
      // Safari does not recognize touch-action CSS property,
      // so we need to call preventDefault ourselves to stop touch from scrolling
      // Event handlers must be set via ref to enable e.preventDefault()
      // https://github.com/facebook/react/issues/9809

      this.targetRef.current.ontouchstart = this.onTouchStart;
      this.targetRef.current.ontouchend = this.onTouchEnd;
      this.targetRef.current.ontouchmove = this.onTargetTouchMove;
      this.targetRef.current.ontouchcancel = this.onTargetTouchLeave;
    };
    removeTargetTouchEventListeners = () => {
      this.targetRef.current.ontouchstart = undefined;
      this.targetRef.current.ontouchend = undefined;
      this.targetRef.current.ontouchmove = undefined;
      this.targetRef.current.ontouchcancel = undefined;
    };

    componentDidUpdate(prevProps: Readonly<AnnotationProps>) {
      if (this.props.allowTouch !== prevProps.allowTouch) {
        if (this.props.allowTouch) {
          this.addTargetTouchEventListeners();
        } else {
          this.removeTargetTouchEventListeners();
        }
      }
    }

    setInnerRef = (el: HTMLImageElement | null) => {
      if (el) {
        this.container = el;
        this.props.relativeMousePos.innerRef(el);
        this.props.innerRef(el);
      }
    };

    getSelectorByType = (type: string): ISelector => {
      return this.props.selectors.find((s) => s.TYPE === type)!;
    };

    getTopAnnotationAt = (
      x: number = 0,
      y: number = 0
    ): IAnnotation | undefined => {
      const { annotations } = this.props;
      const { container, getSelectorByType } = this;

      if (!container) return;

      const intersections: IAnnotation[] = (annotations
        .map((annotation) => {
          const { geometry } = annotation;
          const selector = getSelectorByType(geometry.type);

          return selector.intersects({ x, y }, geometry, container)
            ? annotation
            : false;
        })
        .filter((a) => !!a) as IAnnotation[]).sort(
        (a: IAnnotation, b: IAnnotation) => {
          const aSelector = getSelectorByType(a.geometry.type);
          const bSelector = getSelectorByType(b.geometry.type);

          return (
            aSelector?.area(a.geometry, container) -
            bSelector?.area(b.geometry, container)
          );
        }
      );

      return intersections[0];
    };

    onTargetMouseMove = (e: MouseEvent) => {
      this.props.relativeMousePos.onMouseMove(e);
      this.onMouseMove(e);
    };
    onTargetTouchMove = (e: TouchEvent) => {
      this.props.relativeMousePos.onTouchMove(e);
      this.onTouchMove(e);
    };

    onTargetMouseLeave = (e: MouseEvent) => {
      this.props.relativeMousePos.onMouseLeave(e);
    };
    onTargetTouchLeave = (e: TouchEvent) => {
      this.props.relativeMousePos.onTouchLeave(e);
    };

    onMouseUp = (e: MouseEvent) => this.callSelectorMethod('onMouseUp', e);
    onMouseDown = (e: MouseEvent) => this.callSelectorMethod('onMouseDown', e);
    onMouseMove = (e: MouseEvent) => this.callSelectorMethod('onMouseMove', e);
    onTouchStart = (e: TouchEvent) =>
      this.callSelectorMethod('onTouchStart', e);

    onTouchEnd = (e: TouchEvent) => this.callSelectorMethod('onTouchEnd', e);
    onTouchMove = (e: TouchEvent) => this.callSelectorMethod('onTouchMove', e);
    onClick = (e: MouseEvent) => this.callSelectorMethod('onClick', e);

    onSubmit = () => {
      this.props.onSubmit(this.props.value!);
    };

    callSelectorMethod = (
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
      const {
        disableAnnotation,
        editorMode,
        onChange,
        onSubmit,
        type,
      } = this.props;
      if (disableAnnotation) {
        return;
      }

      if (!!this.props[methodName]) {
        (this.props[methodName] as any)(e);
      } else {
        const selector = this.getSelectorByType(type);
        if (selector && (selector.methods[methodName] as any)) {
          const value = (selector.methods[methodName] as any)(
            this.props.value,
            e
          );

          if (typeof value === 'undefined') {
            if (process.env.NODE_ENV !== 'production') {
              console.error(`
              ${methodName} of selector type ${type} returned undefined.
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

    render() {
      const { props } = this;
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
          <ToolBar {...this.props} />
          <Container
            style={props.style}
            onMouseLeave={this.onTargetMouseLeave}
            onTouchCancel={this.onTargetTouchLeave}
            allowTouch={allowTouch}
          >
            <ImageElement
              className={className}
              style={style}
              alt={alt}
              src={src}
              draggable={false}
              setInnerRef={this.setInnerRef}
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
              onClick={this.onClick}
              onMouseUp={this.onMouseUp}
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onTargetMouseMove}
              ref={this.targetRef}
            />
            {!props.disableOverlay && renderOverlay(props)}
            {!props.disableEditor &&
              props.value &&
              props.value.selection &&
              props.value.selection.showEditor &&
              renderEditor({
                annotation: props.value,
                onChange: props.onChange,
                onSubmit: this.onSubmit,
              })}
            <div>{props.children}</div>
          </Container>
        </>
      );
    }
  }
);

export default Annotation;
