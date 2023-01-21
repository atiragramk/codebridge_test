import { createSlice } from "@reduxjs/toolkit";

import { Article } from "../../../types";
import { articleListFetch } from "../thunk/articleList";
import { articleListKeywordsSet } from "../actions/articleList";

export type ArticleListState = {
  loading: boolean;
  error: boolean | null;
  data: Article[] | [];
  keywords: string;
};

export const initialState: ArticleListState = {
  loading: true,
  error: null,
  data: [],
  keywords: "",
};

const name = "ARTICLE_LIST";

const articleListSlice = createSlice({
  name,
  initialState,
  reducers: { articleListKeywordsSet },
  extraReducers(builder) {
    builder.addCase(articleListFetch.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(articleListFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload!;
    });
    builder.addCase(articleListFetch.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { articleListKeywordsSet: articleListKeywordsSetAction } =
  articleListSlice.actions;

export default articleListSlice.reducer;
