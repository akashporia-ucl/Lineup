import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const DeleteToDoButton = ({ id, callHandleDeleteAPI }) => {
    const handleDelete = () => {
        console.log("Delete button clicked for ", id);
        callHandleDeleteAPI(id);
    };

    return (
        <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon style={{ color: "black" }} />
        </IconButton>
    );
};

export default DeleteToDoButton;
