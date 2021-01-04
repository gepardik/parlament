import React from 'react'
import {VideoInput} from "../components/VideoInput"

export const VideosPage = () => {
    return (
        <>
            <h2>Add Videos to Home Page</h2>
            <ol>
                <li>
                    <h3>Current Laws Section</h3>
                    Videos:
                    <VideoInput />
                </li>
                <li>
                    <h3>Past Laws Section</h3>
                    Videos:
                    <VideoInput/>
                </li>
                <li>
                    <h3>Top Initiatives Section</h3>
                    Videos:
                    <VideoInput/>
                </li>
            </ol>
        </>
    )
}