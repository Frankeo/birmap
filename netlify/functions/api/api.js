import ServerlessHttp from "serverless-http";
import express, { Router } from "express";
import { isAuthorized } from "@tinacms/auth";
import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";

const app = express();

const router = Router();

const mediaHandler = createMediaHandler({
  cloud_name: "dyumenth9",
  api_key: "342886347741661",
  api_secret: "0Yj9XzDXUIdqAbVIMaF808Ayr0Q",
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === "development") {
        return true;
      }

      const user = await isAuthorized(req);

      return user != null && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

router.get("/cloudinary/media", mediaHandler);

router.post("/cloudinary/media", mediaHandler);

router.delete("/cloudinary/media/:media", async (req, res) => {
  req.query.media = ["media", req.params.media];
  await mediaHandler(req, res);
});

app.use("/api/", router);
app.use("/.netlify/functions/api/", router);

export const handler = ServerlessHttp(app);
