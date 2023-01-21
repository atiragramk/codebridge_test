import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { AppDispatch } from "../../store";
import { articleListStateSelector } from "./selectors/articleList";
import { articleListFetch } from "./thunk/articleList";
import { ArticleCard } from "./components/ArticleCard";
import { articleListKeywordsSetAction } from "./reducer/articleList";
import { Article, FilterArticles } from "../../types";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { ErrorMessage } from "../../components/ErrorMessage";
import "./style.scss";

const ArticleList = () => {
  const { data, loading, error, keywords } = useSelector(
    articleListStateSelector
  );
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(articleListFetch());
  }, [dispatch]);

  const handleFilterChange = (value: string) => {
    dispatch(articleListKeywordsSetAction(value));
  };

  const handleArticleOpen = (id: number) => {
    navigate(`/${id}`);
  };

  const handleMatchCheck = (keywords: string, str: string, key?: string) => {
    const keywordArr = keywords.split(" ");
    if (key === "title") {
      return keywordArr.some(
        (keyword) =>
          str.toLowerCase().includes(keyword.toLowerCase()) && keyword
      );
    } else {
      return keywordArr.some(
        (keyword) =>
          str.toLowerCase().slice(0, 100).includes(keyword.toLowerCase()) &&
          keyword
      );
    }
  };

  const handleFilterArticles = (
    keywords: string,
    articles: Article[]
  ): FilterArticles[] => {
    return articles.reduce((acc: FilterArticles[], currentValue) => {
      if (handleMatchCheck(keywords, currentValue.title, "title")) {
        acc = [...acc, { ...currentValue, weight: 2 }];
      } else if (
        handleMatchCheck(keywords, currentValue.summary) &&
        handleMatchCheck(keywords, currentValue.title, "title")
      ) {
        acc = [...acc, { ...currentValue, weight: 1 }];
      } else if (handleMatchCheck(keywords, currentValue.summary)) {
        acc = [...acc, { ...currentValue, weight: 0.5 }];
      }
      return acc;
    }, []);
  };

  const filteredArticles = handleFilterArticles(keywords, data).sort(
    (a, b) => b.weight - a.weight
  );

  const displayArticles = keywords ? filteredArticles : data;

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        {loading && (
          <Box>
            <LinearProgress />
          </Box>
        )}
        {!loading && data.length > 0 && (
          <>
            <Box className="list__search">
              <Typography className="list__search__text">
                Filter by keywords
              </Typography>
              <TextField
                placeholder="Search article"
                size="small"
                value={keywords}
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
                Results: {displayArticles.length}
              </Typography>
            </Box>
            <Box className="list__card-container">
              {displayArticles.map((article) => {
                return (
                  <ArticleCard
                    keywords={keywords}
                    key={article.id}
                    article={article}
                    onOpen={handleArticleOpen}
                  />
                );
              })}
            </Box>
          </>
        )}
        {error && !loading && <ErrorMessage />}
      </Container>
    </ErrorBoundary>
  );
};

export default ArticleList;
