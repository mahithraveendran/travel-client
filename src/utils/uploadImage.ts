import { config } from "@/config";
import axios from "axios";

export const uploadAndGetImageUrl = async (img: any) => {
  let body = new FormData();
  body.set("key", config.imgKey as string);
  body.append("image", img, img?.name || new Date().toISOString());

  // const { data: response } = await axios({
  //   method: "post",
  //   url: `https://api.imgbb.com/1/upload?key=${config.imgKey}`,
  //   data: body,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });

  const { data: response } = await axios.post(
    `https://api.imgbb.com/1/upload?key=0e94becd9a97039b2ee17fa5cc2e1039`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log({ response });

  return response?.data?.url;
};
