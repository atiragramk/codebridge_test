import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import planet from "../../assets/img/404.gif";

import "./styles.scss";

const Page404 = () => {
  return (
    <Container className="container" maxWidth="xl">
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography variant="h1">4</Typography>
        <img className="container__image" src={planet} alt="planet" />
        <Typography variant="h1">4</Typography>
      </Stack>
      <Typography variant="h5">You're lost in a deep space. </Typography>
      <Button
        className="container__button"
        variant="contained"
        to="/"
        color="secondary"
        component={Link}
      >
        Let's go back
      </Button>
    </Container>
  );
};

export default Page404;
