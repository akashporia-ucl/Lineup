import React, { useEffect, useState } from "react";
import DeleteToDoButton from "./DeleteToDoButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import useLineupService from "../service/lineupService";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useTheme } from "../context/ThemeContext";
import "./ToDoCard.css";

const ToDoCard = ({ toDoList, setToDoList }) => {
    const lineupService = useLineupService();

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const { theme } = useTheme();

    // Track checkbox states for each item
    const [checkedItems, setCheckedItems] = useState(() => {
        // Retrieve the initial state from localStorage
        const savedState = localStorage.getItem("checkedItems");
        return savedState ? JSON.parse(savedState) : {};
    });

    const data = async () => {
        try {
            console.log("Fetching to-do list...");
            const response = await lineupService.listToDo();
            console.log("Fetched to-do list: ", response);
            setToDoList(response);
        } catch (error) {
            console.error("Error occurred while fetching to-do list: ", error);
        }
    };

    useEffect(() => {
        if (lineupService) {
            data();
        }
    }, [lineupService]);

    const callHandleDeleteAPI = async (id) => {
        try {
            setToDoList(toDoList.filter((item) => item.id !== id));
            const response = await lineupService.deleteToDo(id);
            console.log("Deleted to-do: ", response);
        } catch (error) {
            console.error("Error occurred while deleting to-do: ", error);
        }
    };

    const handleCheckboxChange = (event, itemId) => {
        console.log("Checkbox checked: ", event.target.checked);
        const updatedCheckedItems = {
            ...checkedItems,
            [itemId]: event.target.checked,
        };
        setCheckedItems(updatedCheckedItems);
        localStorage.setItem(
            "checkedItems",
            JSON.stringify(updatedCheckedItems)
        );
    };

    if (!lineupService) {
        // Fallback in case lineupService is not ready
        return <Skeleton variant="rectangular" width={210} height={60} />;
    }

    return (
        <Stack spacing={1}>
            {toDoList.map((item) => (
                <Card
                    className={theme === "light" ? "lightCard" : "darkCard"}
                    key={item.id}
                    style={{
                        maxHeight: "100px",
                        display: "flex",
                        flexDirection: "row", // Align the title/description and checkbox/delete horizontally
                        justifyContent: "space-between",
                    }}
                >
                    <CardContent
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Title and Description as one entity */}
                        <Box>
                            <Typography
                                variant="h5"
                                component="div"
                                className="cardHeading"
                                style={{
                                    textDecoration: checkedItems[item.id]
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                className="cardSubheading"
                                style={{
                                    textDecoration: checkedItems[item.id]
                                        ? "line-through"
                                        : "none",
                                    fontSize: "17px",
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Box>
                    </CardContent>

                    {/* Checkbox and Delete button as one entity */}
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            padding: "10px",
                        }}
                    >
                        <Checkbox
                            {...label}
                            checked={checkedItems[item.id] || false}
                            onChange={(event) =>
                                handleCheckboxChange(event, item.id)
                            }
                            className="cardIcon"
                        />
                        <DeleteToDoButton
                            callHandleDeleteAPI={callHandleDeleteAPI}
                            id={item.id}
                        />
                    </Box>
                </Card>
            ))}
        </Stack>
    );
};

export default ToDoCard;
