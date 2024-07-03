import { TravelType } from "@/types";
import dayjs from "dayjs";
import { z } from "zod";

export const registerValidationSchema = z
  .object({
    userName: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password should be same",
    path: ["confirmPassword"],
  });

export const requestValidationSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    comment: z
      .string({
        required_error: "Comment is required at least 10 characters",
      })
      .min(10),
    agree: z.boolean({
      required_error: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.agree === true, {
    message: "You must agree to the terms and conditions",
    path: ["agree"],
  });

// post travel validation schema
export const postTravelSchema = z
  .object({
    destination: z.string().min(1, "Destination is required"),
    type: z.nativeEnum(TravelType),
    budget: z.string().min(1, "Budget must be greater than zero"),
    description: z.string().min(1, "Description is required"),
    startDate: z.preprocess(
      (arg) => {
        if (dayjs.isDayjs(arg)) return arg.toDate();
      },
      z.date({
        required_error: "Start date is required",
      })
    ),
    endDate: z.preprocess(
      (arg) => {
        if (dayjs.isDayjs(arg)) return arg.toDate();
      },
      z.date({
        required_error: "End date is required",
      })
    ),
    activities: z
      .array(z.string().min(1, "Activity cannot be empty"))
      .nonempty({
        message: "At least one activity is required",
      }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End date should be greater than or equal to start date",
    path: ["endDate"],
  });

// update travel validation schema
export const updateTravelSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  type: z.nativeEnum(TravelType),
  budget: z.string().min(1, "Budget must be greater than zero"),
  description: z.string().min(1, "Description is required"),
  startDate: z.preprocess(
    (arg) => {
      if (dayjs.isDayjs(arg)) return arg.toDate();
    },
    z.date({
      required_error: "Start date is required",
    })
  ),
  endDate: z.preprocess(
    (arg) => {
      if (dayjs.isDayjs(arg)) return arg.toDate();
    },
    z.date({
      required_error: "End date is required",
    })
  ),
  activities: z.array(z.string().min(1, "Activity cannot be empty")).nonempty({
    message: "At least one activity is required",
  }),
});
