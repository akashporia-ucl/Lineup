import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "../context/ThemeContext";
import Grid from "@mui/material/Grid";
import "./Welcome.css";

const Welcome = () => {
    const { theme } = useTheme();
    return (
        <Container fixed>
            <Typography
                variant="h1"
                className={theme === "light" ? "lightWelcome" : "darkWelcome"}
                align="center"
                style={{ fontWeight: "bold" }}
            >
                Welcome to Line
                <span id="up">Up!</span>
            </Typography>
            <hr
                style={{
                    margin: "20px 0",
                    borderColor: theme === "light" ? "#5e17eb" : "#fff",
                    borderWidth: "2px",
                }}
            />
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        className="paragraph-text"
                        align="center"
                        style={{
                            fontSize: "1.2rem",
                        }}
                    >
                        LineUp is a simple to-do list application built with
                        React and Material UI for the frontend. The backend is
                        powered by Firebase for real-time database management
                        and Spring Boot (Java) for handling API logic and
                        server-side operations. Users can add, delete, and view
                        their to-do list items with seamless integration between
                        the frontend and backend.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {theme === "light" ? (
                        <img
                            src="/LightBanner.png"
                            alt="Light theme"
                            style={{ width: "100%" }}
                        />
                    ) : (
                        <img
                            src="/DarkBanner.png"
                            alt="Dark theme"
                            style={{ width: "100%" }}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Welcome;
