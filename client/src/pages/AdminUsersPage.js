import React, {useCallback, useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"

export const AdminUsersPage = () => {
    const classes = {
        user: 'btn btn-danger',
        admin: 'btn btn-warning'
    }
    const  message = useMessage()
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [users, setUsers] = useState([])
    const fetchUsers = useCallback(async () => {
        let url = `/api/users`
        try {
            const fetched = await request(url, 'GET')
            setUsers(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])


    const changeRoleHandler = async userId => {
        try {
            const data = await request(`/api/users/change`, 'POST', {_id: userId}, {
                Authorization: `Bearer ${auth.token}`
            } )
            fetchUsers()
            message(data.message)
        } catch (e) {}
    }

    if (users.length) {
        return (
            <table className="table bg-white table-hover">
                <thead className="text-dark">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Username</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <th scope="row">
                                {index + 1}.
                            </th>
                            <td>
                                {user.first_name}
                            </td>
                            <td>
                                {user.last_name}
                            </td>
                            <td>
                                {user.country}
                            </td>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td className="text-center">
                                {
                                    auth.userId !== user._id
                                    && <button className={classes[user.role]} onClick={() => changeRoleHandler(user._id)}>
                                        { user.role === 'user' && 'Make admin' }
                                        { user.role === 'admin' && 'Make user' }
                                    </button>
                                    || <span className="text-success">YOU</span>
                                }

                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    } else {
        return <h1>No users</h1>
    }
}