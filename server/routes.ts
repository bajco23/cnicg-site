import type { Express } from "express";
import type { Server } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // API routes
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const created = await storage.createContactMessage(input);
      return res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0]?.message ?? "Invalid request",
          field: err.errors[0]?.path?.join("."),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Serve static HTML files explicitly
  const clientPath = path.resolve(__dirname, "..", "client");
  
  app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });

  app.get("/index.html", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });

  app.get("/about.html", (req, res) => {
    res.sendFile(path.join(clientPath, "about.html"));
  });

  app.get("/contact.html", (req, res) => {
    res.sendFile(path.join(clientPath, "contact.html"));
  });

  app.get("/koncesije.html", (req, res) => {
    res.sendFile(path.join(clientPath, "koncesije.html"));
  });

  app.get("/partnerstva.html", (req, res) => {
    res.sendFile(path.join(clientPath, "partnerstva.html"));
  });

  app.get("/nabavke.html", (req, res) => {
    res.sendFile(path.join(clientPath, "nabavke.html"));
  });

  return httpServer;
}
