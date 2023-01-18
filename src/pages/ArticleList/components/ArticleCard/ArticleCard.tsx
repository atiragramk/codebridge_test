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

import moment from "moment";
import { Article } from "../../../../types";

import "./style.scss";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const date = moment(article.publishedAt).format("MMMM Do, YYYY");
  const shortDescription =
    article.summary.length > 100
      ? `${article.summary.slice(0, 100)}...`
      : article.summary;

  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={article.imageUrl}
          alt=""
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
          <Typography className="card__title" variant="h6">
            {article.title}
          </Typography>
          <Typography variant="body1">{shortDescription}</Typography>
        </CardContent>
      </CardActionArea>
      <Button size="small" className="card__button">
        Read more
        <ArrowRightAltIcon fontSize="small" />
      </Button>
    </Card>
  );
};
