import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { articleListStateSelector } from "./selectors/articleList";
import { articleListFetch } from "./thunk/articleList";
import { ArticleCard } from "./components/ArticleCard";

import "./style.scss";

const ArticleList = () => {
  const { data, loading, error } = useSelector(articleListStateSelector);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(articleListFetch());
  }, []);

  const str = "";
  console.log(str.split(" "));

  const search = [""];

  console.log(search.join(" "));

  const filtered = data.filter((article) =>
    search.some(
      (str) =>
        article.title.includes(str) ||
        article.summary.slice(0, 100).includes(str)
    )
  );
  console.log(filtered);
  return (
    <Container maxWidth="lg">
      <Box className="list__search">
        <Typography className="list__search__text" marginTop={2}>
          Filter by keywords
        </Typography>
        <TextField
          placeholder="Search article"
          size="small"
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
          Results: {filtered.length}
        </Typography>
      </Box>
      <Box className="list__card-container">
        {filtered.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </Box>
    </Container>
  );
};

export default ArticleList;
