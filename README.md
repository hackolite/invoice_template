# Invoice Template Generator 🧾

A beautiful, professional invoice template generator with drag-and-drop functionality. Built with TypeScript and React in the style of Replit.

## Features

- ✨ **Drag-and-Drop Interface**: Intuitive drag-and-drop system to place invoice fields on the canvas
- 🔄 **Nested Attributes**: Support for nested JSON attributes like `invoice.customer.address`
- 🔁 **Loop Rendering**: Special handling for items arrays with for-loop style rendering
- 🎨 **Professional UI**: Clean, modern interface inspired by Replit's design
- 📋 **Live Preview**: Preview your invoice template with real data
- 💾 **Export Templates**: Save your template configuration as JSON
- 🎯 **TypeScript**: Fully typed for better development experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Drag Fields**: From the left sidebar, drag any invoice field to the canvas
2. **Position Fields**: Click and drag fields on the canvas to position them
3. **Remove Fields**: Hover over a field and click the × button to remove it
4. **Preview**: Click "Preview with Data" to see your template with sample invoice data
5. **Export**: Click "Export Template" to save your template configuration

## Available Fields

### Invoice Info
- Invoice Number
- Invoice Date
- Due Date
- Currency

### Company Info
- Company Name, Email, Phone
- Company Address, City, Country, Zip Code
- Company Tax ID

### Customer Info
- Customer Name, Email
- Customer Address, City, Country, Zip Code

### Totals & Items
- Subtotal, Tax, Total
- Notes
- Items (Loop) - Renders a table of line items

## Template Structure

The template is built from a JSON invoice descriptor with this structure:

```typescript
interface Invoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    taxId: string;
  };
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  currency: string;
}
```

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **react-dnd**: Drag-and-drop functionality
- **CSS3**: Custom styling with Catppuccin color scheme

## Design Philosophy

The UI follows a clean, professional design inspired by Replit:
- Dark theme with high contrast
- Smooth transitions and hover effects
- Clear visual hierarchy
- Intuitive drag-and-drop interactions
- Professional color palette (Catppuccin Mocha)

## License

MIT
