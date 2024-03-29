import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
   handleSubmit,
   setUsername,
   setPassword,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id = "username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id = "password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };
  
export default LoginForm