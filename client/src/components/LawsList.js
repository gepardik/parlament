import React from 'react'
import {Link} from 'react-router-dom'

export const LawsList = ({ laws, pageTitle }) => {
    if (!laws.length) {
        return <p className="text-center">No laws!</p>
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
                    { laws.map((law, index) => {
                        return (
                            <tr key={law._id}>
                                <th scope="row">
                                    {index + 1}.
                                </th>
                                <td>
                                    {law.title}
                                </td>
                                <td>
                                    {law.vote_for.length}
                                </td>
                                <td>
                                    {law.vote_against.length}
                                </td>
                                <td>
                                    {law.vote_for.length + law.vote_against.length}
                                </td>
                                <td>
                                    {law.vote_for.length - law.vote_against.length}
                                </td>
                                <td>
                                    <Link to={`/law/detail/${law._id}`} className={'btn btn-info'}>Vote</Link>
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