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

const ArticleList = () => {
  const { data, loading, error } = useSelector(articleListStateSelector);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(articleListFetch());
  }, []);

  //   const search = ["startup", "rockets", "unclear"];

  //   const filtered = data.filter((article) =>
  //     search.some(
  //       (str) => article.title.includes(str) || article.summary.includes(str)
  //     )
  //   );
  //   console.log(filtered);
  return (
    <Container maxWidth="lg">
      <Typography marginTop={2}>Filter by keywords</Typography>
      <TextField
        placeholder="Search article"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Typography>Results</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((article) => {
          return (
            <Card sx={{ width: 350 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.imageUrl}
                  alt=""
                />
                <CardContent>
                  <Typography>{article.publishedAt}</Typography>
                  <Typography>{article.title}</Typography>
                  <Typography>{article.summary}</Typography>
                </CardContent>
              </CardActionArea>
              <Button>Read more</Button>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default ArticleList;
