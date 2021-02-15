import React, {useState} from 'react'
import {useMessage} from "../hooks/message.hook"
import {useHttp} from "../hooks/http.hook"
import {useParams} from "react-router-dom";

export const PasswordResetPage = () => {
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const token = useParams().token
    const {request} = useHttp()
    const message = useMessage()
    const changeHandler = event => {
        if (event.target.name === 'password1') {
            setPassword1(event.target.value)
        } else {
            setPassword2(event.target.value)
        }

    }

    const resetHandler = async () => {
        const reg = /^(?=.*[A-Z])(?=.*\d).*$/
        if (!password1 || !password2) {
            message('Enter password!')
            return
        }
        if (password1 !== password2) {
            message('Password mismatch!')
            return
        }

        if (password1.length < 8 || !password1.match(reg)) {
            message('Password minimum length should be 8 signs and it should have at least 1 uppercase and 1 numeric')
            return
        }

        await request('/api/auth/reset-password', 'POST', {token, password: password1})
            .then(data => {
                message(data.message)
                if (data.result && data.result === 'success')
                    setTimeout(() => {
                        document.location.replace('/login')
                    }, 3000)
            })
        return
    }

    return (
        <div className='container'>
            <h2 className={'text-center mt-4'}>Password Reset</h2>
            <div className="d-flex justify-content-center mt-4">
                <div className="card" style={{width: '22rem'}}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="password1">
                                New Password
                                <br/>
                                <small className="text-info">(Min. length 8 signs, at least 1 uppercase and 1 numeric)</small>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password1"
                                name="password1"
                                onChange={changeHandler}
                                value={password1}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Repeat Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password2"
                                name="password2"
                                onChange={changeHandler}
                                value={password2}
                            />
                        </div>
                        <button
                            className="btn btn-primary m-1"
                            onClick={resetHandler}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
