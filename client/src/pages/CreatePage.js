import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [initiative, setInitiative] = useState({
        title: '',
        content: '',
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const createHandler = async () => {
        try {
            const data = await request('/api/initiative/create', 'POST', initiative, {
                Authorization: `Bearer ${auth.token}`
            } )
            history.push(`/detail/${data.initiative._id}`)
        } catch (e) {}
    }

    const changeHandler = event => {
        setInitiative({ ...initiative, [event.target.name]: event.target.value })
    }

    return (
        <div className='container'>
            <h1 className={'mt-4 mb-4'}>Create Initiative</h1>

            <div className="input-group mb-3">
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    value={initiative.title}
                    onChange={changeHandler}
                />
            </div>
            <div className="input-group">
                <textarea
                    rows={20}
                    className="form-control"
                    placeholder="Enter content"
                    id="content"
                    name="content"
                    value={initiative.content}
                    onChange={changeHandler}
                >
                </textarea>
            </div>
            <div className="input-field">
                <button className='btn btn-primary btn-lg mt-2' onClick={createHandler}>Save</button>
            </div>
        </div>
    )
}