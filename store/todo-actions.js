import { createAsyncThunk } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

export const sendTodo = createAsyncThunk(
  "addTodo",
  async (todoDetails, { dispatch }) => {
    try {
      const response = await fetch("/api/new-todo", {
        method: "POST",
        body: JSON.stringify(todoDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message || "Error sending Todo... Please try again !",
        })
      );
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "getTodos",
  async (req, { dispatch }) => {
    try {
      const response = await fetch("/api/fetch-todos", { method: "GET" });

      const data = await response.json();
      const { items } = data;
      let todoItems;

      if (!items) {
        todoItems = [];
      } else {
        todoItems = items.map((item) => {
          return {
            id: item._id.toString(),
            status: item.status,
            title: item.title,
          };
        });
      }

      return todoItems;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message || "Error fetching Todo... Please try again !",
        })
      );
    }
  }
);

export const updateTodo = createAsyncThunk(
  "editTodo",
  async (todoDetails, { dispatch }) => {
    try {
      const response = await fetch("/api/update-todo", {
        method: "PUT",
        body: JSON.stringify(todoDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message || "Error updating Todo... Please try again !",
        })
      );
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (deleteItem, { dispatch }) => {
    try {
      const response = await fetch("/api/delete-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteItem),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message || "Error deleting Todo... Please try again !",
        })
      );
    }
  }
);
