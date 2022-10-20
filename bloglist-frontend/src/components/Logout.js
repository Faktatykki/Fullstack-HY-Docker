import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ handleLogout }) => (
    <button onClick = {handleLogout} type = "button">
            logout
    </button>
)

Logout.propTypes = {
    handleLogout: PropTypes.func.isRequired
}
export default Logout