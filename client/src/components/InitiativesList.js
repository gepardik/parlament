import React from 'react'
import {Link} from 'react-router-dom'

export const InitiativesList = ({ initiatives, pageTitle }) => {
    if (!initiatives.length) {
        return (
            <div className="jumbotron jumbotron-fluid bg-light">
                <div className="container">
                    <h1 className="display-4">{pageTitle}</h1>
                    <p className="text-center">No initiatives!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="jumbotron jumbotron-fluid bg-light">
            <div className="container">
                <h1 className="display-4">{pageTitle}</h1>
                <table className="table bg-white table-hover">
                    <thead className="bg-secondary text-white">
                    <tr>
                        <th scope="col">#</th>
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
                            <td>
                                <Link to={`/detail/${ini._id}`} className={'btn btn-info'}>Vote</Link>
                            </td>
                        </tr>
                    )
                }) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}