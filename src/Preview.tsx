import { Invoice } from './types';

const getValue = (obj: any, path: string): any => {
  const parts = path.replace('invoice.', '').split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === undefined || current === null) return '';
    current = current[part];
  }
  
  return current;
};

interface PreviewProps {
  droppedFields: any[];
  invoice: Invoice;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ droppedFields, invoice, onClose }) => {
  return (
    <div className="preview-container" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="preview-close" onClick={onClose}>×</button>
        <div style={{ position: 'relative', width: '595px', height: '842px', background: 'white' }}>
          {droppedFields.map((field) => {
            const value = getValue(invoice, field.field.path);
            
            return (
              <div
                key={field.id}
                style={{
                  position: 'absolute',
                  left: `${field.x}px`,
                  top: `${field.y}px`,
                  color: '#000',
                  fontSize: '14px',
                }}
              >
                {field.field.type === 'loop' ? (
                  <div>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #333' }}>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                          <th style={{ padding: '8px', textAlign: 'right' }}>Qty</th>
                          <th style={{ padding: '8px', textAlign: 'right' }}>Price</th>
                          <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>{item.description}</td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>{item.quantity}</td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                              ${item.unitPrice.toFixed(2)}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                              ${item.total.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : field.field.type === 'currency' ? (
                  <strong>${typeof value === 'number' ? value.toFixed(2) : value}</strong>
                ) : (
                  <span>{String(value)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
