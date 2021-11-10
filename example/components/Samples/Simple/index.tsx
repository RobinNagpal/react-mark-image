import React, { useState } from 'react';
import { Annotation, IAnnotation } from 'react-mark-image';

import Root from '../../Root';
import img from './../../../cats.jpg';

export default function Simple() {
  const [annotations, setAnnotations] = useState<IAnnotation[]>([]);

  return (
    <Root>
      <Annotation
        src={img}
        alt="Cats"
        annotations={annotations}
        onAnnotationsUpdate={setAnnotations}
        allowTouch
      />
    </Root>
  );
}
