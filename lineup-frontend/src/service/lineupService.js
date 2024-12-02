import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/v1";

const useUserId = () => {
    const { userId } = useAuth();
    return userId;
};

class LineupService {
    constructor(userId) {
        this.currentUser = userId;
    }

    listToDo = async () => {
        try {
            const response = await axios.get(`${API_URL}/${this.currentUser}`);
            return response.data;
        } catch (error) {
            console.error("Error occured while fetching to-do list: ", error);
            throw error;
        }
    };

    addToDo = async (todo) => {
        try {
            const response = await axios.post(
                `${API_URL}/${this.currentUser}`,
                null,
                {
                    params: {
                        toDoId: todo.id,
                        title: todo.title,
                        description: todo.description,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error occured while adding to-do: ", error);
            throw error;
        }
    };

    deleteToDo = async (id) => {
        try {
            console.log(`${API_URL}/${this.currentUser}/${id}`);
            const response = await axios.delete(
                `${API_URL}/${this.currentUser}/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Error occured while deleting to-do: ", error);
            throw error;
        }
    };

    updateToDo = async (todo) => {
        try {
            const response = await axios.put(
                `${API_URL}$/{this.currentUser}/${todo.id}`,
                todo
            );
            return response.data;
        } catch (error) {
            console.error("Error occured while updating to-do: ", error);
            throw error;
        }
    };
}

const useLineupService = () => {
    const userId = useUserId();
    const [lineupService, setLineupService] = useState(null);

    useEffect(() => {
        if (userId) {
            setLineupService(new LineupService(userId));
        }
    }, [userId]);

    return lineupService;
};

export default useLineupService;
