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
            <h1 className={'mt-4 mb-4'}>Create Initiative</h1>

            <div className="input-group mb-3">
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    placeholder="Enter title"
                    value={initiative.title}
                    onChange={e => setInitiative({...initiative, title: e.target.value})}
                />
            </div>
            <div className="input-group">
                <textarea
                    rows={20}
                    className="form-control"
                    placeholder="Enter content"
                    id="content"
                    value={initiative.content}
                    onChange={e => setInitiative({...initiative, content: e.target.value})}
                >
                </textarea>
            </div>
            <div className="input-field">
                <button className='btn btn-primary btn-lg mt-2' onClick={createHandler}>Save</button>
            </div>
        </>
    )
}