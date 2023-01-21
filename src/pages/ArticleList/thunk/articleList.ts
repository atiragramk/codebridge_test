import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles } from "../../../api/article";

const ARTICLE_LIST_FETCH_THUNK_TYPE = "ARTICLE_LIST_FETCH_THUNK_TYPE";

export const articleListFetch = createAsyncThunk(
  ARTICLE_LIST_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllArticles();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
