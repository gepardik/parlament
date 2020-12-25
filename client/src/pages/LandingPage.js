import React, {useCallback, useEffect, useState} from 'react'
import continents from 'react-continent-country-select/dist/continent_countries.json'
import {useHttp} from '../hooks/http.hook'
import {CountryLocalContextConsumer} from '../context/CountryLocalContext'

export const LandingPage = () => {
    const {request} = useHttp()
    const [countries, setCountries] = useState([])
    const fetchCountries = useCallback(async () => {
        try {
            const fetched = await request(`/api/countries`, 'GET')
            setCountries(fetched[0].code)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchCountries()
    }, [fetchCountries])

    const linkClickHandler = async (context, country, event) => {
        event.preventDefault()
        context.selectCountry(country)

        window.location.replace('/current')
    }

    return (
        <>
            <div className="main">
                <div className="header-block">
                    <div className="logo"></div>
                </div>

                <div className="banner-block"></div>

                <div className="countries-block">
                    {
                        continents.map((continent, index) => {
                            const reducedCountries = continent.countries.filter(country => countries.includes(country.code))

                            if (reducedCountries.length === 0) {
                                return ''
                            }

                            return <div className="container mb-4" key={index}>
                                <div className="title">
                                    <h5>{continent.name}</h5>
                                </div>
                                <div className="row mt-2">
                                    {reducedCountries.map((country, index2) => {
                                        return (
                                            <div className="col-3" key={index2}>
                                                <CountryLocalContextConsumer>
                                                    {context => (
                                                        <a href={'/current'} onClick={linkClickHandler.bind(null, context, country.code)}>
                                                            {country.name.split(',')[0]}
                                                        </a>
                                                    )}
                                                </CountryLocalContextConsumer>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

             <div className="footer-block"></div>
        </>
    )
}