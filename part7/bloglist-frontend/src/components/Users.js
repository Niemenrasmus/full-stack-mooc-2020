import React, { useState, useEffect } from 'react';
import userService from '../services/login';
import { TableContainer, Paper, TableBody, Table, TableRow, TableHead, TableCell } from '@material-ui/core'


const User = ({ user }) => {
    return (
        <>
            <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell><TableCell>{user.blogs.length}</TableCell>
        </>
    );
};


const Users = () => {
    const [users, setUsers] = useState(null)

    useEffect(async () => {
        await setUsers(userService.getAllUsers())
    }, [])

    if (users === null) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>
            <TableBody>
                {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
                    <TableRow key={user.name}>
                        <User key={user.name} user={user} />
                    </TableRow>
                )}
            </TableBody>
        </div>        
    )
}

export default Users