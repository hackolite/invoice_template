import { TemplateField } from './types';

export const availableFields: TemplateField[] = [
  // Invoice info
  { id: 'invoiceNumber', path: 'invoice.invoiceNumber', label: 'Invoice Number', type: 'text' },
  { id: 'date', path: 'invoice.date', label: 'Invoice Date', type: 'date' },
  { id: 'dueDate', path: 'invoice.dueDate', label: 'Due Date', type: 'date' },
  { id: 'currency', path: 'invoice.currency', label: 'Currency', type: 'text' },
  
  // Company info
  { id: 'companyName', path: 'invoice.company.name', label: 'Company Name', type: 'text' },
  { id: 'companyEmail', path: 'invoice.company.email', label: 'Company Email', type: 'text' },
  { id: 'companyPhone', path: 'invoice.company.phone', label: 'Company Phone', type: 'text' },
  { id: 'companyAddress', path: 'invoice.company.address', label: 'Company Address', type: 'text' },
  { id: 'companyCity', path: 'invoice.company.city', label: 'Company City', type: 'text' },
  { id: 'companyCountry', path: 'invoice.company.country', label: 'Company Country', type: 'text' },
  { id: 'companyZipCode', path: 'invoice.company.zipCode', label: 'Company Zip', type: 'text' },
  { id: 'companyTaxId', path: 'invoice.company.taxId', label: 'Company Tax ID', type: 'text' },
  
  // Customer info
  { id: 'customerName', path: 'invoice.customer.name', label: 'Customer Name', type: 'text' },
  { id: 'customerEmail', path: 'invoice.customer.email', label: 'Customer Email', type: 'text' },
  { id: 'customerAddress', path: 'invoice.customer.address', label: 'Customer Address', type: 'text' },
  { id: 'customerCity', path: 'invoice.customer.city', label: 'Customer City', type: 'text' },
  { id: 'customerCountry', path: 'invoice.customer.country', label: 'Customer Country', type: 'text' },
  { id: 'customerZipCode', path: 'invoice.customer.zipCode', label: 'Customer Zip', type: 'text' },
  
  // Totals
  { id: 'subtotal', path: 'invoice.subtotal', label: 'Subtotal', type: 'currency' },
  { id: 'tax', path: 'invoice.tax', label: 'Tax', type: 'currency' },
  { id: 'total', path: 'invoice.total', label: 'Total', type: 'currency' },
  { id: 'notes', path: 'invoice.notes', label: 'Notes', type: 'text' },
  
  // Items loop
  { id: 'items', path: 'invoice.items', label: 'Items (Loop)', type: 'loop' },
];
