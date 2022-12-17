import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const opeai = new OpenAIApi(configuration);

export const Controller = async (req, res) => {
  const { prompt, size } = req.body;
  try {
    const response = await opeai.createImage({
      prompt,
      n: 1,
      size,
    });
    const ImageUrl = response.data.data[0].url;
    res.status(200).json({
      sucess: true,
      data: ImageUrl,
    });
  } catch (e) {
    console.log(e);
  }
};
