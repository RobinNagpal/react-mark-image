import React, { ReactElement } from 'react';

import { OvalSelector, PointSelector, RectangleSelector } from '../selectors';
import {
  AnnotationProps,
  ContentProps,
  EditorMode,
  RenderEditorProps,
  RenderHighlightProps,
  RenderSelectorProps,
} from '../types/index';
import Content from './Content';
import Editor from './Editor';
import FancyRectangle from './FancyRectangle';
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

  editorMode: EditorMode.Annotate,

  innerRef: (_el: HTMLImageElement) => ({}),

  onChange: () => {},
  onSubmit: () => {},

  renderSelector: ({ annotation, renderContent }: RenderSelectorProps) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return <FancyRectangle annotation={annotation} />;
      case PointSelector.TYPE:
        return <Point annotation={annotation} renderContent={renderContent} />;
      case OvalSelector.TYPE:
        return <Oval annotation={annotation} renderContent={renderContent} />;
      default:
        return null;
    }
  },
  renderEditor: ({ annotation, onChange, onSubmit }: RenderEditorProps) => (
    <Editor annotation={annotation} onChange={onChange} onSubmit={onSubmit} />
  ),
  renderHighlight: ({
    key,
    annotation,
    renderContent,
  }: RenderHighlightProps): ReactElement | null => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return (
          <Rectangle
            key={key}
            annotation={annotation}
            renderContent={renderContent}
          />
        );
      case PointSelector.TYPE:
        return (
          <Point
            key={key}
            annotation={annotation}
            renderContent={renderContent}
          />
        );
      case OvalSelector.TYPE:
        return (
          <Oval
            key={key}
            annotation={annotation}
            renderContent={renderContent}
          />
        );
      default:
        return null;
    }
  },
  renderContent: ({ key, annotation }: ContentProps) => (
    <Content key={key} annotation={annotation} />
  ),
  renderOverlay: ({ annotations, type }: AnnotationProps): ReactElement => {
    if (annotations.length === 0) {
      switch (type) {
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
  src: '',

  type: RectangleSelector.TYPE,
};
export default defaultProps;
