import React, {useContext} from 'react'
import { HomePageVideo } from "./HomePageVideo"
import { CountryRegionData } from "react-country-region-selector"
import {AuthContext} from "../context/AuthContext"
import Pagination from "./Pagination";


export const LawsList = ({ laws, pageTitle, current, context }) => {
    const { country: contextCountry, local: contextLocal } = context
    const { userCountry, userLocal } = useContext(AuthContext)
    const type = current ? 'video_current' : 'video_past'
    const tableHead = `
        <tr>
            <th scope="col"></th>
            <th scope="col">Title</th>
            <th scope="col">For</th>
            <th scope="col">Against</th>
            <th scope="col">Total Votes</th>
            <th scope="col">Score</th>
            <th scope="col"></th>
        </tr>
    `

    const buttonText =
        (userCountry === contextCountry && (userLocal === contextLocal || contextLocal === null || contextLocal === 'null') && current)
        ? 'Vote'
        : 'Inspect'

    const lawsHTML = laws.map((law, index) => {
            return (
                `<tr key=${law._id}>
                    <th scope="row">
                        ${index + 1}.
                    </th>
                    <td>
                        ${law.title}
                    </td>
                    <td>
                        ${law.vote_for.length}
                    </td>
                    <td>
                        ${law.vote_against.length}
                    </td>
                    <td>
                        ${law.vote_for.length + law.vote_against.length}
                    </td>
                    <td>
                        ${law.vote_for.length - law.vote_against.length}
                    </td>
                    <td class="text-right">
                        <a href="/law/detail/${law._id}"
                              class="btn btn-info">
                            ${buttonText}
                        </a>
                    </td>
                </tr>`
            )
        })

    const clData = CountryRegionData
    const country = clData.find((country) => country[1] === context.country)
    const countryName = country[0]
    let localName = null
    if (context.local) {
        const locals = country[2].split('|').map(local => {
            const localData = local.split('~')
            const localName = localData[0]
            const localCode = localData[1]
            return {
                code: localCode,
                name: localName
            }
        })
        if (locals.length) {
            let newLocal = locals.find(local => local.code === context.local)
            if (newLocal) {
                localName = newLocal.name
            }

        }
    }

    return (
        <>
            <div className="container container-bordered p-0 mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="section-heading">
                            <h5 className="display-4">{pageTitle} - {countryName} {localName}</h5>
                        </div>
                        {
                            !(laws.length)
                                ? <p className="text-center">No laws!</p>
                                : (
                                    <Pagination
                                        tableHead={tableHead}
                                        items={lawsHTML}
                                        limit={10}
                                    />
                                )
                        }
                        {window.location.pathname === '/home' && <HomePageVideo type={type} context={context}/>}
                    </div>
                </div>
            </div>
        </>
    )
}
