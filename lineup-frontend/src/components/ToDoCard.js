import React, { useEffect, useState } from "react";
import DeleteToDoButton from "./DeleteToDoButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import useLineupService from "../service/lineupService";
import Skeleton from "@mui/material/Skeleton";

const ToDoCard = ({ toDoList, setToDoList }) => {
    const lineupService = useLineupService();

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    // Track checkbox states for each item
    const [checkedItems, setCheckedItems] = useState({});

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
        setCheckedItems({
            ...checkedItems,
            [itemId]: event.target.checked,
        });
    };

    if (!lineupService) {
        // Fallback in case lineupService is not ready
        return <Skeleton variant="rectangular" width={210} height={60} />;
    }

    return (
        <Box>
            {toDoList.map((item) => (
                <Card
                    key={item.id}
                    style={{
                        marginBottom: "10px",
                        maxHeight: "130px",
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
                                color="text.secondary"
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
                            style={{ color: "#000" }}
                        />
                        <DeleteToDoButton
                            style={{ color: "#000" }}
                            callHandleDeleteAPI={callHandleDeleteAPI}
                            id={item.id}
                        />
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default ToDoCard;
