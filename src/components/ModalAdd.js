import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { showModalAdd } from '../redux/slices/modals';
import { addEmployeeAction } from '../redux/slices/employees';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export default function ModalAdd({ fields, entityName, refreshTable }) {
    const dispatch = useDispatch();
    const open = useSelector(state => state.modals.showModalAdd);

    const [values, setValues] = useState({});

    useEffect(() => {
        if (fields && fields.length) {
            const newValues = {};
            fields.forEach(field => {
                newValues[field] = ''
            });
            setValues(newValues);
        }
    }, [fields]);

    const handleClose = () => {
        dispatch(showModalAdd({ showModalAdd: false }));
    };

    const onChange = (event, field) => {
        const newValues = { ...values };
        newValues[field] = event.target.value;
        setValues(newValues);
    }

    const onAddClick = () => {
        if (entityName === 'employee')
            dispatch(addEmployeeAction(values));
        //else if pentru fiecare entitate care se adauga

        handleClose();
        refreshTable();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                            Add {entityName}
                        </Typography>
                        {fields &&
                            <Box display="flex" flexDirection="column">
                                {fields.map(field => {
                                    return (
                                        <TextField
                                            id={"add" + field}
                                            label={field}
                                            variant="standard"
                                            style={{ marginBottom: 20 }}
                                            onChange={(event) => onChange(event, field)}
                                        />
                                    )
                                })}
                            </Box>
                        }
                        <Box display="flex" flexDirection="row" justifyContent="flex-end">
                            <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={onAddClick}>Add</Button>
                            <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
