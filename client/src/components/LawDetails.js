import React, {useState} from 'react'
import likeIcon from '../icons/like.svg'
import dislikeIcon from '../icons/dislike.svg'
import {NavLink} from "react-router-dom"
import {FacebookShareButton} from "react-share"
import FacebookIcon from "../icons/facebook.svg"
import TwitterShareButton from "react-share/es/TwitterShareButton"
import TwitterIcon from "../icons/twitter.svg"
import DownloadIcon from "../icons/download.svg"

export const LawDetails = ({ law, likeHandler, voteHandler, authorized }) => {
    const url = String(window.location)  //"http://sambala.ee/detail/5fcd225e0455b323a075afd0" //String(window.location)
    let title = `Vote for the Law!`
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const [checked, setChecked] = useState(false)
    const [month, date, year]    = new Date(law.last_voting_date).toLocaleDateString("en-US").split("/")
    const monthName = monthNames[month - 1]
    const prepareVideoUrl = url => {
        let newUrl = ''
        const urlSplited = url.split('watch?v=')
        if (urlSplited.length === 2) {
            newUrl = `${urlSplited[0]}embed/${urlSplited[1]}`
        } else {
            newUrl = url
        }
        return newUrl
    }

    return (
        <>
            <div className="card-top bg-dark text-white text-center law-bg">
                <div className='card-top-text'>
                    <h3 className="display-4">{law.title}</h3>
                    <small className="text-info">Created: {new Date(law.created).toLocaleDateString()}</small>
                </div>
            </div>

            <div className="container p-0 mt-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/home">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{law.title}</li>
                    </ol>
                </nav>
            </div>

            <div className="container container-bordered p-0 mt-4">
                <div className="card">
                    <div className="card-body m-4 p-4">
                        <h5 className="card-title mb-4">{law.title}</h5>
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: law.content }} ></p>
                        { law.pdf && <a
                            className="btn btn-info"
                            href={law.pdf}
                            target="_blank"
                        >
                            <img src={DownloadIcon} className="mr-2" />
                            Download PDF
                        </a>}
                    </div>
                    {
                        law.video.map((video, index) => {
                            if (video.trim() === '') {
                                return ''
                            }

                            return (
                                <div className="video-container m-4" key={index}>
                                    <iframe title={law.title} width="100%" height="auto" src={prepareVideoUrl(video)} frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                    </iframe>
                                </div>
                        )})
                    }
                    <hr className="my-4" />

                    <div className='d-flex justify-content-end mr-4'>
                        <FacebookShareButton
                            className='btn btn-sm m-2 d-flex align-items-center share'
                            style={{
                                background: '#3b5998',
                                padding: '0 .8rem',
                                fontSize: '1rem',
                                borderRadius: '.3rem',
                                color: '#fff'
                            }}
                            quote = {title}
                            url = {url}
                        >
                            <img src={FacebookIcon} alt="" className="mr-2" />
                            <span>
                                Share on Facebook
                            </span>
                        </FacebookShareButton>

                        <TwitterShareButton
                            className='btn btn m-2 d-flex align-items-center share'
                            style={{
                                background: '#00aced',
                                padding: '.5rem 1rem',
                                borderRadius: '.3rem',
                                color: '#fff'
                            }}
                            title = {title}
                            url = {url}
                        >
                            <img src={TwitterIcon} alt="" className="mr-2" />
                            <span>
                                Share on Twitter
                            </span>
                        </TwitterShareButton>
                    </div>

                    {authorized ?
                        <div className="vote-box m-4 p-4 text-center">
                            <div className="section-heading">
                                <h5>Vote</h5>
                            </div>
                            <br/>
                            <div className="form-check text-left">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => setChecked(!checked)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Have you read and understand the implications of this Bill?
                                </label>
                            </div>
                            <br/>
                            <h3>Last voting Date: <span className="text-danger">{date} of {monthName} {year}</span></h3>
                            {
                                new Date(law.last_voting_date) >= new Date()
                                && (
                                    <>
                                        <button
                                            className="btn btn-success btn m-2"
                                            onClick={() => voteHandler(1, checked)}
                                        >
                                            <img src={likeIcon} alt=""/>
                                            &nbsp;
                                            For
                                        </button>
                                        <button
                                            className="btn btn-danger btn m-2"
                                            onClick={() => voteHandler(-1, checked)}
                                            >
                                            <img src={dislikeIcon} alt=""/>
                                            &nbsp;
                                            Against
                                        </button>
                                    </>
                                )
                            }

                        </div>
                        :
                        <h3 className='text-danger'>You must be authorized to vote</h3>
                    }
                </div>
            </div>
        </>
    )
}
