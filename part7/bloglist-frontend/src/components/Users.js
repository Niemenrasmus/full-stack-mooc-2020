import React, { useState, useEffect } from 'react';
import userService from '../services/login';
import { Link, useParams } from 'react-router-dom';
import { TableCell } from '@material-ui/core'


const User = ({ user }) => {
    return (
        <>
            <TableCell>
                <Link to={`/users/${user.id}`}>
                    {user.name}
                </Link>
            </TableCell><TableCell>{user.blogs.length}</TableCell>
        </>
    );
};

export const UserView = ({ allBlogs }) => {
    const id = useParams().id
    const userBlogs = allBlogs.filter(b => b.user.id === id)

    if (userBlogs === null) {
        return null;
    }

    return (
        <div>
            <ul>
                {userBlogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )

}


const Users = () => {
    const [users, setUsers] = useState(null)

    useEffect(async () => {
        const allUsers = await userService.getAllUsers()
        setUsers(allUsers)
    }, [])

    if (users === null) {
        return null
    }

    return (
        <div>
              <h2>Users</h2>
        <table >
            <tbody>
                <tr>
                    <th>Name</th>
                    <th scope="col">Blogs</th>
                </tr>
                {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
                    <tr key={user.id}>
                        <User key={user.id} user={user} />
                    </tr>
                )}
            </tbody>
        </table>     
        </div>   
    )
}

export default Users