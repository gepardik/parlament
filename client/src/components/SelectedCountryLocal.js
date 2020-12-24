import React from 'react'
import {CountryRegionData} from "react-country-region-selector"

export const SelectedCountryLocal = (props) => {
    const context = props.context
    const countryLocalData = CountryRegionData
    const country = countryLocalData.find((country) => country[1] === context.country)
    const countryName = country[0]
    const locals = country[2].split('|').map(local => {
        const localData = local.split('~')
        const localName = localData[0]
        const localCode = localData[1]
        return {
            code: localCode,
            name: localName
        }
    })

    const clickHandler = event => {
        event.preventDefault()
        context.selectLocal(event.target.dataset.code)
    }

    const resetLocalHandler = event => {
        event.preventDefault()
        context.selectLocal(null)
    }

    return (
        <React.Fragment>
            <a href='/' className="dropdown-item" onClick={resetLocalHandler}>All Counties of {countryName}</a>
            <div className="dropdown-divider"></div>
            {
                locals.map((local, index) => {
                    const classes = ["dropdown-item"]
                    if (context.local === local.code) {
                        classes.push('active')
                    }
                    return <a href='/' className={classes.join(' ')} data-code={local.code} key={index} onClick={clickHandler}>{local.name}</a>
                })
            }
        </React.Fragment>
    )
}