import { travelPaginationPerPage } from "@/constant/paginationControl";
import { createSlice } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";
import { RootState } from "../../store";

interface IInitialState {
  destination: string;
  startDates: Date | string | null | Dayjs;
  endDates: string;
  searchTerm: string;
  limit: number;
  page: number;
  type: string | null;
  sortBy: string;
}

const initialState: IInitialState = {
  destination: "",
  // startDates: new Date(),
  startDates: "",
  endDates: "",
  searchTerm: "",
  limit: travelPaginationPerPage,
  page: 1,
  type: null,
  sortBy: "destination",
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
      state.page = 1;
    },
    setStartDates: (state, action) => {
      state.startDates = action.payload;
      state.page = 1;
    },
    setEndDates: (state, action) => {
      state.endDates = action.payload;
      state.page = 1;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = "destination";
      state.page = 1;
    },
    resetTripQueries: (state) => {
      state.destination = "";
      state.startDates = "";
      state.endDates = "";
      state.searchTerm = "";
      state.limit = travelPaginationPerPage;
      state.page = 1;
      state.type = null;
      state.sortBy = "destination";
    },
  },
});

export const {
  setDestination,
  setStartDates,
  setEndDates,
  setSearchTerm,
  setLimit,
  setPage,
  setType,
  setSortBy,
  resetTripQueries,
} = tripSlice.actions;

const tripReducer = tripSlice.reducer;

export default tripReducer;

// select destination, startDates, endDates, searchTerm, limit, page, type
export const selectDestination = (state: RootState) => state.trip.destination;
export const selectStartDates = (state: RootState) => state.trip.startDates;
export const selectEndDates = (state: RootState) => state.trip.endDates;
export const selectSearchTerm = (state: RootState) => state.trip.searchTerm;
export const selectLimit = (state: RootState) => state.trip.limit;
export const selectPage = (state: RootState) => state.trip.page;
export const selectType = (state: RootState) => state.trip.type;

// select trip
export const selectTripQueries = (state: RootState) => state.trip;
