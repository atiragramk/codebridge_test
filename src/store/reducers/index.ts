import { combineReducers } from "@reduxjs/toolkit";

import articleList from "../../pages/ArticleList/reducer/articleList";
import articleListItem from "../../pages/ArticleListItem/reducer/articleListItem";

export default combineReducers({
  articleList,
  articleListItem,
});
