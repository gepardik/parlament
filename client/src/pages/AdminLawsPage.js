import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {CountryDropdown, RegionDropdown} from "react-country-region-selector"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {VideoInput} from "../components/VideoInput"
import DatePicker from "react-datepicker"
import {useMessage} from "../hooks/message.hook"
import "react-datepicker/dist/react-datepicker.css"
import firebase from 'firebase/app'
import 'firebase/storage'
import {Loader} from "../components/Loader";
import checkIcon from "../icons/check.svg"

export const AdminLawsPage = () => {
    const message = useMessage()
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [law, setLaw] = useState({
        title: '',
        content: '',
        video: [''],
        pdf: null
    })
    const startDate = new Date()
    const [endDate, setEndDate] = useState(new Date())

    const firebaseConfig = {
        apiKey: "AIzaSyAZ6N3Inu4t3PTSJkvsPmgAULyxmc4v1-0",
        authDomain: "fe-upload-1.firebaseapp.com",
        projectId: "fe-upload-1",
        storageBucket: "fe-upload-1.appspot.com",
        messagingSenderId: "557835014504",
        appId: "1:557835014504:web:2434f524b9621c3f2e46dd"
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }

    const storage = firebase.storage()
    const [files, setFiles] = useState([])
    const [fileLoading, setFileLoading] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false)


    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const clearVideos = () => {
        const clearedVideos = law.video.filter(video => video.trim() !== '')
        setLaw({...law, video: clearedVideos})
    }

    const createHandler = async () => {
        clearVideos()
        try {
            const data = await request('/api/law/create', 'POST', {...law}, {
                Authorization: `Bearer ${auth.token}`
            } )
            message(data.message)
            history.push(`/law/detail/${data.law._id}`)
        } catch (e) {
            message(e)
        }
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

    const addVideoHandler = () => {
        const videos = [...law.video].concat([])
        videos.push('')
        setLaw({...law, video: videos})    }


    const deleteVideoHandler = event => {
        const lawVideos = [...law.video].concat([])
        const index = +event.target.value
        if (index >= 0) {
            lawVideos.splice(index, 1)
        }
        setLaw({...law, video: lawVideos})
    }

    const changeVideoHandler = event => {
        const index = +event.target.name.split('-')[1]
        const videos = [...law.video].concat([])
        videos[index] = event.target.value
        setLaw({...law, video: videos})
    }

    const changeDateHandler = (date) => {
        setEndDate(date)
        setLaw({...law, last_voting_date: date} )
    }

    const fileChangeHandler = event => {
        setFileUploaded(false)
        if (!event.target.files.length) {
            return
        }

        setFiles(Array.from(event.target.files))
    }

    async function fileUploadHandler() {
        const file = files[0]
        const ref = storage.ref(`upload/${Math.floor(Math.random() * 1000000)}${file.name}`)
        const task = ref.put(file)
        setFileLoading(true)
        task.on('state_changed', snapshot => {
            const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
        }, error => {
            console.log(error)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(url => {
                setLaw({...law, pdf: url})
                setFileLoading(false)
                setFileUploaded(true)
            })
        })
    }

    return (
        <div className='container'>
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
            <br/>
            <div className="mb-3">
                <label htmlFor="pdfFile" className="form-label">Add PDF file:&nbsp;</label>
                <input type="file" multiple="true" id="pdfFile" onChange={fileChangeHandler}/>
                { files.length !== 0 && !fileUploaded && !fileLoading && (<button className='btn btn-success' onClick={fileUploadHandler}>Upload</button>)}
                { fileLoading && <Loader />}
                { fileUploaded && <img src={checkIcon} />}
            </div>
            <br />
            <div className="input-group mb-3 align-middle">
                <span>Last Date of Voting:&nbsp;</span>
                <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={date => changeDateHandler(date)}
                    minDate={startDate}
                />
            </div>
            <br />
            {
                law.video.map((video, index, arr) => {
                    return <VideoInput
                        number={index}
                        value={law.video[index]}
                        changeHandler={changeVideoHandler}
                        addVideoHandler={addVideoHandler}
                        deleteVideoHandler={deleteVideoHandler}
                        last={index + 1 === arr.length}
                    />
                })
            }
            <div className="input-field">
                <button className='btn btn-primary btn-lg mt-2' onClick={createHandler}>Save</button>
            </div>
        </div>
    )
}
