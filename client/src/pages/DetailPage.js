import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {InitiativeDetails} from '../components/InitiativeDetails'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"

export const DetailPage = () => {
    const {token, userId} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()
    const [initiative, setInitiative] = useState(null)
    const initiativeId = useParams().id
    const  message = useMessage()

    const getInitiative = useCallback(async () => {
        try {
            const fetched = await request(`/api/initiative/${initiativeId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setInitiative(fetched)
        } catch (e) {}
    }, [initiativeId, request, token])

    useEffect(() => {
        getInitiative()
    }, [getInitiative])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    if (loading) {
        return <Loader />
    }

    const voteHandler = async (option) => {
        try {
            let newScore = initiative.score
            option > 0 ? newScore++  : newScore--

            await request(`/api/initiative/vote`, 'POST', {_id: initiative._id, score: newScore, author: initiative.author, new_vote: userId}, {
                Authorization: `Bearer ${token}`
            } )

            getInitiative()

        } catch (e) {}
    }

    return (
        <div className='container'>
            { !loading && initiative && <InitiativeDetails initiative={initiative} likeHandler={voteHandler.bind(null, 1)} dislikeHandler={voteHandler.bind(null, -1)}/> }
        </div>
    )
}