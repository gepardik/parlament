import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {CountryDropdown, RegionDropdown} from "react-country-region-selector"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export const AdminLawsPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [law, setLaw] = useState({
        title: '',
        content: '',
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const createHandler = async () => {
        try {
            const data = await request('/api/law/create', 'POST', {...law}, {
                Authorization: `Bearer ${auth.token}`
            } )
            history.push(`/law/detail/${data.law._id}`)
        } catch (e) {}
    }

    const changeHandler = event => {
        setLaw({ ...law, [event.target.name]: event.target.value })
    }

    const changeHandlerContent = (key, value) => {
        setLaw({ ...law, [key]: value })
    }

    const changeCountryLocalHandler = (type = 'country', event) => {
        const name = type === 'country' ? 'country' : 'local'

        setLaw({ ...law, [name]: event })
    }

    return (
        <div className='container'>
            <h1 className={'mt-4 mb-4'}>Create Law</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    value={law.title}
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
            {/*<div className="input-group">*/}
            {/*    <textarea*/}
            {/*        rows={20}*/}
            {/*        className="form-control"*/}
            {/*        placeholder="Enter content"*/}
            {/*        id="content"*/}
            {/*        name="content"*/}
            {/*        value={law.content}*/}
            {/*        onChange={changeHandler}*/}
            {/*    >*/}
            {/*    </textarea>*/}
            {/*</div>*/}
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <CountryDropdown
                    className="form-control"
                    id="country"
                    name="country"
                    valueType="short"
                    value={law.country}
                    onChange={changeCountryLocalHandler.bind(null, 'country')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="local">Local</label>
                <RegionDropdown
                    defaultOptionLabel="Select Local"
                    country={law.country}
                    className="form-control"
                    id="local"
                    name="local"
                    countryValueType="short"
                    valueType="short"
                    value={law.local}
                    onChange={changeCountryLocalHandler.bind(null, 'local')}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    id="video"
                    name="video"
                    className="form-control"
                    placeholder="Add video url"
                    value={law.video}
                    onChange={changeHandler}
                />
            </div>
            <div className="input-field">
                <button className='btn btn-primary btn-lg mt-2' onClick={createHandler}>Save</button>
            </div>
        </div>
    )
}