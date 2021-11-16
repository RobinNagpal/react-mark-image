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
  TYPE: AllowedShape;
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

export interface IGeometry {
  type: string;
  x: number;
  y: number;
  height: number;
  width: number;
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
  children?: ReactElement | null;
  editorMode: EditorMode;
  isMouseOver: boolean;
  isSelected: boolean;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export interface RenderShapeProps {
  annotation: IAnnotation;
  editorMode: EditorMode;
  key: string;
  isInSelectionMode: boolean;
  onAnnotationClick: (annotation: IAnnotation) => void;
  renderContent?: (props: ContentProps) => ReactElement | null;
  selectedAnnotation?: IAnnotation;
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
  AnnotateWithText = 'AnnotateWithText',
  AnnotateOnly = 'AnnotateOnly',
  ReadOnlyWithSelection = 'ReadOnlyWithSelection',
  ReadOnly = 'ReadOnly',
}

export enum SelectionMode {
  New = 'NEW',
  Selecting = 'SELECTING',
  Editing = 'EDITING',
  Final = 'FINAL',
}

export type WrappedShapeProps = {
  annotation: IAnnotation;
  children?: ReactElement | null;
  editorMode: EditorMode;
  isInSelectionMode: boolean;
  key: string;
  onAnnotationClick: (annotation: IAnnotation) => void;
  renderContent?: (props: ContentProps) => ReactElement | null;
  selectedAnnotation?: IAnnotation;
  style?: CSSProperties;
};

export interface RenderOverlayProps {
  annotations: IAnnotation[];
  overlayText?: string;
  selectorType: string;
}

export enum AllowedShape {
  Oval = 'Oval',
  Point = 'Point',
  Rectangle = 'Rectangle',
}

export interface RenderToolbarProps {
  allowedShapes: AllowedShape[];
  deleteAnnotation: (annotation: IAnnotation) => void;
  options: ToolBarOptions;
  selectedAnnotation: IAnnotation | undefined;
  selectedSelectorType: string;
  setSelectedSelectorType: (selector: AllowedShape) => void;
  unSelectSelectedAnnotation: (annotation: IAnnotation) => void;
}

export interface RenderSelectedAnnotationIconsProps {
  annotation: IAnnotation;
  unSelectAnnotation: () => void;
}

export interface ToolBarOptions {
  showToolBar?: boolean;
  showDeleteOption?: boolean;
  renderToolbarIcons?: () => ReactElement | null;
  renderSelectedAnnotationIcons?: (
    props: RenderSelectedAnnotationIconsProps
  ) => ReactElement | null;
}

export interface OverlayOptions {
  displayOverlay?: boolean;
  overlayText?: string;
}

export interface AnnotationProps {
  src: string;
  alt?: string;
  allowedShapes: AllowedShape[];

  annotations: IAnnotation[];

  children?: any;
  className?: string;

  editorMode: EditorMode;

  idFunction: () => string;

  onAnnotationsUpdate: (annotations: IAnnotation[]) => void;
  onAnnotationClick: (annotation: IAnnotation) => void;
  onSelectedAnnotationUpdate: (
    annotation: IAnnotation,
    selected: boolean
  ) => void;

  overlayOptions?: OverlayOptions;

  renderContent: (props: ContentProps) => ReactElement | null;
  renderEditor: (props: RenderEditorProps) => ReactElement | null;
  renderShape: (props: WrappedShapeProps) => ReactElement | null;
  renderOverlay: (props: RenderOverlayProps) => ReactElement | null;

  selectors: ISelector[];
  style?: object;

  toolBarOptions: ToolBarOptions;
}
