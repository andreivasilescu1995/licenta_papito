import axios from "axios";
import { endpoint } from "../constants";

export const updateEmployee = (employee) => {
  const jwt = localStorage.getItem("jwt");
  axios.put(
    endpoint + "/employees/" + employee.id,
    {
      data: employee,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
      },
    }
  );
};

export const updateClient = (client) => {
  const jwt = localStorage.getItem("jwt");
  axios.put(
    endpoint + "/clients/" + client.id,
    {
      data: client,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
      },
    }
  );
};

export const updateOrder = (order) => {
  const jwt = localStorage.getItem("jwt");
  axios.put(
    endpoint + "/orders/" + order.id,
    {
      data: order,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt.replace(/["]/g, "")}`,
      },
    }
  );
};
