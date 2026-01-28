# Invoice Template Generator - Usage Examples

## Basic Usage

### 1. Starting the Development Server

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173/` in your browser.

### 2. Building an Invoice Template

1. **Drag Fields**: Click and drag any field from the left sidebar onto the white canvas
2. **Position Fields**: Click and drag fields on the canvas to reposition them
3. **Remove Fields**: Hover over a field and click the × button to remove it
4. **Preview**: Click "Preview with Data" to see your template rendered with sample data
5. **Export**: Click "Export Template" to download your template configuration as JSON

### 3. Working with Different Field Types

#### Simple Fields
Drag fields like "Invoice Number", "Company Name", or "Customer Email" directly to the canvas. These will display the value at that exact location.

#### Nested Attributes
All fields support nested JSON paths:
- `invoice.company.name` - Company name
- `invoice.customer.address` - Customer address
- `invoice.company.email` - Company email

#### Currency Fields
Fields like "Subtotal", "Tax", and "Total" are automatically formatted as currency with two decimal places.

#### Loop Fields
The "Items (Loop)" field is special - it renders a table of all invoice line items with columns for:
- Description
- Quantity
- Unit Price
- Total

### 4. Example Template Configuration

When you export a template, you'll get a JSON file like this:

```json
{
  "fields": [
    {
      "path": "invoice.invoiceNumber",
      "label": "Invoice Number",
      "type": "text",
      "x": 30,
      "y": 30
    },
    {
      "path": "invoice.company.name",
      "label": "Company Name",
      "type": "text",
      "x": 30,
      "y": 80
    },
    {
      "path": "invoice.items",
      "label": "Items (Loop)",
      "type": "loop",
      "x": 30,
      "y": 200
    },
    {
      "path": "invoice.total",
      "label": "Total",
      "type": "currency",
      "x": 450,
      "y": 650
    }
  ]
}
```

## Invoice JSON Structure

Your invoice data should follow this structure:

```json
{
  "invoiceNumber": "INV-2024-001",
  "date": "2024-01-28",
  "dueDate": "2024-02-28",
  "currency": "USD",
  "company": {
    "name": "Your Company",
    "email": "contact@company.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Business St",
    "city": "San Francisco",
    "country": "United States",
    "zipCode": "94102",
    "taxId": "US-TAX-123456"
  },
  "customer": {
    "name": "Customer Name",
    "email": "customer@example.com",
    "address": "456 Customer Ave",
    "city": "New York",
    "country": "United States",
    "zipCode": "10001"
  },
  "items": [
    {
      "description": "Service/Product Name",
      "quantity": 10,
      "unitPrice": 100,
      "total": 1000
    }
  ],
  "subtotal": 1000,
  "tax": 100,
  "total": 1100,
  "notes": "Payment terms and notes"
}
```

## Tips & Tricks

1. **Layout Planning**: Start with the major sections (header, customer info, items table, totals) before adding detailed fields

2. **Visual Hierarchy**: Use the canvas space strategically:
   - Top: Invoice number, date, company info
   - Middle: Customer info and items table
   - Bottom: Totals and notes

3. **Loop Positioning**: The Items (Loop) field renders as a table, so give it enough horizontal and vertical space

4. **Preview Often**: Use the preview feature frequently to see how your template looks with real data

5. **Export for Backup**: Export your template configuration regularly to save your work

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Customization

### Modifying Available Fields

Edit `src/fields.ts` to add or remove fields from the sidebar.

### Changing the Sample Data

Edit `src/sampleData.ts` to use your own sample invoice data for previews.

### Styling

The application uses CSS custom properties defined in `src/App.css`. You can modify colors, spacing, and other visual properties there.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires a modern browser with support for:
- ES2020 features
- CSS Grid and Flexbox
- HTML5 Drag and Drop API
