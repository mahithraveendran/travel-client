import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { appTags } from "./tag";

// Create a baseQuery with the baseUrl and credentials
const baseQuery = fetchBaseQuery({
  baseUrl: `${
    config.apiUrl || "https://server-dream-destinations.vercel.app/api"
  }`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryModifiedForValidationError: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  console.log({ result });

  if (result?.error?.status === 404) {
    toast.error(
      (result.error.data as { errorMessage?: string })?.errorMessage ||
        (result.error.data as { message?: string })?.message ||
        "Resource not found"
    );
  } else if (result?.error?.status === 401) {
    toast.error(
      (result.error.data as { errorMessage?: string })?.errorMessage ||
        (result.error.data as { message?: string })?.message ||
        "Unauthorized"
    );
  } else if (result?.error?.status === 400) {
    toast.error(
      (result.error.data as { errorMessage?: string })?.errorMessage ||
        (result.error.data as { message?: string })?.message ||
        "Bad request"
    );
  }

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryModifiedForValidationError,
  endpoints: () => ({}),
  tagTypes: appTags,
});

export default baseApi;
