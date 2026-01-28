import { useDrag } from 'react-dnd';
import { TemplateField } from './types';

interface FieldItemProps {
  field: TemplateField;
}

export const FieldItem: React.FC<FieldItemProps> = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="field-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="field-label">{field.label}</div>
      <div className="field-path">{field.path}</div>
    </div>
  );
};
