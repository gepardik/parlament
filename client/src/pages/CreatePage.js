import React, {useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
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
            const data = await request('/api/initiative/create', 'POST', initiative )
            history.push(`/detail/${data.initiative._id}`)
        } catch (e) {}
    }

    return (
        <>
            <h1>Create Initiative</h1>
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="input-field">
                        <input
                            id="title"
                            type="text"
                            value={initiative.title}
                            onChange={e => setInitiative({...initiative, title: e.target.value})}
                        />
                        <label htmlFor="title">Enter title</label>
                    </div>
                    <div className="input-field">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Enter content"
                            id="content"
                            value={initiative.content}
                            onChange={e => setInitiative({...initiative, content: e.target.value})}
                        />
                    </div>
                    <div className="input-field">
                        <button className='btn' onClick={createHandler}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}