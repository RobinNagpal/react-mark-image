import { ReactElement, MouseEvent, MouseEventHandler } from 'react';

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
  methods: {
    onMouseUp?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    onMouseDown?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    onMouseMove?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    onTouchStart?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    onTouchEnd?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    onTouchMove?: (annotation: IAnnotation, e: any) => IAnnotation | {};
    onClick?: (annotation: IAnnotation, e: any) => IAnnotation | {};
  };
}

export interface IAnnotation {
  selection?: {
    mode: string;
    showEditor: boolean;
    anchorX?: number;
    anchorY?: number;
  };
  geometry: IGeometry;
  data: {
    text?: string;
    id?: number;
  };
}

export interface RenderEditorProps {
  annotation: IAnnotation;
  onChange: (a: IAnnotation) => void;
  onSubmit: (e: MouseEvent<HTMLDivElement>) => void;
}

export interface ShapeProps {
  key?: number;
  annotation: IAnnotation;
  isMouseOver: boolean;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}

export interface RenderOverlayProps {
  type?: string;
  annotation: IAnnotation;
}

export interface RenderHighlightProps {
  key?: number;
  annotation: IAnnotation;
  renderContent?: (props: ContentProps) => ReactElement | null;
}

export interface ContentProps {
  key?: number;
  annotation: IAnnotation;
}

export interface RenderSelectorProps {
  annotation: IAnnotation;
  renderContent?: (props: ContentProps) => ReactElement | null;
}

export enum EditorMode {
  Annotate = 'Annotate',
  HighlightOnly = 'HighlightOnly',
}

export enum SelectionMode {
  Selecting = 'SELECTING',
  Editing = 'EDITING',
}

export type WrappedShapeProps = Omit<
  ShapeProps,
  'isMouseOver' | 'onMouseEnter' | 'onMouseLeave'
> & {
  renderContent?: (props: ContentProps) => ReactElement | null;
};

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

  innerRef: (el: HTMLImageElement) => object;

  onMouseUp?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;

  onChange: (e: IAnnotation) => void;
  onSubmit: (e: IAnnotation) => void;

  renderContent: (props: ContentProps) => ReactElement | null;
  renderEditor: (props: RenderEditorProps) => ReactElement | null;
  renderHighlight: (props: WrappedShapeProps) => ReactElement | null;
  renderOverlay: (props: RenderOverlayProps) => ReactElement | null;
  renderSelector: (props: WrappedShapeProps) => ReactElement | null;

  selectors: ISelector[];
  src: string;
  style?: object;

  type: string;

  value?: IAnnotation;
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
