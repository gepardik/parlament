import React, {useCallback, useEffect, useState} from 'react'
import continents from 'react-continent-country-select/dist/continent_countries.json'
import {useHttp} from '../hooks/http.hook'

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

    const makeHtmlCountries = useCallback(() => {
        const html = continents.map(continent => {
            const reducedCountries = continent.countries.filter(country => countries.includes(country.code))

            if (reducedCountries.length === 0) {
                return null
            }

            const countriesHtml = reducedCountries.map((country, index, countriesArr) => {
                const countryName = country.name.split(',')[0]
                const rowStart = index % 4 === 0 ? '<div class="row mt-2">' : ''
                const rowEnd = (((index + 1) % 4 === 0) || ((index + 1) === countriesArr.length)) ? '</div>' : ''
                return (
                    rowStart + `<div class="col-sm">
                        <a href="/current/${country.code.toLowerCase()}">${countryName}</a>
                    </div>` + rowEnd
                )
            }).join('')


            return `<div class="container mb-4">
                        <div class="title">
                            <h5>${continent.name}</h5>
                        </div>
                        ${countriesHtml}
                    </div>`
        }).join('')

        return html
    }, [countries])


    return (
        <>
            <div className="main">
                <div className="header-block">
                    <div className="logo"></div>
                </div>

                <div className="banner-block"></div>

                <div className="countries-block" dangerouslySetInnerHTML={{ __html: makeHtmlCountries() }}>
                </div>
            </div>

             <div className="footer-block"></div>
        </>
    )
}