import { Carousel } from "antd";
import React from "react";

import imageOne from "@/asset/slider/1.jpg";
import imageTen from "@/asset/slider/10.jpg";
import imageEleven from "@/asset/slider/11.jpg";
import imageTwelve from "@/asset/slider/12.jpg";
import imageThirteen from "@/asset/slider/13.jpg";
import imageFourteen from "@/asset/slider/14.jpg";
import imageFifteen from "@/asset/slider/15.jpg";
import imageTwo from "@/asset/slider/2.jpg";
import imageFour from "@/asset/slider/4.jpg";
import imageFive from "@/asset/slider/5.jpg";
import imageSix from "@/asset/slider/6.jpg";
import imageSeven from "@/asset/slider/7.jpg";
import imageEight from "@/asset/slider/8.jpg";
import imageNine from "@/asset/slider/9.jpg";
import Image from "next/image";

const contentStyle: React.CSSProperties = {
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ImageSlider = () => {
  const imageList = [
    imageOne,
    imageTwo,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    imageEight,
    imageNine,
    imageTen,
    imageEleven,
    imageTwelve,
    imageThirteen,
    imageFourteen,
    imageFifteen,
  ];

  // generate random number 0 to 15
  const randomNumber = Math.floor(Math.random() * 13);
  const randomNumber2 = Math.floor(Math.random() * 13);

  return (
    <Carousel autoplay arrows effect="fade">
      {/* randomly take four images from the list of images */}
      {[randomNumber, randomNumber2, randomNumber + 1, randomNumber2 + 1].map(
        (index) => (
          <div className=" h-full lg:h-[500px] w-full rounded-md" key={index}>
            {/* green overlay */}

            <div className="absolute top-0 left-0 w-full h-full bg-drd-dark-green  opacity-5"></div>
            <Image
              src={imageList[index]}
              alt="imageOne"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        )
      )}
    </Carousel>
  );
};

export default ImageSlider;
