import { useRef, useEffect } from 'react';
import { DroppedField } from './types';

interface DroppedFieldComponentProps {
  droppedField: DroppedField;
  isSelected: boolean;
  onMove: (id: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
  onSelect: () => void;
}

export const DroppedFieldComponent: React.FC<DroppedFieldComponentProps> = ({
  droppedField,
  isSelected,
  onMove,
  onRemove,
  onSelect,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('remove-btn')) {
        return;
      }
      
      isDraggingRef.current = true;
      const rect = element.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      onSelect();
      e.stopPropagation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      const canvas = element.parentElement;
      if (!canvas) return;
      
      const canvasRect = canvas.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - offsetRef.current.x;
      const y = e.clientY - canvasRect.top - offsetRef.current.y;
      
      onMove(droppedField.id, Math.max(0, x), Math.max(0, y));
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [droppedField.id, onMove, onSelect]);

  const isLoop = droppedField.field.type === 'loop';

  return (
    <div
      ref={elementRef}
      className={`dropped-field ${isSelected ? 'selected' : ''} ${isLoop ? 'loop-field' : ''}`}
      style={{
        left: `${droppedField.x}px`,
        top: `${droppedField.y}px`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <button
        className="remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(droppedField.id);
        }}
      >
        ×
      </button>
      <div className="dropped-field-label">{droppedField.field.label}</div>
      <div className="dropped-field-path">{droppedField.field.path}</div>
      {isLoop && (
        <div className="loop-field-content">
          Loop through items:
          <br />• description
          <br />• quantity
          <br />• unitPrice
          <br />• total
        </div>
      )}
    </div>
  );
};
