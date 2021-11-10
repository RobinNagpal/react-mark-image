import React, { useState } from 'react';
import { Annotation, IAnnotation } from 'react-mark-image';
import img from './../../../cats.jpg';

export default function Simple() {
  const [annotations, setAnnotations] = useState<IAnnotation[]>([]);

  return (
    <Annotation
      src={img}
      alt="Cats"
      annotations={annotations}
      onAnnotationsUpdate={setAnnotations}
      allowTouch
    />
  );
}
