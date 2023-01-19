import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AppDispatch } from "../../store";
import { articleListStateSelector } from "./selectors/articleList";
import { articleListFetch } from "./thunk/articleList";
import { ArticleCard } from "./components/ArticleCard";

import { articleListKeywordsSetAction } from "./reducer/articleList";
import { Article } from "../../types";

import "./style.scss";

const ArticleList = () => {
  const { data, loading, error, keywords } = useSelector(
    articleListStateSelector
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(articleListFetch());
  }, [dispatch]);

  const handleFilterChange = (value: string) => {
    dispatch(articleListKeywordsSetAction(value));
  };

  const handleFilterArticles = (
    keywords: string[],
    articles: Article[]
  ): Article[] => {
    const filtered = articles.filter(({ title, summary }) =>
      keywords.some(
        (keyword) =>
          title.toLowerCase().includes(keyword) ||
          summary.slice(0, 100).toLowerCase().includes(keyword)
      )
    );
    return filtered.sort((a, b) => {
      return (
        filtered.findIndex(() =>
          keywords.some((str) => b.title.includes(str))
        ) -
        filtered.findIndex(() => keywords.some((str) => a.title.includes(str)))
      );
    });
  };
  const filteredArticles = handleFilterArticles(keywords, data);

  return (
    <Container maxWidth="lg">
      <Box className="list__search">
        <Typography className="list__search__text" marginTop={2}>
          Filter by keywords
        </Typography>
        <TextField
          placeholder="Search article"
          size="small"
          value={keywords.join(" ")}
          onChange={(event) => handleFilterChange(event.target.value)}
          className="list__search__bar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography className="list__search__text">
          Results: {filteredArticles.length}
        </Typography>
      </Box>
      <Box className="list__card-container">
        {filteredArticles.map((article) => {
          return (
            <ArticleCard
              keywords={keywords}
              key={article.id}
              article={article}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default ArticleList;
