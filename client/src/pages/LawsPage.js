import React from 'react'
import {Loader} from "../components/Loader"
import {LawsList} from "../components/LawsList"
import {useCallback, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"

export const LawsPage = props => {
    const [laws, setLaws] = useState([])
    const {request, loading} = useHttp()
    const pageTitle = (props.type === 'current')
        ? 'Current Voting'
        : 'Past Voting'

    const fetchLaws = useCallback(async () => {
        try {
            const fetched = await request(`/api/law/${props.type}`, 'GET')
            setLaws(fetched)
        } catch (e) {}
    }, [request, props.type])

    useEffect(() => {
        fetchLaws()
    }, [fetchLaws])

    if (loading) {
        return <Loader />
    }

    return (
        <div className='container'>
            { !loading && <LawsList laws={laws} pageTitle={pageTitle}/> }
        </div>
    )
}