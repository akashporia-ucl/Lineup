import AddToDo from "./AddToDo";
import ToDoCard from "./ToDoCard";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import "./Home.css";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
    const [toDoList, setToDoList] = useState([]);
    const { theme } = useTheme();

    return (
        <div className="box-container">
            <Typography
                variant="h1"
                className={theme === "light" ? "lightWelcome" : "darkWelcome"}
                align="center"
                style={{ fontWeight: "bold" }}
            >
                Welcome to Line
                <span id="up">Up!</span>
            </Typography>
            <div className="container">
                <div>
                    <AddToDo toDoList={toDoList} setToDoList={setToDoList} />
                </div>
                <div className="cards">
                    <ToDoCard toDoList={toDoList} setToDoList={setToDoList} />
                </div>
            </div>
        </div>
    );
};

export default Home;
