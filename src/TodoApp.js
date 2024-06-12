// ~src/TodoApp.js

import React, { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import db from "./firebase";
import {
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    ListItemSecondaryAction,
    Container,
} from "@material-ui/core";
import {
    AddCircleOutlineRounded,
    Edit,
    DeleteOutlineRounded,
} from "@material-ui/icons";


function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState("");
    const [toUpdateId, setToUpdateId] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
            const todos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(todos);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "todos"), {
            title: newTodo,
            complete: false,
        });
        setNewTodo("");
    };

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };

    const openUpdateDialog = (id, title) => {
        setOpen(true);
        setToUpdateId(id);
        setUpdate(title);
    };

    const updateTodo = async () => {
        await updateDoc(doc(db, "todos", toUpdateId), {
            title: update,
        });
        setOpen(false);
    };

    return (
        <Container maxWidth="sm" className="app-wrapper">
            <h3>React Firbase Todo App with Material UI - FreakyJolly</h3>
            <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="todo"
                    label="Enter Todo"
                    name="todo"
                    autoFocus
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={addTodo}
                    disabled={!newTodo}
                    startIcon={<AddCircleOutlineRounded />}
                >
                    Add Todo
                </Button>
            </form>

            <List dense={true}>
                {todos.map((todo, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={todo.title} />

                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="Edit"
                                onClick={() => openUpdateDialog(todo.id, todo.title)}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                <DeleteOutlineRounded />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Update Todo"
                        fullWidth
                        value={update}
                        onChange={(e) => setUpdate(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateTodo} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default TodoApp;