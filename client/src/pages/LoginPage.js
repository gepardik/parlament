import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"

export const LoginPage = () => {
    const auth = useContext(AuthContext)

    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        username: '', password: ''
    })
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.userName, data.role, data.userCountry)
        } catch (e) {}
    }

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            await loginHandler()
        }
    }

    return (
        <div className='container'>
            <h2 className={'text-center mt-4'}>Log In</h2>
            <div className="d-flex justify-content-center mt-4">

                <div className="card" style={{width: '22rem'}}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={changeHandler}
                                onKeyPress={pressHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                                onKeyPress={pressHandler}
                            />
                        </div>
                        <button
                            className="btn btn-primary m-1"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}