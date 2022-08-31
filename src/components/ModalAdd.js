import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import { showModalAdd } from "../redux/slices/modals";
import { addEmployeeAction } from "../redux/slices/employees";
import { addClientAction } from "../redux/slices/client";
import { addOrderAction } from "../redux/slices/order";
import { addEvent } from "../redux/slices/calendar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function ModalAdd({ fields, entityName, propsValues, onAddedSuccessfully }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modals.showModalAdd);

  const [values, setValues] = useState({});

  useEffect(() => {
    const newValues = { ...values };
    if (fields && fields.length) {
      fields.forEach((field) => {
        newValues[field] = "";
      });
    }
    if (propsValues) {
      Object.keys(propsValues).map((key) => { //eslint-disable-line
        newValues[key] = propsValues[key];
      });
    }
    setValues(newValues);
  }, [fields, propsValues]); //eslint-disable-line

  const handleClose = () => {
    dispatch(showModalAdd({ showModalAdd: false }));
  };

  const onChange = (event, field) => {
    const newValues = { ...values };
    newValues[field] = event.target.value;
    setValues(newValues);
  };

  const onAddClick = () => {
    if (entityName === "employee") dispatch(addEmployeeAction(values));
    else if (entityName === "event") {
      dispatch(addEvent(values));
    } else if (entityName === "client") {
      dispatch(addClientAction(values));
    } else if (entityName === "order") {
      dispatch(addOrderAction(values));
    }
    //else if pentru fiecare entitate care foloseste modalul

    handleClose();
    if (onAddedSuccessfully) onAddedSuccessfully();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              Add {entityName}
            </Typography>
            {fields && (
              <Box display="flex" flexDirection="column">
                {fields.map((field, index) => {
                  return (
                    <TextField
                      key={"field" + index}
                      id={"add" + field}
                      label={field}
                      variant="standard"
                      style={{ marginBottom: 20 }}
                      onChange={(event) => onChange(event, field)}
                    />
                  );
                })}
              </Box>
            )}
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={onAddClick}>
                Add
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
