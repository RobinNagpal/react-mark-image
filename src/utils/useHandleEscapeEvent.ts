import { useEffect } from 'react';
import { IAnnotation } from '../types/index';

export default function useHandleEscapeEvent(
  unselectSelectedAnnotation: () => void,
  selectedItem?: IAnnotation
) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        unselectSelectedAnnotation();
      }
    }

    // Bind the event listener
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, unselectSelectedAnnotation]);
}
