import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, sendTodo, deleteTodo, updateTodo } from "./todo-actions";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItems: [],
    noItemsFound: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendTodo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sendTodo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.noItemsFound = false;
      state.todoItems.push(payload.todo);
    });

    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (!payload.length) {
        state.noItemsFound = true;
      } else {
        state.noItemsFound = false;
        state.todoItems = payload;
      }
    });

    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const updateTodo = payload.todo;
      const toUpdate = state.todoItems.findIndex(
        (item) => item.id === updateTodo.id
      );
      if (updateTodo.status) {
        state.todoItems[toUpdate].status = updateTodo.status;
      } else {
        state.todoItems[toUpdate].title = updateTodo.title;
      }
    });

    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteTodo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.todoItems = state.todoItems.filter(
        (item) => item.id !== payload.id
      );
      if (state.todoItems.length === 0) {
        state.noItemsFound = true;
      } else {
        state.noItemsFound = false;
      }
    });
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
