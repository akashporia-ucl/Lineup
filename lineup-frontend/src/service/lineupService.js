import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

class LineupService {
    listToDo = async () => {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error("Error occured while fetching to-do list: ", error);
            throw error;
        }
    };

    addToDo = async (todo) => {
        try {
            const response = await axios.post(`${API_URL}`, null, {
                params: {
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error occured while adding to-do: ", error);
            throw error;
        }
    };

    deleteToDo = async (id) => {
        try {
            console.log(`${API_URL}/${id}`);
            const response = await axios.delete(`${API_URL}${id}`);
            return response.data;
        } catch (error) {
            console.error("Error occured while deleting to-do: ", error);
            throw error;
        }
    };

    updateToDo = async (todo) => {
        try {
            const response = await axios.put(`${API_URL}/${todo.id}`, todo);
            return response.data;
        } catch (error) {
            console.error("Error occured while updating to-do: ", error);
            throw error;
        }
    };
}

const lineupService = new LineupService();

export default lineupService;
