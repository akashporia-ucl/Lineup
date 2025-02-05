import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import "./AddToDo.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import useLineupService from "../service/lineupService";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const AddToDo = ({ toDoList, setToDoList }) => {
    const lineupService = useLineupService();
    const { theme } = useTheme();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const [showBackdrop, setShowBackdrop] = useState(false); // Controls Backdrop
    const [anchorEl, setAnchorEl] = useState(null); // Controls Popover
    const [formErrors, setFormErrors] = useState({
        title: false,
        description: false,
    });

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget); // Set anchor for Popover
        setShowBackdrop(true); // Show backdrop
    };

    const handleClose = () => {
        setAnchorEl(null); // Close Popover
        setShowBackdrop(false); // Hide Backdrop
    };

    const validateForm = () => {
        const errors = { title: false, description: false };
        if (!title) errors.title = true;
        if (!description) errors.description = true;
        setFormErrors(errors);
        return errors.title === false && errors.description === false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields before submitting
        if (!validateForm()) {
            return; // Prevent submission if form is invalid
        }

        try {
            const item = {
                id: crypto.randomUUID(),
                title: title,
                description: description,
            };

            const response = await lineupService.addToDo(item);
            console.log("Added to-do: ", response);
            setToDoList([...toDoList, item]);
            setTitle("");
            setDescription("");
            setError(false);
            handleClose(); // Close popover and backdrop after submission
        } catch (error) {
            console.error("Error occurred while adding to-do: ", error);
            setError(true);
        }
    };

    const open = Boolean(anchorEl); // Popover open state
    const id = open ? "simple-popover" : undefined;

    const { emailId, emailUser } = useAuth();
    console.log("Email user: ", emailId);

    if (error) {
        return (
            <Alert variant="filled" severity="error">
                Some error occurred while adding the to-do. Please try again.
            </Alert>
        );
    }

    return (
        <div className={theme === "light" ? "lightAddTodo" : "darkAddToDo"}>
            {/* Button to open Backdrop and Popover */}
            {emailUser && (
                <Typography variant="h6" gutterBottom>
                    Hello {emailId}! Add your to-dos here.
                </Typography>
            )}
            <Button
                id="add-todo-button"
                variant="outlined"
                onClick={handleOpen}
                className="add-todo-button"
                size="large"
                style={{
                    color: "#fff",
                    borderColor: "#fff",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    padding: "0.5rem 1rem",
                }}
            >
                Add a to-do
            </Button>

            {/* Backdrop */}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={showBackdrop}
                onClick={handleClose} // Close on clicking backdrop
                className="todo-backdrop"
            >
                {/* Popover */}
                <Popover
                    id={id}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "center", // Do not pass anchorEl here
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "center",
                    }}
                    PaperProps={{
                        className: "todo-popover",
                        style: {
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }, // Centering the popover
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent event from propagating to Backdrop
                >
                    <form
                        onSubmit={handleSubmit}
                        className="todo-form"
                        onClick={(e) => e.stopPropagation()} // Prevent form clicks from closing the popover
                    >
                        <Typography variant="h5" gutterBottom>
                            Add your to-do
                        </Typography>
                        <Box
                            sx={{
                                "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                multiline
                                value={title}
                                label="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the task title"
                                className="todo-input"
                                error={formErrors.title} // Show error state if invalid
                                helperText={
                                    formErrors.title ? "Title is required" : ""
                                }
                                InputLabelProps={{
                                    style: {
                                        color: "black", // Always black, even when focused or empty
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: "black", // Always black text color
                                    },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "black", // Set border color to black
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "black", // Keep border black on hover
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "black", // Keep border black when focused
                                        },
                                    },
                                }}
                            />

                            <TextField
                                required
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter the task description"
                                className="todo-input"
                                error={formErrors.description} // Show error state if invalid
                                helperText={
                                    formErrors.description
                                        ? "Description is required"
                                        : ""
                                }
                                InputLabelProps={{
                                    style: {
                                        color: "black", // Always black, even when focused or empty
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: "black", // Always black text color
                                    },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "black", // Set border color to black
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "black", // Keep border black on hover
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "black", // Keep border black when focused
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            className="todo-submit-button"
                            variant="contained"
                            size="large"
                            style={{
                                color: "#fff",
                                borderColor: "#000",
                                fontWeight: "bold",
                                marginTop: "5px",
                                backgroundColor: "#000",
                            }}
                        >
                            Add
                        </Button>
                    </form>
                </Popover>
            </Backdrop>
        </div>
    );
};

export default AddToDo;
