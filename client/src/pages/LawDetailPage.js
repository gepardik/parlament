import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"
import {LawDetails} from "../components/LawDetails"

export const LawDetailPage = () => {
    const {token, userId} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()
    const [law, setLaw] = useState(null)
    const lawId = useParams().id
    const  message = useMessage()
    const authorized = !!token

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
        <>
            { !loading && law && <LawDetails law={law} likeHandler={voteHandler.bind(null, 1)} dislikeHandler={voteHandler.bind(null, -1)} authorized={authorized} /> }
        </>
    )
}