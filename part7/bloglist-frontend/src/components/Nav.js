import React from 'react'
import { Toolbar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Notification from "./Notification"
const Nav = () => {
    
    const handleLogout = async () => {
        window.localStorage.clear()
        window.location.reload()
      }

    return (
    <Toolbar>
        <Button component={Link} to='/blogs'>
                blogs
        </Button>
        <Button  component={Link} to='/users'>
            users
        </Button>
            <Notification/>
        <Button onClick={handleLogout}>
            logout
        </Button>
    </Toolbar>
    )
}

export default Nav