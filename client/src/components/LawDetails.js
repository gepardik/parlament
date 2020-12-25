import React from 'react'
import likeIcon from '../icons/like.svg'
import dislikeIcon from '../icons/dislike.svg'

export const LawDetails = ({ law, likeHandler, dislikeHandler, authorized }) => {
    const prepareVideoUrl = url => {
        let newUrl = ''
        const urlSplited = url.split('watch?v=')
        if (urlSplited.length == 2) {
            newUrl = `${urlSplited[0]}embed/${urlSplited[1]}`
        } else {
            newUrl = url
        }
        return newUrl
    }

    return (
        <div className="jumbotron">
            <h1 className="display-4">{law.title}</h1>
            <small className="text-info">Created: {new Date(law.created).toLocaleDateString()}</small>
            <br/>
            <p className="lead">{law.content}</p>
            {
                (law.video)
                    ? <div className="video-container">
                        <iframe width="100%" height="auto" src={prepareVideoUrl(law.video)} frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen>
                        </iframe>
                    </div>
                    : ''
            }
            <hr className="my-4" />
            {authorized ?
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
                :
                <h3 className='text-danger'>You must be authorized to vote</h3>
            }
        </div>
    )
}