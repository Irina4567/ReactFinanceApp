import React, { useState, useEffect } from "react";
import { deleteDoc, doc, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container } from "@material-ui/core";
import { AddCircleOutlineRounded, Edit, DeleteOutlineRounded } from "@material-ui/icons";
import db from "./firebase";

const limitDocRef = doc(db, "financialLimit", "value");

function FinanceApp() {
    const [limit, setLimit] = useState("");
    const [newLimit, setNewLimit] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        onSnapshot(limitDocRef, (snapshot) => {
            if (snapshot.exists()) {
                setLimit(snapshot.data().value);
            }
        });
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        await (limit ? updateDoc : setDoc)(limitDocRef, { value: newLimit });
        setLimit(newLimit);
        setNewLimit("");
        setOpen(false);
    };

    const handleDelete = async () => {
        await deleteDoc(limitDocRef);
        setLimit("");
    };

    return (
        <Container maxWidth="sm">
            <h3>Finance Limit Management</h3>
            {!limit ? (
                <form onSubmit={handleSave}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Enter Financial Limit"
                        autoFocus
                        value={newLimit}
                        onChange={(e) => setNewLimit(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!newLimit}
                        startIcon={<AddCircleOutlineRounded />}
                    >
                        Add Limit
                    </Button>
                </form>
            ) : (
                <div>
                    <h4>Current Financial Limit: {limit}</h4>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)} startIcon={<Edit />}>
                        Edit Limit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete} startIcon={<DeleteOutlineRounded />}>
                        Delete Limit
                    </Button>
                </div>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Financial Limit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Update Limit"
                        fullWidth
                        value={newLimit}
                        onChange={(e) => setNewLimit(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default FinanceApp;
