import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { fetchModifiedFiles, getDatesFromRange } from "./utils";

const app: Express = express();
const PORT = 5175;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/files", async (req: Request, res: Response) => {
  try {
    const start_date = req.query.start_date as string;
    const end_date = req.query.end_date as string;
    const token = req.query.token as string;

    if (!start_date || !end_date || !token) {
      res.status(400).json("Invalid query params");
    }

    /*
  1. check if entries exist in db
  2. if not fetch from github and add to db
  3. get all the data previously fetched from db
  */

    const dates = getDatesFromRange(new Date(start_date), new Date(end_date));
    for (const date of dates) {
      const entries = await prisma.modifiedFile.findMany({
        where: {
          date: date,
        },
      });

      if (entries.length >= 1) {
        console.log("fetch db");
      } else {
        console.log("fetch api");
        const modifiedFiles = await fetchModifiedFiles(
          "doctolib",
          "doctolib",
          date.toISOString(),
          token
        );

        if (!modifiedFiles)
          return res.status(500).json("Error fetching modified files");

        for (const file of modifiedFiles) {
          await prisma.modifiedFile.create({
            data: {
              ...file,
            },
          });
        }
      }
    }

    const files = await prisma.modifiedFile.findMany({
      where: {
        date: {
          gte: new Date(start_date),
          lte: new Date(end_date),
        },
      },
    });
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
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
