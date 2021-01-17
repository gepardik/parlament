import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {InitiativesList} from '../components/InitiativesList'
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"

export const InitiativesPage = props => {
    const countryContext = props.context
    const {token} = useContext(AuthContext)
    const [initiatives, setInitiatives] = useState([])
    const {request, loading} = useHttp()
    const pageTitle = (props.type === 'my')
                    ? 'My Initiative'
                    : 'Top Initiative'

    const fetchInitiatives = useCallback(async () => {
        let country = null
        let headers = {}
        let url = `/api/initiative/${props.type}`
        if (props.type === 'my') {
            headers = { Authorization: `Bearer ${token}`}
        } else {
            if (countryContext) {
                country = countryContext.country
                if (country) {
                    url += `/${country}`
                }
            }
        }

        try {
            const fetched = await request(url, 'GET', null, headers)
            setInitiatives(fetched)
        } catch (e) {}
    }, [request, props.type, token, countryContext])

    useEffect(() => {
        fetchInitiatives()
    }, [fetchInitiatives])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            { !loading && <InitiativesList initiatives={initiatives} pageTitle={pageTitle} context={countryContext}/> }
        </>
    )
}
