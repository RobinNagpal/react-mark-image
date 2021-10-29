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

  const {
    allowTouch,
    alt,
    className,
    idFunction,

    RenderShape,
    renderEditor,
    renderOverlay,

    style,
    src,
  } = props;

  const [selectedSelectorType, setSelectedSelectorType] = useState<string>(
    props.shapes[0]
  );

  // This annotation is set when adding a new annotation. The state is cleared after annotation is added
  const [selectedAnnotation, setSelectedAnnotation] = useState<
    IAnnotation | undefined
  >();

  // This annotation is set when adding a new annotation. The state is cleared after annotation is added
  const [tmpAnnotation, setTmpAnnotation] = useState<IAnnotation | undefined>();

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
    setTmpAnnotation(undefined);
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
          tmpAnnotation,
          e,
          { editorMode, idFunction }
        );

        setTmpAnnotation(value);
        switch (value?.selection?.mode) {
          case SelectionMode.Final:
            onAnnotationFinal(value);
            setShowEditor(true);
            break;
          case SelectionMode.Editing:
            setShowEditor(true);
            break;
          default:
            setTmpAnnotation(value);
            setShowEditor(true);
            break;
        }
      }
    }
  };

  const deleteAnnotation = (annotationToDelete: IAnnotation) => {
    const filtered = annotations.filter(
      (annotation) => annotation.data.id !== annotationToDelete.data.id
    );
    const newAnnotationsValue = [...filtered];
    setAnnotations(newAnnotationsValue);
    setSelectedAnnotation(undefined);
    props.onAnnotationsUpdate(newAnnotationsValue);
  };

  const selectAnnotation = (annotationToSelect: IAnnotation) => {
    const mapped = annotations.map((annotation) => ({
      ...annotation,
      isSelected: annotation.data.id === annotationToSelect.data.id,
    }));
    const newAnnotationsValue = [...mapped];
    setAnnotations(newAnnotationsValue);
    setSelectedAnnotation(annotationToSelect);
    props.onAnnotationsUpdate(newAnnotationsValue);
  };

  return (
    <>
      <ToolBar
        selectedAnnotation={selectedAnnotation}
        selectedSelectorType={selectedSelectorType}
        setSelectedSelectorType={setSelectedSelectorType}
        deleteAnnotation={deleteAnnotation}
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
          {annotations.map((annotation) => (
            <RenderShape
              key={annotation.data.id}
              editMode={props.editorMode}
              annotation={annotation}
              renderContent={props.renderContent}
              isInSelectionMode={!!tmpAnnotation}
              onClick={selectAnnotation}
            />
          ))}
          {!props.disableSelector && tmpAnnotation?.geometry && (
            <RenderShape
              key={tmpAnnotation.data.id}
              editMode={props.editorMode}
              annotation={tmpAnnotation}
              renderContent={props.renderContent}
              isInSelectionMode={!!tmpAnnotation}
            />
          )}
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
          tmpAnnotation &&
          tmpAnnotation.selection?.mode === SelectionMode.Editing &&
          renderEditor({
            annotation: tmpAnnotation,
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
