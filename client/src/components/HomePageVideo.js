import React, {useEffect} from 'react'
import {useCallback, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {Loader} from "./Loader"

export const HomePageVideo = props => {
    const {request, loading} = useHttp()
    const context = props.context
    const type = props.type
    const [videos, setVideos] = useState({})

    const prepareVideoUrl = url => {
        let newUrl = ''
        const urlSplited = url.split('watch?v=')
        if (urlSplited.length === 2) {
            newUrl = `${urlSplited[0]}embed/${urlSplited[1]}`
        } else {
            newUrl = url
        }
        return newUrl
    }

    const fetchVideos = useCallback(async () => {
        let url = `/api/video`
        if(context) {
            if(context.country) {
                url += `/${context.country}`

                if (context.local && context.local !== 'null') {
                    url += `/${context.local}`
                }
            }
        }
        try {
            const fetched = await request(url, 'GET')
            setVideos(fetched)
        } catch (e) {}
    }, [request, context])

    useEffect(() => {
        fetchVideos(context)
    }, [fetchVideos, context])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {
                videos && videos[type] && videos[type].map((vid, index) => {
                    if (vid.trim() === '') {
                        return ''
                    }

                    return (
                    <div className="video-container m-4" key={index}>
                    <iframe title="Video" width="100%" height="auto" src={prepareVideoUrl(vid)} frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                    </iframe>
                    </div>
                )})
            }
        </>
    )
}
