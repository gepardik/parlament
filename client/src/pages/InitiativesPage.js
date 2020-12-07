import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {InitiativesList} from '../components/InitiativesList'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"

export const InitiativesPage = () => {
    const {token} = useContext(AuthContext)
    const [initiatives, setInitiatives] = useState([])
    const {request, loading} = useHttp()

    const fetchInitiatives = useCallback(async () => {
        try {
            const fetched = await request('/api/initiative/my_initiatives', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setInitiatives(fetched)
        } catch (e) {}
    }, [request, token])

    useEffect(() => {
        fetchInitiatives()
    }, [fetchInitiatives])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className='container'>
            { !loading && <InitiativesList initiatives={initiatives}/> }
        </div>
    )
}