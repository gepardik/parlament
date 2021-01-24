import React, {useContext, useCallback, useEffect} from 'react'
import {VideoInput} from "../components/VideoInput"
import {CountryDropdown, RegionDropdown} from "react-country-region-selector"
import {useState} from "react"
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

export const AdminVideosPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [video, setVideo] = useState({
        video_current: [''],
        video_past: [''],
        video_initiative: [''],
    })

    const clearVideos = () => {
        const clearedVideosCurrent = video.video_current.filter(video => video.trim() !== '')
        const clearedVideosPast = video.video_past.filter(video => video.trim() !== '')
        const clearedVideosInitiative = video.video_initiative.filter(video => video.trim() !== '')
        setVideo({...video,
            video_current: clearedVideosCurrent,
            video_past: clearedVideosPast,
            video_initiative: clearedVideosInitiative,
        })
    }

    const saveVideosHandler = async () => {
        clearVideos()
        try {
            const data = await request('/api/video/create', 'POST', {...video}, {
                Authorization: `Bearer ${auth.token}`
            } )
            message(data.message)
        } catch (e) {
            message(e)
        }
    }

    const fetchVideos = useCallback(async (country, local = null) => {
        let url = `/api/video`
        if(country) {
            url += `/${country}`

            if (local) {
                url += `/${local}`
            }
        }
        try {
            const fetched = await request(url, 'GET')
            setVideo(fetched)
        } catch (e) {}
    }, [request])

    const changeCountryLocalHandler = (type = 'country', event) => {
        const name = type === 'country' ? 'country' : 'local'

        setVideo({ ...video, [name]: event })
    }

    useEffect(() => {
        fetchVideos(video.country, video.local)
    }, [video, fetchVideos])

    const addVideoHandler = place => {
        const newVideos = [...video[place]].concat([])
        newVideos.push('')
        setVideo({...video, [place]: newVideos})
    }

    const changeVideoHandler = (place, event) => {
        const index = +event.target.name.split('-')[1]
        const newVideos = [...video[place]].concat([])
        newVideos[index] = event.target.value
        setVideo({...video, [place]: newVideos})
    }

    const deleteVideoHandler = (place, event) => {
        const addedVideos = [...video[place]].concat([])
        const index = +event.target.value
        if (index >= 0) {
            addedVideos.splice(index, 1)
        }
        setVideo({...video, [place]: addedVideos})
    }

    return (
        <>
            <h2>Add Videos to Home Page</h2>
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <CountryDropdown
                    className="form-control"
                    id="country"
                    name="country"
                    valueType="short"
                    value={video.country}
                    onChange={changeCountryLocalHandler.bind(null, 'country')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="local">Local</label>
                <RegionDropdown
                    defaultOptionLabel="Select Local"
                    country={video.country}
                    className="form-control"
                    id="local"
                    name="local"
                    countryValueType="short"
                    valueType="short"
                    value={video.local}
                    onChange={changeCountryLocalHandler.bind(null, 'local')}
                />
            </div>
            <ol>
                <li>
                    <h3>Current Laws Section</h3>
                    Videos:
                    {
                        video.video_current && video.video_current.map((vid, index, arr) => {
                            return <VideoInput
                                    number={index}
                                    value={video.video_current[index]}
                                    changeHandler={changeVideoHandler.bind(null, 'video_current')}
                                    addVideoHandler={addVideoHandler.bind(null, 'video_current')}
                                    deleteVideoHandler={deleteVideoHandler.bind(null, 'video_current')}
                                    last={index + 1 === arr.length}
                            />
                        })
                    }
                </li>
                <li>
                    <h3>Past Laws Section</h3>
                    Videos:
                    {
                        video.video_past && video.video_past.map((vid, index, arr) => {
                            return <VideoInput
                                number={index}
                                value={video.video_past[index]}
                                changeHandler={changeVideoHandler.bind(null, 'video_past')}
                                addVideoHandler={addVideoHandler.bind(null, 'video_past')}
                                deleteVideoHandler={deleteVideoHandler.bind(null, 'video_past')}
                                last={index + 1 === arr.length}
                            />
                        })
                    }
                </li>
                <li>
                    <h3>Top Initiatives Section</h3>
                    Videos:
                    {
                        video.video_initiative && video.video_initiative.map((vid, index, arr) => {
                            return <VideoInput
                                number={index}
                                value={video.video_initiative[index]}
                                changeHandler={changeVideoHandler.bind(null, 'video_initiative')}
                                addVideoHandler={addVideoHandler.bind(null, 'video_initiative')}
                                deleteVideoHandler={deleteVideoHandler.bind(null, 'video_initiative')}
                                last={index + 1 === arr.length}
                            />
                        })
                    }
                </li>
            </ol>
            <div className="input-field">
                <button className='btn btn-primary btn-lg mt-2' onClick={saveVideosHandler}>Save</button>
            </div>
        </>
    )
}
