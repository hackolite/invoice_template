export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Company {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  taxId: string;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: Company;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  currency: string;
}

export interface TemplateField {
  id: string;
  path: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'loop';
}

export interface DroppedField {
  id: string;
  field: TemplateField;
  x: number;
  y: number;
}
