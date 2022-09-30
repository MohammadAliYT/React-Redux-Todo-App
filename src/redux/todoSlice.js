import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const resp = await fetch("http://localhost:7000/todos");
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 1,
      title: "todo1",
      completed: true,
    },
    {
      id: 2,
      title: "todo2",
      completed: false,
    },
    {
      id: 3,
      title: "todo3",
      completed: false,
    },
  ],
  //reducer passes the current state and actions behind the scenes
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    extraReducers: {
      [getTodosAsync.pending]: (state, action) => {
        console.log("fetching data ...");
      },
      [getTodosAsync.fulfilled]: (state, action) => {
        console.log("fetched data succesfully ...");
        return action.payload.todos;
      },
      clearInput: (state, action) => {
        const clear = state.initialState.title === "";
        return { clear };
      },
    },
  },
});

//we have to add it to our store
export const { addTodo, toggleComplete, deleteTodo, clearInput } =
  todoSlice.actions;
export default todoSlice.reducer;
