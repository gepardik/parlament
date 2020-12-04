import React from 'react'
import {Link} from 'react-router-dom'

export const InitiativesList = ({ initiatives }) => {
    if (!initiatives.length) {
        return <p>No initiatives!</p>
    }

    return (
        <table>
            <tbody>
            { initiatives.map((ini, index) => {
                return (
                    <tr key={ini._id}>
                        <td>{index + 1}</td>
                        <td>{ini.title}</td>
                        <td>
                            <Link to={`/detail/${ini._id}`} className={'btn'}>Open</Link>
                        </td>
                    </tr>
                )
            }) }
            </tbody>

        </table>
    )
}