import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
            const data = await request('/api/initiative/create', 'POST', {...initiative, country: auth.userCountry}, {
                Authorization: `Bearer ${auth.token}`
            } )
            history.push(`/detail/${data.initiative._id}`)
        } catch (e) {}
    }

    const changeHandler = event => {
        setInitiative({ ...initiative, [event.target.name]: event.target.value })
    }

    const changeHandlerContent = (key, value) => {
        setInitiative({ ...initiative, [key]: value })
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
                <CKEditor
                    id="content"
                    name="content"
                    editor={ ClassicEditor }
                    data="<p>Enter content</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        changeHandlerContent('content', data)
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
            <div className="input-field">
                <button className='btn btn-primary btn-lg mt-2' onClick={createHandler}>Save</button>
            </div>
        </div>
    )
}