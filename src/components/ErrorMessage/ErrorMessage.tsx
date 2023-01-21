import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import error from "../../assets/img/error.gif";

import "./style.scss";

export const ErrorMessage = () => {
  return (
    <Container className="error">
      <img src={error} alt="error" />
      <Button component={Link} variant="contained" to="/">
        Try again
      </Button>
    </Container>
  );
};
