import { FieldItem } from './FieldItem';
import { availableFields } from './fields';

export const Sidebar: React.FC = () => {
  const categories = {
    'Invoice Info': availableFields.filter(f => 
      ['invoiceNumber', 'date', 'dueDate', 'currency'].includes(f.id)
    ),
    'Company': availableFields.filter(f => f.id.startsWith('company')),
    'Customer': availableFields.filter(f => f.id.startsWith('customer')),
    'Totals & Items': availableFields.filter(f => 
      ['subtotal', 'tax', 'total', 'notes', 'items'].includes(f.id)
    ),
  };

  return (
    <div className="sidebar">
      <h2>📋 Invoice Fields</h2>
      <p style={{ fontSize: '12px', color: '#6c7086', marginBottom: '20px' }}>
        Drag fields to the canvas to build your invoice template
      </p>
      
      {Object.entries(categories).map(([category, fields]) => (
        <div key={category} className="field-category">
          <h3>{category}</h3>
          {fields.map(field => (
            <FieldItem key={field.id} field={field} />
          ))}
        </div>
      ))}
    </div>
  );
};
