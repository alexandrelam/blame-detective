import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 5175;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/files", async (req: Request, res: Response) => {
  const files = await prisma.modifiedFile.findMany();
  res.status(200).json(files);
});

app.post("/files", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    await prisma.modifiedFile.create({
      data: {
        ...payload,
      },
    });
    res.status(200).json("File created");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
