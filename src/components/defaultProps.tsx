import Editor from './Editor';
import React, { ReactElement } from 'react';

import { OvalSelector, PointSelector, RectangleSelector } from '../selectors';
import {
  AnnotationProps,
  ContentProps,
  EditorMode,
  RenderEditorProps,
  RenderShapeProps,
  RenderOverlayProps,
} from './../types/index';
import Content from './Content';
import Overlay from './Overlay';
import Oval from './Shapes/Oval';
import Point from './Shapes/Point';
import Rectangle from './Shapes/Rectangle';

const defaultProps: AnnotationProps = {
  annotations: [],

  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  disableOverlay: false,

  editorMode: EditorMode.AnnotateWithText,

  idFunction: () => Math.random().toString(),
  innerRef: (_el: HTMLImageElement) => ({}),

  onAnnotationsUpdate: () => {},
  onAnnotationSelect: () => {},

  renderEditor: ({ annotation, onSubmit }: RenderEditorProps) => (
    <Editor annotation={annotation} onSubmit={onSubmit} />
  ),

  renderShape: (props: RenderShapeProps): ReactElement | null => {
    const { annotation } = props;
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return <Rectangle {...props} />;
      case PointSelector.TYPE:
        return <Point {...props} />;
      case OvalSelector.TYPE:
        return <Oval {...props} />;
      default:
        return null;
    }
  },

  renderContent: ({ key, annotation }: ContentProps) => (
    <Content key={key} annotation={annotation} />
  ),

  renderOverlay: ({
    annotations,
    selectorType,
  }: RenderOverlayProps): ReactElement => {
    if (annotations.length === 0) {
      switch (selectorType) {
        case PointSelector.TYPE:
          return <Overlay>Click to Annotate</Overlay>;
        default:
          return <Overlay>Click and Drag to Annotate</Overlay>;
      }
    } else {
      return <Overlay>Click on the element to select</Overlay>;
    }
  },

  selectors: [RectangleSelector, PointSelector, OvalSelector],

  allowedShapes: [
    RectangleSelector.TYPE,
    OvalSelector.TYPE,
    PointSelector.TYPE,
  ],

  src: '',

  toolBarOptions: {
    showDeleteOption: true,
    showToolBar: true,
    renderSelectedAnnotationIcons: () => null,
    renderToolbarIcons: () => null,
  },
};
export default defaultProps;
