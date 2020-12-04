import React from 'react'

export const InitiativeDetails = ({ initiative }) => {
    return (
        <>
            <h1>{initiative.title}</h1>
            <hr/>
            <small>Created: {initiative.created}</small>
            <br/>
            <small>Score: {initiative.score}</small>
            <p>
                {initiative.content}
            </p>
        </>
    )
}