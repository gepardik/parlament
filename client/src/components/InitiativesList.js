import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {HomePageVideo} from "./HomePageVideo"
import {AuthContext} from "../context/AuthContext"

export const InitiativesList = ({ initiatives, pageTitle, context }) => {
    const { country: contextCountry } = context
    const { userCountry } = useContext(AuthContext)
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
                                    <table className="table bg-white table-hover">
                                        <thead className="text-darken">
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Title</th>
                                            <th scope="col">For</th>
                                            <th scope="col">Against</th>
                                            <th scope="col">Total Votes</th>
                                            <th scope="col">Score</th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { initiatives.map((ini, index) => {
                                            return (
                                                <tr key={ini._id}>
                                                    <th scope="row">
                                                        {index + 1}.
                                                    </th>
                                                    <td>
                                                        {ini.title}
                                                    </td>
                                                    <td>
                                                        {ini.vote_for.length}
                                                    </td>
                                                    <td>
                                                        {ini.vote_against.length}
                                                    </td>
                                                    <td>
                                                        {ini.vote_for.length + ini.vote_against.length}
                                                    </td>
                                                    <td>
                                                        {ini.vote_for.length - ini.vote_against.length}
                                                    </td>
                                                    <td className="text-right">
                                                        <Link to={`/detail/${ini._id}`} className={'btn btn-info'}>
                                                            {
                                                                userCountry === contextCountry
                                                                    ? <>Vote</>
                                                                    : <>Inspect</>
                                                            }
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        }) }
                                        </tbody>
                                    </table>
                                )
                        }
                        {window.location.pathname === '/home' && <HomePageVideo type='video_initiative' context={context}/>}

                    </div>
                </div>
            </div>
        </>
    )
}

