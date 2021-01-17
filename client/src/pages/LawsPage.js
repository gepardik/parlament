import React from 'react'
import {Loader} from "../components/Loader"
import {LawsList} from "../components/LawsList"
import {useCallback, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"

export const LawsPage = props => {
    const countryContext = props.context
    const [laws, setLaws] = useState([])
    const {request, loading} = useHttp()
    const pageTitle = (props.type === 'current')
        ? 'Current Voting'
        : 'Past Voting'

    const fetchLaws = useCallback(async (context) => {
        let url = `/api/law/${props.type}`
        if(context) {
            if(context.country) {
                url += `/${context.country}`

                if (context.local) {
                    url += `/${context.local}`
                }
            }
        }

        try {
            const fetched = await request(url, 'GET')
            setLaws(fetched)
        } catch (e) {}
    }, [request, props.type])

    useEffect(() => {
        fetchLaws(countryContext)
    }, [fetchLaws, countryContext])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && <LawsList laws={laws} pageTitle={pageTitle} current={props.type === 'current'} context={countryContext}/> }
        </>
    )
}
