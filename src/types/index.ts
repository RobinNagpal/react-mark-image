import {
  ReactElement,
  MouseEvent,
  MouseEventHandler,
  TouchEvent,
  CSSProperties,
} from 'react';

export interface IPoint {
  x: number;
  y: number;
}

export interface IContainer {
  height: number;
  width: number;
}

export interface IGeometry {
  type: string;
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SelectorMethodsOptions {
  editorMode: EditorMode;
  idFunction: () => string;
}
export interface ISelectorMethods {
  onMouseDown?: (
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;

  onMouseUp?: (
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;

  onMouseMove?: (
    annotation: IAnnotation | undefined,
    e: MouseEvent,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;

  onTouchStart?: (
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;

  onTouchEnd?: (
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;

  onTouchMove?: (
    annotation: IAnnotation | undefined,
    e: TouchEvent,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;

  onClick?: (
    annotation: IAnnotation | undefined,
    e: any,
    options: SelectorMethodsOptions
  ) => IAnnotation | undefined;
}

export interface ISelector {
  TYPE: string;
  intersects: (
    { x, y }: { x: number; y: number },
    geometry: IGeometry,
    container: { width: number; height: number }
  ) => boolean;
  area: (
    geometry: IGeometry,
    container: { width: number; height: number }
  ) => number;
  methods: ISelectorMethods;
}

interface AnnotationData extends Record<string, any> {
  text?: string;
  id: string;
}

export interface IAnnotation {
  selection?: {
    mode: string;
    anchorX?: number | null;
    anchorY?: number | null;
  };
  geometry: IGeometry;
  data: AnnotationData;
}

export interface RenderEditorProps {
  annotation: IAnnotation;
  onSubmit: (e: IAnnotation) => void;
}

export interface ShapeProps {
  annotation: IAnnotation;
  isMouseOver: boolean;
  isSelected: boolean;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export interface RenderShapeProps {
  annotation: IAnnotation;
  editMode: EditorMode;
  key: string;
  isInSelectionMode: boolean;
  renderContent?: (props: ContentProps) => ReactElement | null;
  selectedAnnotation?: IAnnotation;
  selectAnnotation: (annotation?: IAnnotation) => void;
}

export interface ContentProps {
  key?: string;
  annotation: IAnnotation;
}

export interface RenderSelectorProps {
  isInSelectionMode: boolean;
  annotation: IAnnotation;
  renderContent?: (props: ContentProps) => ReactElement | null;
}

export enum EditorMode {
  Annotate = 'Annotate',
  HighlightOnly = 'HighlightOnly',
}

export enum SelectionMode {
  New = 'NEW',
  Selecting = 'SELECTING',
  Editing = 'EDITING',
  Final = 'FINAL',
}

export type WrappedShapeProps = {
  annotation: IAnnotation;
  editMode: EditorMode;
  isInSelectionMode: boolean;
  key: string;
  selectedAnnotation?: IAnnotation;
  selectAnnotation: (annotation?: IAnnotation) => void;
  renderContent?: (props: ContentProps) => ReactElement | null;
  style?: CSSProperties;
};

export interface RenderOverlayProps {
  annotations: IAnnotation[];
  selectorType: string;
}

export interface RenderToolbarProps {
  deleteAnnotation: (annotation: IAnnotation) => void;
  options: ToolBarOptions;
  selectedAnnotation: IAnnotation | undefined;
  unSelectAnnotation: () => void;
  selectedSelectorType: string;
  setSelectedSelectorType: (selector: string) => void;
}

interface ToolBarOptions {
  showToolBar?: boolean;
  showDeleteOption?: boolean;
  renderToolbarIcons?: () => ReactElement | null;
  renderSelectedAnnotationIcons?: (
    annotation: IAnnotation
  ) => ReactElement | null;
}

export interface AnnotationProps {
  alt?: string;
  allowTouch?: boolean;
  annotations: IAnnotation[];

  children?: any;
  className?: string;

  disableAnnotation?: boolean;
  disableEditor?: boolean;
  disableOverlay?: boolean;
  disableSelector?: boolean;

  editorMode: EditorMode;

  idFunction: () => string;

  innerRef: (el: HTMLImageElement) => object;

  renderContent: (props: ContentProps) => ReactElement | null;
  renderEditor: (props: RenderEditorProps) => ReactElement | null;
  renderShape: (props: WrappedShapeProps) => ReactElement | null;
  renderOverlay: (props: RenderOverlayProps) => ReactElement | null;

  selectors: ISelector[];

  shapes: string[];
  onAnnotationsUpdate: (annotations: IAnnotation[]) => void;
  onAnnotationSelect: (annotation?: IAnnotation) => void;
  src: string;
  style?: object;

  toolBarOptions: ToolBarOptions;
}

export interface Theme {
  annotation: {
    backgroundColor: string;
    active: {
      border: string;
      boxShadow: string;
      backgroundColor: string;
    };
  };
}

export interface OptionBar {
  categories: string[];
}
export interface OptionBarButton {
  category: string;
  renderButton: (props: AnnotationProps) => ReactElement;
}
