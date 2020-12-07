import React from 'react'
import likeIcon from '../icons/like.svg'
import dislikeIcon from '../icons/dislike.svg'

export const InitiativeDetails = ({ initiative, likeHandler, dislikeHandler }) => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">{initiative.title}</h1>
            <small className="text-info">Created: {new Date(initiative.created).toLocaleDateString()}</small>
            <br/>
            <small className="text-info">Score: {initiative.score}</small>
            <p className="lead">{initiative.content}</p>
            <hr className="my-4" />
            <div>
                <button
                    className="btn btn-success btn-lg m-2"
                    onClick={likeHandler}
                >
                    <img src={likeIcon} alt=""/>
                    &nbsp;
                    For
                </button>
                <button
                    className="btn btn-danger btn-lg m-2"
                    onClick={dislikeHandler}
                >
                    <img src={dislikeIcon} alt=""/>
                    &nbsp;
                    Against
                </button>
            </div>
        </div>
    )
}