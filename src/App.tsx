import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { Preview } from './Preview';
import { DroppedField, TemplateField } from './types';
import { sampleInvoice } from './sampleData';

function App() {
  const [droppedFields, setDroppedFields] = useState<DroppedField[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleDrop = (field: TemplateField, x: number, y: number) => {
    const newField: DroppedField = {
      id: `${field.id}-${Date.now()}`,
      field,
      x,
      y,
    };
    setDroppedFields([...droppedFields, newField]);
  };

  const handleMove = (id: string, x: number, y: number) => {
    setDroppedFields(droppedFields.map(field => 
      field.id === id ? { ...field, x, y } : field
    ));
  };

  const handleRemove = (id: string) => {
    setDroppedFields(droppedFields.filter(field => field.id !== id));
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all fields?')) {
      setDroppedFields([]);
    }
  };

  const handleExport = () => {
    const template = {
      fields: droppedFields.map(f => ({
        path: f.field.path,
        label: f.field.label,
        type: f.field.type,
        x: f.x,
        y: f.y,
      })),
    };
    
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Sidebar />
        
        <div className="main-content">
          <div className="toolbar">
            <h1>🧾 Invoice Template Generator</h1>
            <div className="toolbar-actions">
              <button className="btn btn-secondary" onClick={handleClear}>
                Clear All
              </button>
              <button className="btn btn-secondary" onClick={handleExport}>
                Export Template
              </button>
              <button className="btn" onClick={() => setShowPreview(true)}>
                Preview with Data
              </button>
            </div>
          </div>
          
          <div className="canvas-container">
            <Canvas
              droppedFields={droppedFields}
              onDrop={handleDrop}
              onMove={handleMove}
              onRemove={handleRemove}
            />
          </div>
        </div>

        {showPreview && (
          <Preview
            droppedFields={droppedFields}
            invoice={sampleInvoice}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
