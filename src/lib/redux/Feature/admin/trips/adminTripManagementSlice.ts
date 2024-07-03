import { adminPaginationPerPage } from "@/constant/paginationControl";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

const initialState = {
  page: 1,
  limit: adminPaginationPerPage,
};

const adminTripManagementSlice = createSlice({
  name: "adminTripManagement",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setLimit } = adminTripManagementSlice.actions;

// select user management pagination
export const selectTripManagementPagination = (state: RootState) =>
  state.adminTripManagement;

const adminTripManagementReducer = adminTripManagementSlice.reducer;

export default adminTripManagementReducer;
