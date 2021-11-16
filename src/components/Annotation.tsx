import React, {
  ComponentType,
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  AnnotationProps,
  EditorMode,
  IAnnotation,
  ISelector,
  SelectionMode,
} from '../types/index';
import compose from '../utils/compose';
import useHandleEscapeEvent from '../utils/useHandleEscapeEvent';
import withRelativeMousePos, {
  WithRelativeMousePosProps,
} from '../utils/withRelativeMousePos';

import defaultProps from './defaultProps';
import ImageElement from './Image';
import Overlay from './Overlay';
import ToolBar from './ToolBar/ToolBar';

const Container = styled.div`
  clear: both;
  position: relative;
  width: 100%;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const ItemsDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ReadOnlyDiv = styled.div`
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

  const allowTouch = false;
  const {
    allowedShapes,

    alt,
    className,

    editorMode,

    idFunction,

    onSelectedAnnotationUpdate,
    onAnnotationClick: onAnnotationClickProp,

    overlayOptions,

    renderShape,
    renderEditor,
    renderOverlay,

    style,
    src,

    toolBarOptions,
  } = props;

  const [selectedSelectorType, setSelectedSelectorType] = useState<string>(
    props.allowedShapes[0]
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

  useEffect(() => {
    setAnnotations(options.annotations);
  }, [options.annotations]);

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

  const isInEditMode =
    editorMode !== EditorMode.ReadOnly &&
    editorMode !== EditorMode.ReadOnlyWithSelection;

  useEffect(() => {
    if (isInEditMode) {
      if (allowTouch) {
        addTargetTouchEventListeners();
      } else {
        removeTargetTouchEventListeners();
      }
    }
  });

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

  const onClick = (e: MouseEvent) => {
    unselectSelectedAnnotation();

    callSelectorMethod('onClick', e);
  };

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
    const { editorMode } = props;

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

  const unselectSelectedAnnotation = () => {
    if (selectedAnnotation) {
      setSelectedAnnotation(undefined);
      onSelectedAnnotationUpdate(selectedAnnotation, false);
    }
  };

  const onAnnotationClick = useCallback(
    (annotation: IAnnotation) => {
      setSelectedAnnotation(annotation);
      onSelectedAnnotationUpdate(annotation, true);
      onAnnotationClickProp(annotation);
    },
    [onAnnotationClickProp, onSelectedAnnotationUpdate]
  );

  useHandleEscapeEvent(unselectSelectedAnnotation, selectedAnnotation);
  return (
    <div className={className}>
      {isInEditMode && (
        <ToolBar
          allowedShapes={allowedShapes}
          deleteAnnotation={deleteAnnotation}
          options={toolBarOptions}
          selectedAnnotation={selectedAnnotation}
          selectedSelectorType={selectedSelectorType}
          setSelectedSelectorType={setSelectedSelectorType}
          unSelectSelectedAnnotation={unselectSelectedAnnotation}
        />
      )}
      <Container
        style={{
          ...props.style,
          touchAction: allowTouch ? 'pinch-zoom' : 'auto',
        }}
        onMouseLeave={onTargetMouseLeave}
        onTouchCancel={onTargetTouchLeave}
      >
        <ImageElement style={style} alt={alt} src={src} draggable={false} />
        <ItemsDiv>
          {annotations.map((annotation) =>
            renderShape({
              annotation: annotation,
              editorMode: props.editorMode,
              isInSelectionMode: !!tmpAnnotation,
              key: annotation.data.id,
              renderContent: props.renderContent,
              onAnnotationClick: onAnnotationClick,
              selectedAnnotation: selectedAnnotation,
            })
          )}
          {tmpAnnotation?.geometry &&
            renderShape({
              annotation: tmpAnnotation,
              editorMode: props.editorMode,
              isInSelectionMode: !!tmpAnnotation,
              key: tmpAnnotation.data.id,
              renderContent: props.renderContent,
              onAnnotationClick: onAnnotationClick,
            })}
        </ItemsDiv>
        {isInEditMode ? (
          <ItemsDiv
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseMove={onTargetMouseMove}
            ref={targetRef}
          />
        ) : (
          <ReadOnlyDiv onClick={unselectSelectedAnnotation} />
        )}
        {isInEditMode &&
          overlayOptions?.displayOverlay &&
          renderOverlay({
            annotations,
            overlayText: overlayOptions?.overlayText,
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
    </div>
  );
}

const WrappedAnnotation: ComponentType<AnnotationPropsOptional> = compose(
  withRelativeMousePos()
)(Annotation);

export default WrappedAnnotation;
