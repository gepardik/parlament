import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {InitiativesList} from '../components/InitiativesList'
import {Loader} from "../components/Loader"

export const InitiativesPage = () => {
    const [initiatives, setInitiatives] = useState([])
    const {request, loading} = useHttp()

    const fetchInitiatives = useCallback(async () => {
        try {
            const fetched = await request('/api/initiative', 'GET', null)
            setInitiatives(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchInitiatives()
    }, [fetchInitiatives])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <h1>Initiatives Page</h1>
            <InitiativesList initiatives={initiatives}/>
        </>
    )
}