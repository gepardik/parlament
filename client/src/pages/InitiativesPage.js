import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {InitiativesList} from '../components/InitiativesList'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"

export const InitiativesPage = props => {
    const {token} = useContext(AuthContext)
    const [initiatives, setInitiatives] = useState([])
    const {request, loading} = useHttp()
    const pageTitle = (props.type === 'my')
                    ? 'My Initiative'
                    : 'Top Initiative'

    const fetchInitiatives = useCallback(async () => {
        const headers = (props.type === 'my')
            ? { Authorization: `Bearer ${token}`}
            : {}
        try {
            const fetched = await request(`/api/initiative/${props.type}`, 'GET', null, headers)
            setInitiatives(fetched)
        } catch (e) {}
    }, [request, props.type, token])

    useEffect(() => {
        fetchInitiatives()
    }, [fetchInitiatives])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className='container'>
            { !loading && <InitiativesList initiatives={initiatives} pageTitle={pageTitle}/> }
        </div>
    )
}