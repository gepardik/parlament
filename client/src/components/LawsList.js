import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {HomePageVideo} from "./HomePageVideo"

export const LawsList = ({ laws, pageTitle, current, context }) => {
    const type = current ? 'video_current' : 'video_past'
    return (
        <>
            <div className="container container-bordered p-0 mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="section-heading">
                            <h5 className="display-4">{pageTitle}</h5>
                        </div>
                        {
                            !(laws.length)
                                ? <p className="text-center">No laws!</p>
                                :
                                <table className="table bg-white table-hover">
                                    <thead className="text-dark">
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
                                    {laws.map((law, index) => {
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
                                                <td className="text-right">
                                                    <Link to={`/law/detail/${law._id}`}
                                                          className={'btn btn-info'}>Vote</Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                        }
                        {window.location.pathname === '/home' && <HomePageVideo type={type} context={context}/>}
                    </div>
                </div>
            </div>
        </>
    )
}
