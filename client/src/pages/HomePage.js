import React from 'react'
import {InitiativesPage} from "./InitiativesPage";
import {LawsPage} from "./LawsPage";
import {CountryLocalContextConsumer} from "../context/CountryLocalContext"

export const HomePage = () => {
    return (

            <CountryLocalContextConsumer>
                {context => (
                    <div className='container'>
                        <LawsPage type={'current'}  context={context} />
                        <LawsPage type={'past'}  context={context} />
                        <InitiativesPage type={'top'}  context={context} />
                    </div>
                )}
            </CountryLocalContextConsumer>

    )
}