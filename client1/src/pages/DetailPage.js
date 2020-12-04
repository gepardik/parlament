import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {InitiativeDetails} from '../components/InitiativeDetails'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader";

export const DetailPage = () => {
    const {request, loading} = useHttp()
    const [initiative, setInitiative] = useState(null)
    const initiativeId = useParams().id

    const getInitiative = useCallback(async () => {
        try {
            const fetched = await request(`/api/initiative/${initiativeId}`, 'GET')
            setInitiative(fetched)
        } catch (e) {}
    }, [initiativeId, request])

    useEffect(() => {
        getInitiative()
    }, [getInitiative])

    if (loading) {
        return <Loader/>
    }

    const voteHandler = async (option) => {
        const newScore = option ? initiative.score + 1 : initiative.score - 1
        setInitiative({...initiative, score: newScore})

        //await request(`/api/initiative/vote/${initiativeId}`, 'PUT', initiative )
    }

    return (
        <>
            { initiative && <InitiativeDetails initiative={initiative}/> }
            <div className="row">
                <div className="col s1">
                    <button className='btn green' onClick={voteHandler.bind(null, true)}>Like</button>
                </div>
                <div className="col s1">
                    <button className='btn red' onClick={voteHandler.bind(null, false)}>Dislike</button>
                </div>
            </div>
        </>
    )
}