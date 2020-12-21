import React from 'react'
import {InitiativesPage} from "./InitiativesPage";
import {LawsPage} from "./LawsPage";

export const HomePage = () => {
    return (
        <div className='container'>
            <LawsPage type={'current'} />
            <LawsPage type={'past'} />
            <InitiativesPage type={'top'} />
        </div>
    )
}