import React, {useContext} from 'react'
import {HomePageVideo} from "./HomePageVideo"
import {AuthContext} from "../context/AuthContext"
import Pagination from "./Pagination";

export const InitiativesList = ({ initiatives, pageTitle, context }) => {
    const contextCountry = context ? context.country : null
    const { userCountry } = useContext(AuthContext)
    const buttonText = userCountry === contextCountry ? 'Vote' : 'Inspect'
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
    const initiativesHTML = initiatives.map((ini, index) => {
            return (
                `<tr key=${ini._id}>
                    <th scope="row">
                        ${index + 1}.
                    </th>
                    <td>
                        ${ini.title}
                    </td>
                    <td>
                        ${ini.vote_for.length}
                    </td>
                    <td>
                        ${ini.vote_against.length}
                    </td>
                    <td>
                        ${ini.vote_for.length + ini.vote_against.length}
                    </td>
                    <td>
                        ${ini.vote_for.length - ini.vote_against.length}
                    </td>
                    <td class="text-right">
                        <a href="/detail/${ini._id}" class="btn btn-info">${buttonText}</a>
                    </td>
                </tr>`
            )
        })
    return (
        <>
            <div className="container container-bordered p-0 mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="section-heading">
                            <h5 className="display-4">{pageTitle}</h5>
                        </div>
                        {
                            !(initiatives.length)
                                ? <p className="text-center">No initiatives!</p>
                                : (
                                    <Pagination
                                        tableHead={tableHead}
                                        items={initiativesHTML}
                                        limit={10}
                                    />
                                )
                        }
                        {window.location.pathname === '/home' && <HomePageVideo type='video_initiative' context={context}/>}

                    </div>
                </div>
            </div>
        </>
    )
}

