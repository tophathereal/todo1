import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj, availableCategories }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.category || '');
    }, [taskObj]);

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {
            ...taskObj,
            Name: taskName,
            Description: description,
            category: category
        };
        updateTask(tempObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className="form-group">
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            value={taskName}
                            onChange={handleChange}
                            name="taskName"
                            margin="dense"
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            value={description}
                            onChange={handleChange}
                            name="description"
                            margin="dense"
                        />
                    </div>
                    <div className="form-group">
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                onChange={handleChange}
                                name="category"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {availableCategories.map((cat, index) => (
                                    <MenuItem key={index} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;

