import React from 'react'
import {Link} from 'react-router-dom'

export const InitiativesList = ({ initiatives, pageTitle }) => {
    if (!initiatives.length) {
        return <p className="text-center">No initiatives!</p>
    }

    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">{pageTitle}</h1>
                <ul className="list-group">
                    { initiatives.map((ini, index) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between" key={ini._id}>
                                <span>
                                    {index + 1}. {ini.title}
                                </span>
                                <span>
                                    Score: {ini.score}&nbsp;&nbsp;
                                    <Link to={`/detail/${ini._id}`} className={'btn btn-info'}>Vote</Link>
                                </span>
                            </li>
                        )
                    }) }
                </ul>
            </div>
        </div>
    )
}