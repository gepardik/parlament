import React from 'react'
import {InitiativesPage} from "./InitiativesPage";
import {LawsPage} from "./LawsPage";
import {CountryLocalContextConsumer} from "../context/CountryLocalContext"

export const HomePage = props => {
    return (

            <div className='container'>
                <LawsPage type={'current'}  context={props.context} />
                <LawsPage type={'past'}  context={props.context} />
                <InitiativesPage type={'top'}  context={props.context} />
            </div>

    )
}