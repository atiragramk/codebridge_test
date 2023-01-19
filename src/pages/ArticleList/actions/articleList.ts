import { PayloadAction } from "@reduxjs/toolkit";
import { ArticleListState } from "../reducer/articleList";

export const articleListKeywordsSet = (
  state: ArticleListState,
  action: PayloadAction<string>
) => {
  state.keywords = action.payload.split(" ");
};
