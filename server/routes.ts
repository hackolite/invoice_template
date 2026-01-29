import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === Templates Routes ===

  app.get(api.templates.list.path, async (req, res) => {
    const templates = await storage.getTemplates();
    res.json(templates);
  });

  app.get(api.templates.get.path, async (req, res) => {
    const template = await storage.getTemplate(Number(req.params.id));
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
  });

  app.post(api.templates.create.path, async (req, res) => {
    try {
      const input = api.templates.create.input.parse(req.body);
      const template = await storage.createTemplate(input);
      res.status(201).json(template);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.templates.update.path, async (req, res) => {
    try {
      const input = api.templates.update.input.parse(req.body);
      const updated = await storage.updateTemplate(Number(req.params.id), input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Handle not found via storage check if preferred, or generic 500
      // For simplicity in this Lite build, assuming ID exists or next generic catch hits.
      // Ideally check existence first.
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.delete(api.templates.delete.path, async (req, res) => {
    await storage.deleteTemplate(Number(req.params.id));
    res.status(204).send();
  });

  // Seed database if needed
  await seedDatabase();

  return httpServer;
}

// Seed function to populate database with an example template
export async function seedDatabase() {
  const templates = await storage.getTemplates();
  if (templates.length === 0) {
    console.log("Seeding database with example template...");
    
    const sampleData = {
      invoiceNumber: "INV-MARINE-2024-001",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      provider: {
        name: "Neptune Maritime Services Ltd.",
        address: "Port Authority Building, Dock 5\n789 Harbor Boulevard\nMiami, FL 33132, USA",
        email: "billing@neptune-marine.com",
        phone: "+1 (305) 555-0199",
        license: "IMO-9876543",
        vat: "US-MAR-456789"
      },
      client: {
        name: "Azure Seas Cruise Lines",
        contactPerson: "Captain Isabella Rodriguez",
        address: "Cruise Terminal Complex\n1500 Ocean Drive\nFort Lauderdale, FL 33316, USA",
        email: "operations@azureseas.com",
        phone: "+1 (954) 555-0288"
      },
      vessel: {
        name: "SS Paradise Explorer",
        imo: "IMO-1234567",
        flag: "Bahamas",
        type: "Cruise Ship",
        grossTonnage: 168666,
        capacity: 6680,
        homePort: "Nassau"
      },
      voyage: {
        number: "PE-2024-012",
        route: "Caribbean Circle",
        departure: "2024-01-10",
        arrival: "2024-01-20",
        ports: ["Miami", "Cozumel", "Grand Cayman", "Jamaica", "Miami"]
      },
      items: [
        { 
          description: "Fuel Bunkering Service - Heavy Fuel Oil (HFO)", 
          quantity: 2500, 
          unit: "MT",
          price: 450, 
          total: 1125000,
          category: "Fuel"
        },
        { 
          description: "Fresh Water Supply", 
          quantity: 800, 
          unit: "m³",
          price: 8.50, 
          total: 6800,
          category: "Provisions"
        },
        { 
          description: "Port Navigation & Pilotage Services", 
          quantity: 4, 
          unit: "Ports",
          price: 3500, 
          total: 14000,
          category: "Navigation"
        },
        { 
          description: "Tugboat Assistance - Docking & Undocking", 
          quantity: 8, 
          unit: "Hours",
          price: 1200, 
          total: 9600,
          category: "Port Services"
        },
        { 
          description: "Waste Disposal & Environmental Services", 
          quantity: 1, 
          unit: "Service",
          price: 8500, 
          total: 8500,
          category: "Environmental"
        },
        { 
          description: "Marine Equipment Inspection & Certification", 
          quantity: 1, 
          unit: "Inspection",
          price: 4500, 
          total: 4500,
          category: "Safety & Compliance"
        },
        { 
          description: "Ship Chandlery Supplies", 
          quantity: 1, 
          unit: "Order",
          price: 12000, 
          total: 12000,
          category: "Supplies"
        },
        { 
          description: "Communication & Satellite Services", 
          quantity: 10, 
          unit: "Days",
          price: 450, 
          total: 4500,
          category: "Communications"
        }
      ],
      crew: {
        captain: "Captain Marcus Thornton",
        chiefEngineer: "Elena Volkov",
        totalCrew: 1500
      },
      passengers: {
        embarked: 6245,
        disembarked: 6102,
        nationalities: ["USA", "UK", "Canada", "Germany", "Australia"]
      },
      subtotal: 1184900,
      tax: 88867.50,
      portFees: 15000,
      environmentalFee: 5000,
      total: 1293767.50,
      currency: "USD",
      paymentTerms: "Net 30 days",
      bankDetails: {
        bankName: "Maritime International Bank",
        accountName: "Neptune Maritime Services Ltd.",
        accountNumber: "MAR-4567-8901-2345",
        swiftCode: "MARIBKUS33",
        iban: "US12MARI45678901234567"
      },
      notes: "Services provided in accordance with IMO regulations and international maritime standards. All fuel meets MARPOL Annex VI specifications.",
      authorized: {
        name: "Robert Chen",
        title: "Port Operations Manager",
        signature: "R. Chen",
        date: "2024-01-15"
      }
    };

    const layout = {
      pageSize: "A4",
      orientation: "portrait",
      elements: [
        {
          id: "el_1",
          type: "text",
          x: 20,
          y: 20,
          width: 300,
          height: 50,
          content: "MARINE INVOICE",
          style: { fontSize: 32, fontWeight: "bold", color: "#0066cc" }
        },
        {
          id: "el_inv",
          type: "text",
          x: 520,
          y: 25,
          width: 250,
          height: 40,
          binding: "invoiceNumber",
          style: { fontSize: 16, textAlign: "right", fontWeight: "600" }
        },
        {
          id: "el_2",
          type: "text",
          x: 20,
          y: 90,
          width: 300,
          height: 100,
          binding: "provider.name",
          style: { fontSize: 14, fontWeight: "bold" }
        },
        {
          id: "el_provider_addr",
          type: "text",
          x: 20,
          y: 120,
          width: 300,
          height: 80,
          binding: "provider.address",
          style: { fontSize: 11, color: "#333333", lineHeight: 1.5 }
        },
        {
          id: "el_3",
          type: "text",
          x: 450,
          y: 90,
          width: 320,
          height: 30,
          content: "BILL TO:",
          style: { fontSize: 12, fontWeight: "bold", color: "#666666" }
        },
        {
          id: "el_client",
          type: "text",
          x: 450,
          y: 115,
          width: 320,
          height: 25,
          binding: "client.name",
          style: { fontSize: 14, fontWeight: "600" }
        },
        {
          id: "el_client_addr",
          type: "text",
          x: 450,
          y: 140,
          width: 320,
          height: 80,
          binding: "client.address",
          style: { fontSize: 11, color: "#333333", lineHeight: 1.5 }
        },
        {
          id: "el_vessel_header",
          type: "text",
          x: 20,
          y: 230,
          width: 200,
          height: 25,
          content: "VESSEL INFORMATION",
          style: { fontSize: 12, fontWeight: "bold", color: "#0066cc" }
        },
        {
          id: "el_vessel",
          type: "text",
          x: 20,
          y: 255,
          width: 350,
          height: 25,
          binding: "vessel.name",
          style: { fontSize: 13, fontWeight: "600" }
        },
        {
          id: "el_line1",
          type: "line",
          x: 20,
          y: 290,
          width: 750,
          height: 2,
          orientation: "horizontal",
          style: { backgroundColor: "#0066cc" }
        },
        {
          id: "el_table",
          type: "table",
          x: 20,
          y: 310,
          width: 750,
          height: 350,
          tableConfig: {
            dataSource: "items",
            columns: [
              { header: "Description", binding: "description", width: "40%" },
              { header: "Qty", binding: "quantity", width: "10%" },
              { header: "Unit", binding: "unit", width: "10%" },
              { header: "Price", binding: "price", width: "15%", format: "currency" },
              { header: "Total", binding: "total", width: "25%", format: "currency" }
            ]
          }
        },
        {
          id: "el_subtotal_label",
          type: "text",
          x: 550,
          y: 680,
          width: 120,
          height: 25,
          content: "Subtotal:",
          style: { fontSize: 13, textAlign: "right", fontWeight: "600" }
        },
        {
          id: "el_subtotal",
          type: "text",
          x: 680,
          y: 680,
          width: 90,
          height: 25,
          binding: "subtotal",
          style: { fontSize: 13, textAlign: "right" }
        },
        {
          id: "el_tax_label",
          type: "text",
          x: 550,
          y: 710,
          width: 120,
          height: 25,
          content: "Tax (7.5%):",
          style: { fontSize: 13, textAlign: "right", fontWeight: "600" }
        },
        {
          id: "el_tax",
          type: "text",
          x: 680,
          y: 710,
          width: 90,
          height: 25,
          binding: "tax",
          style: { fontSize: 13, textAlign: "right" }
        },
        {
          id: "el_total_label",
          type: "text",
          x: 550,
          y: 745,
          width: 120,
          height: 30,
          content: "TOTAL:",
          style: { fontSize: 16, textAlign: "right", fontWeight: "bold", color: "#0066cc" }
        },
        {
          id: "el_total",
          type: "text",
          x: 680,
          y: 745,
          width: 90,
          height: 30,
          binding: "total",
          style: { fontSize: 16, textAlign: "right", fontWeight: "bold", color: "#0066cc" }
        }
      ]
    };

    await storage.createTemplate({
      name: "Marine Services Invoice",
      description: "Professional invoice template for marine and cruise ship services.",
      layout: layout,
      sampleData: sampleData
    });
    
    console.log("Database seeded!");
  }
}
