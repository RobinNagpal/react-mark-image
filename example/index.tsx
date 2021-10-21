import 'react-app-polyfill/ie11';
import { useState } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Annotation, IAnnotation } from '../.';

const App = () => {
  const [annotations, setAnnotations] = useState<any[]>([]);

  const [annotation, setAnnotation] = useState<any>({});

  const onSubmit = async (annotation: IAnnotation) => {
    const { geometry, data } = annotation;

    setAnnotation({});

    const updatedAnnotations = [
      ...annotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ];
    setAnnotations(updatedAnnotations);
  };

  return (
    <div style={{ width: '1000px', height: '700px' }}>
      <Annotation
        src={
          'https://cdn.pixabay.com/photo/2015/09/04/18/55/yoda-922520_960_720.png'
        }
        alt="Two pebbles anthropomorphized holding hands"
        annotations={annotations}
        value={annotation}
        onChange={setAnnotation}
        onSubmit={onSubmit}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
