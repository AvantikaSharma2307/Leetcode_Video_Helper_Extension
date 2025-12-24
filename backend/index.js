import express from "express";
import cors from "cors";
import yts from "yt-search";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    const result = await yts(query);

    const videos = result.videos.slice(0, ).map(v => ({
      title: v.title,
      url: v.url,
      thumbnail: v.thumbnail
    }));

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

app.listen(PORT||3000, () => {
  console.log("Backend running at http://localhost:3000");
});
