import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  LinearProgress,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { AppDispatch } from "../../store";
import { articleListItemFetch } from "./thunk/articleListItem";
import { articleListItemStateSelector } from "./selectors/articleListItem";

import "./style.scss";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { ErrorMessage } from "../../components/ErrorMessage";

const ArticleListItem = () => {
  const { data, loading, error } = useSelector(articleListItemStateSelector);
  const { articleId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(articleListItemFetch(Number(articleId)));
  }, [articleId, dispatch]);

  return (
    <ErrorBoundary>
      {loading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      {!loading && data && (
        <>
          <Container className="article__container" maxWidth="lg">
            <img
              className="article__image"
              src={data?.imageUrl}
              alt={data?.title}
            />
            <Paper className="article__content">
              <Typography className="article__content-title">
                {data?.title}
              </Typography>
              <Typography>{data?.summary}</Typography>
              <Button
                startIcon={<KeyboardBackspaceIcon fontSize="small" />}
                className="article__content-button"
                component={Link}
                to="/"
              >
                Back to homepage
              </Button>
            </Paper>
          </Container>
        </>
      )}
      {error && !loading && <ErrorMessage />}
    </ErrorBoundary>
  );
};

export default ArticleListItem;
