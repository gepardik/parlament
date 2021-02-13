import React, {useState} from 'react'
import {useMessage} from "../hooks/message.hook"
import {useHttp} from "../hooks/http.hook"

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const {request} = useHttp()
    const message = useMessage()
    const changeHandler = event => {
        setEmail(event.target.value)
    }

    const resetHandler = async () => {
        const data = await request('/api/auth/forgot-password', 'POST', {email})
        message(data.message)
    }

    return (
        <div className='container'>
            <h2 className={'text-center mt-4'}>Enter your e-mail</h2>
            <div className="d-flex justify-content-center mt-4">
                <div className="card" style={{width: '22rem'}}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={changeHandler}
                                value={email}
                            />
                        </div>
                            <button
                                className="btn btn-primary m-1"
                                onClick={resetHandler}
                            >
                                Send reset link
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
