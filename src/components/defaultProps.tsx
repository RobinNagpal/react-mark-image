import React, { ReactElement } from 'react';

import Point from './Point';
import Editor from './Editor';
import FancyRectangle from './FancyRectangle';
import Rectangle from './Rectangle';
import Oval from './Oval';
import Content from './Content';
import Overlay from './Overlay';

import { OvalSelector, PointSelector, RectangleSelector } from '../selectors';
import {
  AnnotationProps,
  EditorMode,
  IAnnotation,
  RenderContentProps,
  RenderEditorProps,
  RenderHighlightProps,
  RenderOverlayProps,
  RenderSelectorProps,
} from '../types/index';

const defaultProps: AnnotationProps = {
  activeAnnotationComparator: (a: IAnnotation, b: IAnnotation) => a === b,
  annotations: [],

  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  disableOverlay: false,

  editorMode: EditorMode.Annotate,

  innerRef: (_el: HTMLImageElement) => ({}),

  onChange: () => {},
  onSubmit: () => {},

  renderSelector: ({ annotation }: RenderSelectorProps) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return <FancyRectangle annotation={annotation} />;
      case PointSelector.TYPE:
        return <Point annotation={annotation} />;
      case OvalSelector.TYPE:
        return <Oval annotation={annotation} />;
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
    active,
  }: RenderHighlightProps): ReactElement | null => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return <Rectangle key={key} annotation={annotation} active={active} />;
      case PointSelector.TYPE:
        return <Point key={key} annotation={annotation} active={active} />;
      case OvalSelector.TYPE:
        return <Oval key={key} annotation={annotation} active={active} />;
      default:
        return null;
    }
  },
  renderContent: ({ key, annotation }: RenderContentProps) => (
    <Content key={key} annotation={annotation} />
  ),
  renderOverlay: ({ type }: RenderOverlayProps): ReactElement => {
    switch (type) {
      case PointSelector.TYPE:
        return <Overlay>Click to Annotate</Overlay>;
      default:
        return <Overlay>Click and Drag to Annotate</Overlay>;
    }
  },

  selectors: [RectangleSelector, PointSelector, OvalSelector],
  src: '',

  type: RectangleSelector.TYPE,
};
export default defaultProps;
