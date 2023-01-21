import { createSlice } from "@reduxjs/toolkit";

import { Article } from "../../../types";
import { articleListItemFetch } from "../thunk/articleListItem";

export type ArticleListItemState = {
  loading: boolean;
  error: boolean | null;
  data: Article | null;
};

export const initialState: ArticleListItemState = {
  loading: true,
  error: null,
  data: null,
};

const name = "ARTICLE_LIST_ITEM";

const articleListItemSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(articleListItemFetch.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(articleListItemFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload!;
    });
    builder.addCase(articleListItemFetch.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default articleListItemSlice.reducer;
