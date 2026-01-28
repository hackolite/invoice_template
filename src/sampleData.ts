import { Invoice } from './types';

export const sampleInvoice: Invoice = {
  invoiceNumber: 'INV-2024-001',
  date: '2024-01-28',
  dueDate: '2024-02-28',
  currency: 'USD',
  company: {
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St',
    city: 'San Francisco',
    country: 'United States',
    zipCode: '94102',
    taxId: 'US-TAX-123456',
  },
  customer: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    address: '456 Customer Ave',
    city: 'New York',
    country: 'United States',
    zipCode: '10001',
  },
  items: [
    {
      description: 'Web Development Services',
      quantity: 40,
      unitPrice: 100,
      total: 4000,
    },
    {
      description: 'UI/UX Design',
      quantity: 20,
      unitPrice: 120,
      total: 2400,
    },
    {
      description: 'Consulting Services',
      quantity: 10,
      unitPrice: 150,
      total: 1500,
    },
  ],
  subtotal: 7900,
  tax: 790,
  total: 8690,
  notes: 'Thank you for your business! Payment is due within 30 days.',
};
