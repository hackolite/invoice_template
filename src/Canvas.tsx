import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { DroppedField, TemplateField } from './types';
import { DroppedFieldComponent } from './DroppedFieldComponent';

interface CanvasProps {
  droppedFields: DroppedField[];
  onDrop: (field: TemplateField, x: number, y: number) => void;
  onMove: (id: string, x: number, y: number) => void;
  onRemove: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ droppedFields, onDrop, onMove, onRemove }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [canvasElement, setCanvasElement] = useState<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item: { field: TemplateField }, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasElement?.getBoundingClientRect();
      
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        onDrop(item.field, x, y);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [canvasElement, onDrop]);

  return (
    <div
      ref={(node) => {
        setCanvasElement(node);
        drop(node);
      }}
      className={`canvas ${isOver ? 'drag-over' : ''}`}
      onClick={() => setSelectedField(null)}
    >
      {droppedFields.map((droppedField) => (
        <DroppedFieldComponent
          key={droppedField.id}
          droppedField={droppedField}
          isSelected={selectedField === droppedField.id}
          onMove={onMove}
          onRemove={onRemove}
          onSelect={() => setSelectedField(droppedField.id)}
        />
      ))}
    </div>
  );
};
