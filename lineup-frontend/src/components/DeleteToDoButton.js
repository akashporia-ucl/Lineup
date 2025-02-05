import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../context/ThemeContext";

const DeleteToDoButton = ({ id, callHandleDeleteAPI }) => {
    const { theme } = useTheme();

    const handleDelete = () => {
        console.log("Delete button clicked for ", id);
        callHandleDeleteAPI(id);
    };

    return (
        <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon
                style={{ color: theme === "light" ? "#5e17eb" : "#fff" }}
            />
        </IconButton>
    );
};

export default DeleteToDoButton;
