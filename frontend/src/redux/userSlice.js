import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstname: "",
  image: "",
  lastname: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginReadux: (state, action) => {
      console.log(action.payload.data);
      //state.user = action.payload.data;
      state._id = action.payload.data._id;
      state.firstname = action.payload.data.firstname;
      state.lastname = action.payload.data.lastname;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
    },
    logoutRedux: (state, action) => {
      state._id = " ";
      state.firstname = " ";
      state.lastname = " ";
      state.email = " ";
      state.image = " ";
    },
  },
});

export const { loginReadux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
