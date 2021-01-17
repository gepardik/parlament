import React from 'react'

export const VideoInput = props => {
    const number = `video-${props.number}`
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                id={number}
                name={number}
                className="form-control"
                placeholder="Add video url"
                value={props.value}
                onChange={props.changeHandler}
            />
            {
                props.last
                ? <button
                    className={'btn btn-success ml-2'}
                    onClick={props.addVideoHandler}
                >
                    +
                </button>
                : <button
                        className={'btn btn-danger ml-2'}
                        onClick={props.deleteVideoHandler}
                        value={props.number}
                    >
                        -
                    </button>
            }

        </div>
    )
}
