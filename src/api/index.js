import axios from "axios";
import { endpoint } from "../constants";

export const updateEmployee = (employee) => {
    const jwt = localStorage.getItem('jwt');
    axios.put(endpoint + '/employees/' + employee.id,
        {
            data: employee
        },
        {
            headers: {
                Authorization: `Bearer ${jwt.replace(/["]/g, "")}`
            }
        });
}