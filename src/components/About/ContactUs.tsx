"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import DrdForm from "../Form/DrDForm";
import DrdInput from "../Form/DrdInput";
import DrdTextArea from "../Form/DrdTextArea";
import RootContainer from "../shared/RootContainer";

// form validation schema
const contactUsSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  message: z.string({
    required_error: "Message is required",
  }),
});

const ContactUs = () => {
  const handleContactUs = (data: FieldValues) => {
    console.log(data);
    toast.success(`Your message has been sent successfully`);
  };

  return (
    <div className="pb-16">
      <RootContainer>
        <div className="flex flex-col gap-24 lg:flex-row justify-evenly items-center">
          <div className="w-full">
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_hokifDNfXn.json"
              className="h-[200px]"
            ></Player>
            <div>
              <div className="flex items-center">
                <Player
                  autoplay
                  loop
                  src={
                    "https://assets10.lottiefiles.com/packages/lf20_ebqz3ltq.json"
                  }
                  className="h-20 lg:h-28"
                ></Player>
                <p className="flex flex-col text-xl font-bold font-edu-baloo">
                  <span className="text-sm">Email:</span>
                  support@dream.com
                </p>
              </div>
              <div className="flex items-center">
                <Player
                  autoplay
                  loop
                  src={
                    "https://assets5.lottiefiles.com/packages/lf20_wmsbdykq.json"
                  }
                  className="h-20 lg:h-28"
                ></Player>
                <p className="flex flex-col text-xl font-bold font-edu-baloo">
                  <span className="text-sm">Phone:</span>
                  +880 1771909060
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-drd-light-green p-10 rounded-md">
            <h1 className="text-3xl font-bold text-center">Send Your dream</h1>
            <DrdForm
              onSubmit={handleContactUs}
              resolver={zodResolver(contactUsSchema)}
            >
              <DrdInput
                label="Name"
                placeholder="Enter your name"
                name="name"
                type="text"
                required
              />
              <DrdInput
                label="Email"
                placeholder="Enter your email"
                name="email"
                type="email"
                required
              />
              <DrdTextArea
                label="Message"
                placeholder="Enter your message"
                name="message"
                required
              />
              <Button type="primary" htmlType="submit" block size="large">
                Send Dream{" "}
              </Button>
            </DrdForm>
          </div>
        </div>
      </RootContainer>
    </div>
  );
};

export default ContactUs;
