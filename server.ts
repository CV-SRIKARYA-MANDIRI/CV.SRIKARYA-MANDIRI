import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import AdmZip from "adm-zip";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    category TEXT,
    year INTEGER,
    location TEXT,
    status TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subcontractors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialty TEXT,
    contact TEXT,
    rating INTEGER
  );
`);

// Seed initial data if empty
const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
if (projectCount.count === 0) {
  const insertProject = db.prepare("INSERT INTO projects (title, description, category, year, location, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insertProject.run("Pabrik Otomotif Cikarang", "Pembangunan struktur baja utama", "Industri", 2023, "Cikarang", "Selesai", "https://picsum.photos/seed/p1/800/600");
  insertProject.run("Gedung Perkantoran Sudirman", "Instalasi ME dan finishing", "Gedung", 2024, "Jakarta", "Dalam Proses", "https://picsum.photos/seed/p2/800/600");
  insertProject.run("Jembatan Layang Tol", "Pekerjaan sipil dan infrastruktur", "Infrastruktur", 2022, "Surabaya", "Selesai", "https://picsum.photos/seed/p3/800/600");
}

const serviceCount = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
if (serviceCount.count === 0) {
  const insertService = db.prepare("INSERT INTO services (title, description, icon) VALUES (?, ?, ?)");
  insertService.run("Proyek & Konstruksi", "Pekerjaan konstruksi sipil, bangunan, renovasi, dan perawatan gedung.", "Building2");
  insertService.run("Pekerjaan Sipil Industri", "Pembangunan lantai produksi, pondasi mesin, dan infrastruktur pabrik.", "Factory");
  insertService.run("Pekerjaan Struktur & Baja", "Struktur baja ringan/berat, platform kerja, dan canopy industri.", "Construction");
  insertService.run("Mechanical & Electrical", "Instalasi mesin produksi, panel listrik, dan sistem MEP terintegrasi.", "Zap");
  insertService.run("Jasa Katering Industri", "Penyediaan konsumsi harian untuk proyek, kantor, dan acara perusahaan.", "Utensils");
  insertService.run("Seragam & Atribut Kerja", "Produksi seragam proyek, kaos event, dan perlengkapan safety.", "Shirt");
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects ORDER BY year DESC").all();
    res.json(projects);
  });

  app.get("/api/services", (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.json(services);
  });

  app.post("/api/messages", (req, res) => {
    const { name, email, subject, message } = req.body;
    const info = db.prepare("INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)").run(name, email, subject, message);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/admin/stats", (req, res) => {
    const projects = db.prepare("SELECT COUNT(*) as count FROM projects").get() as any;
    const messages = db.prepare("SELECT COUNT(*) as count FROM messages").get() as any;
    const subs = db.prepare("SELECT COUNT(*) as count FROM subcontractors").get() as any;
    res.json({
      totalProjects: projects.count,
      unreadMessages: messages.count,
      totalSubcontractors: subs.count
    });
  });

  app.get("/api/admin/messages", (req, res) => {
    const messages = db.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();
    res.json(messages);
  });

  app.get("/api/download-project", (req, res) => {
    try {
      const zip = new AdmZip();
      const rootDir = __dirname;
      
      const excludeDirs = ['node_modules', 'dist', '.git', '.next', '.gemini'];
      const excludeFiles = ['database.sqlite', 'database.sqlite-journal'];

      const addFilesRecursively = (currentDir: string, zipPath: string) => {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
          const fullPath = path.join(currentDir, file);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
              addFilesRecursively(fullPath, path.join(zipPath, file));
            }
          } else {
            if (!excludeFiles.includes(file)) {
              zip.addLocalFile(fullPath, zipPath);
            }
          }
        }
      };

      addFilesRecursively(rootDir, "");
      
      const buffer = zip.toBuffer();
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', 'attachment; filename=cv-srikarya-mandiri-project.zip');
      res.send(buffer);
    } catch (error) {
      console.error("Zip error:", error);
      res.status(500).send("Failed to generate zip");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
