import type { Express } from "express";
import type { Server } from "http";
import path from "path";
import express from "express";
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

  const clientPath = path.resolve(__dirname, "..", "client");

  app.use("/lang.js", (req, res) => {
    res.type("application/javascript");
    res.sendFile(path.join(clientPath, "lang.js"));
  });

  app.use("/style.css", (req, res) => {
    res.type("text/css");
    res.sendFile(path.join(clientPath, "style.css"));
  });

  app.use("/images", express.static(path.join(clientPath, "public", "images")));
  app.use("/docs", express.static(path.join(clientPath, "public", "docs")));

  const htmlPages = [
    "index.html",
    "about.html",
    "contact.html",
    "koncesije.html",
    "partnerstva.html",
    "nabavke.html",
    "javne-politike.html",
    "izvjestaj-detaljno.html",
    "vijest-koncesije-rasprava.html",
  ];

  app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });

  htmlPages.forEach((page) => {
    app.get("/" + page, (req, res) => {
      res.sendFile(path.join(clientPath, page));
    });
  });

  return httpServer;
}
