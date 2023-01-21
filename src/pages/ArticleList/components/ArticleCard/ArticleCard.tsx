import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import Highlighter from "react-highlight-words";
import moment from "moment";

import { Article } from "../../../../types";

import "./style.scss";

type ArticleCardProps = {
  article: Article;
  keywords: string;
  onOpen: (id: number) => void;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  keywords,
  onOpen,
}) => {
  const date = moment(article.publishedAt).format("MMMM Do, YYYY");
  const shortDescription =
    article.summary.length > 100
      ? `${article.summary.slice(0, 100)}...`
      : article.summary;

  return (
    <Card className="card">
      <CardActionArea onClick={() => onOpen(article.id)}>
        <CardMedia
          component="img"
          height="180"
          image={article.imageUrl}
          alt={article.title}
        />
        <CardContent>
          <Box className="card__date-container">
            <DateRangeIcon
              className="card__date-container__icon"
              fontSize="small"
              color="secondary"
            />
            <Typography color="secondary" variant="subtitle2">
              {date}
            </Typography>
          </Box>
          <Box className="card__title">
            <Highlighter
              textToHighlight={article.title}
              searchWords={keywords.split(" ")}
              autoEscape={true}
            />
          </Box>
          <Box className="card__description">
            <Highlighter
              textToHighlight={shortDescription}
              searchWords={keywords.split(" ")}
            />
          </Box>
        </CardContent>
      </CardActionArea>
      <Button
        endIcon={<ArrowRightAltIcon fontSize="small" />}
        size="small"
        className="card__button"
        onClick={() => onOpen(article.id)}
      >
        Read more
      </Button>
    </Card>
  );
};
