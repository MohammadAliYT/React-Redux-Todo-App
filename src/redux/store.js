import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

//this allows us to connect our store to our App
export default configureStore({
  reducer: {
    //todos is just a name
    //our store holds all the reducers and manage them for us
    todos: todoReducer,
  },
});
