import { API_URL } from "../../shared/constant";
import { NextApiHandler } from "next";
import axios from "axios";

const handler: NextApiHandler = (req, res) => {
  if (!req.query.url) return res.status(400).send("URL must not be empty");
  const url = (req.query.url as string).startsWith("//")
    ? (req.query.url as string).replace("//", "http://")
    : (req.query.url as string);
  axios
    .get(url, {
      responseType: "arraybuffer",
      headers: {
        referer: API_URL,
      },
    })
    .then(({ data, headers: { "content-type": contentType } }) => {
      res
        .setHeader("cache-control", "max-age=99999")
        .setHeader("content-type", contentType)
        .send(data);
    });
};

export default handler;
