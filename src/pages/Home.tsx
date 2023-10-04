import { Alert, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardCustomize from "../components/Card/Card";
import { IUser, ResponseStatus } from "../model";
import axios from "../plugin/api/axios";
import { Route } from "../routes/path";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialog from "../components/DeleteDialog";
import AlertCustom from "../components/AlertCustom";

const Home = () => {
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { userAxios } = axios;
    const navigate = useNavigate();

    const getUserData = async () => {
        const response = await userAxios.getUser();
        if (response.status === ResponseStatus.OK) {
            setUsers(response.data)
        }    
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const onClickUserRow = (id: string) => {
        setUserId(id);
        navigate(`${Route.update}/${id}`);
    }

    const handleOpenDialog = (id: string) => {
        setUserId(id);
        setOpenDialog(true);
    }
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const hanldeCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const deleteUser = async () => {
        const response = await userAxios.deleteUserByID(userId);
        if (response.status === ResponseStatus.OK) {
            await getUserData();
            setOpenSnackbar(true);
            handleCloseDialog();
        }
    }


    // Use effect with an empty array will should only re-render once after component init
    useEffect(() => {
        getUserData();
    }, [page, rowsPerPage])
    

    return (
         <CardCustomize title="Employee Table" hasButtonAction>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Gender</TableCell>
                        <TableCell align="left">Birthday</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(user => {
                                return (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align="left">{user.gender}</TableCell>
                                        <TableCell align="left">{user.birthday}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleOpenDialog(user.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => onClickUserRow(user.id)}
                                                aria-label="edit"
                                                color="info">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[8, 15]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DeleteDialog
                open={openDialog}
                onclose={handleCloseDialog}
                onDeleteUser={deleteUser}
            />
            <AlertCustom
                severity="success"
                message="Deleted Successfully"
                open={openSnackbar}
                onClose={hanldeCloseSnackbar}
            />
         </CardCustomize>
    );
}

export default Home;