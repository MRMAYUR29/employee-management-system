import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  total: 0,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const {
  setEmployees,
  setLoading,
  setError,
  setTotal,
} = employeeSlice.actions;

export default employeeSlice.reducer;