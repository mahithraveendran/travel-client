import { userPaginationPerPage } from "@/constant/paginationControl";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

const initialState = {
  page: 1,
  limit: userPaginationPerPage,
};

const usersManagementSlice = createSlice({
  name: "usersManagement",
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

export const { setPage, setLimit } = usersManagementSlice.actions;

// select user management pagination
export const selectUserManagementPagination = (state: RootState) =>
  state.userManagement;

const usersManagementReducer = usersManagementSlice.reducer;

export default usersManagementReducer;
