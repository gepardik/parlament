import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {useHistory} from 'react-router-dom'
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector'

export const RegisterPage = () => {
    const history = useHistory()
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        username: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const changeCountryLocalHandler = (type = 'country', event) => {
        const name = type === 'country' ? 'country' : 'local'

        setForm({ ...form, [name]: event })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            history.push('/login')
        } catch (e) {}
    }

    return (
        <div className='container'>
            <h2 className={'text-center mt-4'}>Register</h2>
            <div className="d-flex justify-content-center mt-4">

                <div className="card" style={{width: '30rem'}}>
                    <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    name="first_name"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <CountryDropdown
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    valueType="short"
                                    value={form.country}
                                    onChange={changeCountryLocalHandler.bind(null, 'country')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="local">Local</label>
                                <RegionDropdown
                                    defaultOptionLabel="Select Local"
                                    country={form.country}
                                    className="form-control"
                                    id="local"
                                    name="local"
                                    countryValueType="short"
                                    valueType="short"
                                    value={form.local}
                                    onChange={changeCountryLocalHandler.bind(null, 'local')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                            </div>
                            <button
                                className="btn btn-success m-1"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Register
                            </button>
                    </div>
                </div>
            </div>
        </div>

    )
}