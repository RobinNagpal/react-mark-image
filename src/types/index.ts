import { ReactElement, MouseEvent } from 'react';

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
    text: string;
    id?: number;
  };
}

export interface RenderEditorProps {
  annotation: IAnnotation;
  onChange: (a: IAnnotation) => void;
  onSubmit: (e: MouseEvent<HTMLDivElement>) => void;
}

export interface RenderContentProps {
  key?: number;
  annotation: IAnnotation;
}

export interface RenderOverlayProps {
  type?: string;
  annotation: IAnnotation;
}

export interface RenderHighlightProps {
  key?: number;
  active?: boolean;
  annotation: IAnnotation;
}

export interface RenderSelectorProps {
  annotation: IAnnotation;
}

export enum EditorMode {
  Annotate = 'Annotate',
  HighlightOnly = 'HighlightOnly',
}

export enum SelectionMode {
  Selecting = 'SELECTING',
  Editing = 'EDITING',
}

export interface AnnotationProps {
  activeAnnotationComparator: (a1: IAnnotation, a2: IAnnotation) => boolean;
  activeAnnotations?: IAnnotation[];
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

  renderContent: (props: RenderContentProps) => ReactElement | null;
  renderEditor: (props: RenderEditorProps) => ReactElement | null;
  renderHighlight: (props: RenderHighlightProps) => ReactElement | null;
  renderOverlay: (props: RenderOverlayProps) => ReactElement | null;
  renderSelector: (props: RenderSelectorProps) => ReactElement | null;

  selectors: ISelector[];
  src: string;
  style?: object;

  type: string;

  value?: IAnnotation;
}
