import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"
import {FacebookShareButton} from 'react-share'
import FacebookIcon from "react-share/es/FacebookIcon"
import TwitterShareButton from "react-share/es/TwitterShareButton"
import TwitterIcon from "react-share/es/TwitterIcon"
import {LawDetails} from "../components/LawDetails"

export const LawDetailPage = () => {
    const {token, userId} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()
    const [law, setLaw] = useState(null)
    const lawId = useParams().id
    const  message = useMessage()
    const authorized = !!token

    const url = "http://sambala.ee/detail/5fcd225e0455b323a075afd0" //String(window.location)
    let title = `Vote for the Law!`
    const size = "2.5rem"


    const getLaw = useCallback(async () => {
        try {
            const fetched = await request(`/api/law/${lawId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLaw(fetched)
        } catch (e) {}
    }, [lawId, request, token])

    useEffect(() => {
        getLaw()
    }, [getLaw])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    if (loading) {
        return <Loader />
    }

    const voteHandler = async (option) => {
        try {

            const data = await request(`/api/law/vote`, 'POST', {_id: law._id, vote: option, voter: userId}, {
                Authorization: `Bearer ${token}`
            } )
            getLaw()
            message(data.message)
        } catch (e) {}
    }

    return (
        <div className='container'>
            { !loading && law && <LawDetails law={law} likeHandler={voteHandler.bind(null, 1)} dislikeHandler={voteHandler.bind(null, -1)} authorized={authorized} /> }
            <div className='d-flex justify-content-start'>
                <FacebookShareButton
                    className='btn btn-lg m-2 d-flex align-items-center'
                    style={{
                        background: '#3b5998',
                        padding: '.5rem 1rem',
                        fontSize: '1.25rem',
                        lineHeight: '1.5',
                        borderRadius: '.3rem',
                        color: '#fff'
                    }}
                    quote = {title}
                    url = {url}
                >
                    <FacebookIcon
                        size = {size}
                    />
                    <span>
                            Share on Facebook
                        </span>
                </FacebookShareButton>

                <TwitterShareButton
                    className='btn btn-lg m-2 d-flex align-items-center'
                    style={{
                        background: '#00aced',
                        padding: '.5rem 1rem',
                        fontSize: '1.25rem',
                        lineHeight: '1.5',
                        borderRadius: '.3rem',
                        color: '#fff'
                    }}
                    title = {title}
                    url = {url}
                >
                    <TwitterIcon
                        size={size}
                    />
                    <span>
                            Share on Twitter
                        </span>
                </TwitterShareButton>
            </div>

        </div>
    )
}