import React from 'react'
import likeIcon from '../icons/like.svg'
import dislikeIcon from '../icons/dislike.svg'
import {FacebookShareButton} from "react-share"
import FacebookIcon from "../icons/facebook.svg"
import TwitterShareButton from "react-share/es/TwitterShareButton"
import TwitterIcon from "../icons/twitter.svg"
import {NavLink} from "react-router-dom";

export const InitiativeDetails = ({ initiative, likeHandler, dislikeHandler, authorized }) => {
    const url = String(window.location) //"http://sambala.ee/detail/5fcd225e0455b323a075afd0" //String(window.location)
    let title = `Vote for the Initiative!`

    return (
        <>
                <div className="card-top bg-dark text-white text-center law-bg">
                    <div className='card-top-text'>
                        <h3 className="display-4">{initiative.title}</h3>
                        <small className="text-info">Created: {new Date(initiative.created).toLocaleDateString()}</small>
                    </div>
                </div>

                <div className="container p-0 mt-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/home">Home</NavLink></li>
                            <li className="breadcrumb-item active" aria-current="page">{initiative.title}</li>
                        </ol>
                    </nav>
                </div>

                <div className="container container-bordered p-0 mt-4">
                    <div className="card">
                        <div className="card-body m-4 p-4">
                            <h5 className="card-title mb-4">{initiative.title}</h5>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: initiative.content }} ></p>
                        </div>
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


                            <div className="vote-box m-4 p-4 text-center">
                                <div className="section-heading">
                                    <h5>Vote</h5>
                                </div>
                                {authorized ?
                                <>
                                    <button
                                        className="btn btn-success btn m-2"
                                        onClick={likeHandler}
                                    >
                                        <img src={likeIcon} alt=""/>
                                        &nbsp;
                                        For
                                    </button>
                                    <button
                                        className="btn btn-danger btn m-2"
                                        onClick={dislikeHandler}
                                    >
                                        <img src={dislikeIcon} alt=""/>
                                        &nbsp;
                                        Against
                                    </button>
                                </>
                                : <>
                                        <button
                                            className="btn btn-success btn m-2"
                                            onClick={() => {document.location.replace('/login')}}
                                        >
                                            <img src={likeIcon} alt=""/>
                                            &nbsp;
                                            For
                                        </button>
                                        <button
                                            className="btn btn-danger btn m-2"
                                            onClick={() => {document.location.replace('/login')}}
                                        >
                                            <img src={dislikeIcon} alt=""/>
                                            &nbsp;
                                            Against
                                        </button>
                                    </>}
                            </div>

                </div>
            </div>
        </>
    )
}