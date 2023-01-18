import { createSlice } from "@reduxjs/toolkit";

import { Article } from "../../../types";
import { articleListFetch } from "../thunk/articleList";

export type ArticleListState = {
  loading: boolean;
  error: boolean | null;
  data: Article[] | [];
};

export const initialState: ArticleListState = {
  loading: true,
  error: null,
  data: [],
};

const name = "ARTICLE_LIST";

const articleListSlice = createSlice({
  name,
  initialState,
  reducers: {},
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

export default articleListSlice.reducer;
