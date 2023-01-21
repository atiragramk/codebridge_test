import { RootState } from "../../../store";

export const articleListItemStateSelector = (state: RootState) =>
  state.articleListItem;
