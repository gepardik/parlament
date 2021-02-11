import React, {useState, useEffect, useCallback} from 'react'
import banner1 from "../img/K_4_large.jpg";
import banner2 from "../img/K_7_large.jpg";
import banner3 from "../img/K_10_large.jpg";
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";

export const Slider = props => {
    const countryContext = props.context
    const [laws, setLaws] = useState([])
    const {request} = useHttp()
    const banners = [banner1, banner2, banner3]
    const bannerMax = banners.length - 1
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const fetchLaws = useCallback(async (context) => {
        let url = `/api/law/current`
        if(context) {
            if(context.country) {
                url += `/${context.country}`

                if (context.local) {
                    url += `/${context.local}`
                }
            }
        }

        try {
            const fetched = await request(url, 'GET')
            setLaws(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchLaws(countryContext)
    }, [fetchLaws, countryContext])

    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <ol className="carousel-indicators">
                {laws.length > 0 && laws.map((law, index) => {
                    const classActive = index === 0 ? 'active' : ''
                    return (
                        <li
                            key={index}
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={index}
                            className={classActive}
                        >
                        </li>
                    )
                })
                ||
                <li
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                >
                </li>
                }
            </ol>
            <div className="carousel-inner">
                {laws.length > 0 && laws.map((law, index) => {
                    const [month, date, year]    = new Date(law.last_voting_date).toLocaleDateString("en-US").split("/")
                    const monthName = monthNames[month - 1]
                    const classActive = index === 0 ? 'active' : ''
                    return (
                        <div className={`carousel-item ${classActive}`} key={index}>
                            <img src={banners[getRandomInt(bannerMax)]} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <span className="text-info">Last voting Date: {date} of {monthName} {year}</span>
                                <h1>{law.title}</h1>
                                <Link to={`/law/detail/${law._id}`} className="btn btn-lg btn-outline-light">Vote</Link>
                            </div>
                        </div>
                    )
                })
                ||
                <div className="carousel-item active">
                    <img src={banners[0]} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h1>Welcome to People's Vote!</h1>
                    </div>
                </div>
                }
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden"></span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden"></span>
            </a>
        </div>
    )
}