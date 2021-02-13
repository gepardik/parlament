import React, { Component } from 'react'

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to
// keep file size down
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'


class CountryRegionSelector extends Component {
    constructor (props) {
        super(props)
        this.state = { country: '', region: '' }
    }

    selectCountry (val) {
        this.setState({ country: val })
    }

    selectRegion (val) {
        this.setState({ region: val })
    }

    render () {
        const { country, region } = this.state;
        return (
            <div>
                <CountryDropdown
                    value = {country}
                    valueType = 'short'
                    onChange = {(val) => this.selectCountry(val)} />
                <RegionDropdown
                    country = {country}
                    value = {region}
                    countryValueType = "short"
                    valueType = 'short'
                    onChange = {(val) => this.selectRegion(val)} />
            </div>
        )
    }
}

export default CountryRegionSelector