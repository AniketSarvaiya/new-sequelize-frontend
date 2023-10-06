import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import PageNotFound from "../assets/404.png";
// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const handleClick = () => {
    // if (user) {
    //   console.log("------------", user?.isUser);
    //   if (user?.isUser === "admin") {
    //     console.log("++++++++++++++");
    //     navigate("/student");
    //   } else navigate("/home");
    // } else navigate("/");
  };
  return (
    <Container>
      {/* <h1> Page not found</h1> */}
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src={PageNotFound}
          sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
        />
        <Button
          size="large"
          variant="contained"
          onClick={handleClick}
          href={user ? (user?.isUser === "admin" ? "/student " : "/home") : "/"}
        >
          Go to Home
        </Button>
      </ContentStyle>
    </Container>
  );
}
