import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles, getArticle } from "../../../api/article";

const ARTICLE_LIST_FETCH_THUNK_TYPE = "ARTICLE_LIST_FETCH_THUNK_TYPE";

export const articleListFetch = createAsyncThunk(
  ARTICLE_LIST_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllArticles();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const ARTICLE_LIST_ITEM_FETCH_THUNK_TYPE = "ARTICLE_LIST_ITEM_FETCH_THUNK_TYPE";

export const articleListItemFetch = createAsyncThunk(
  ARTICLE_LIST_ITEM_FETCH_THUNK_TYPE,
  async (id: number, { rejectWithValue }) => {
    try {
      return await getArticle(id);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
