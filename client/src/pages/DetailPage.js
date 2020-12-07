import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {InitiativeDetails} from '../components/InitiativeDetails'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [initiative, setInitiative] = useState(null)
    const initiativeId = useParams().id

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

    if (loading) {
        return <Loader />
    }

    const voteHandler = async (option) => {
        const newScore = option ? initiative.score + 1 : initiative.score - 1
        setInitiative({...initiative, score: newScore})

        await request(`/api/initiative/vote`, 'POST', {id: initiativeId, score: newScore}, {
            Authorization: `Bearer ${token}`
        } )
    }

    return (
        <div className='container'>
            { !loading && initiative && <InitiativeDetails initiative={initiative} likeHandler={voteHandler.bind(null, true)} dislikeHandler={voteHandler.bind(null, false)}/> }
        </div>
    )
}