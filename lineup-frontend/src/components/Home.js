import AddToDo from "./AddToDo";
import ToDoCard from "./ToDoCard";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";

// Import the external CSS file
import "./Home.css";

const Home = () => {
    const [toDoList, setToDoList] = useState([]);

    return (
        <div className="box-container">
            <div className="container">
                <Typography variant="h1" className="heading">
                    Welcome to LineUp!
                </Typography>
                <div>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        className="paragraph-text"
                    >
                        LineUp is a simple to-do list application built with
                        React and Material UI for the frontend. The backend is
                        powered by Firebase for real-time database management
                        and Spring Boot (Java) for handling API logic and
                        server-side operations. Users can add, delete, and view
                        their to-do list items with seamless integration between
                        the frontend and backend.
                    </Typography>
                </div>
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
