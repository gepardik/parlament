import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"
import {
    ContinentCountrySelect, deserializeCountries,
    serializeCountries
} from 'react-continent-country-select'
import 'react-continent-country-select/dist/index.css'
import continents from 'react-continent-country-select/dist/continent_countries.json'
import {useMessage} from "../hooks/message.hook"

const AdminCountryPage = () => {
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)

    const [countries, setCountries] = useState([])
    const [selectedCountries, setSelectedCountries] = useState({})

    const fetchCountries = useCallback(async () => {
        try {
            const fetched = await request(`/api/countries`, 'GET')
            setCountries(fetched[0].code)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        fetchCountries()
    }, [fetchCountries])

    useEffect(() => {
        const deserializedCountries = deserializeCountries(countries);
        setSelectedCountries({
            ...deserializedCountries
        })
    }, [countries, setSelectedCountries])





    // You can create custom country component
    const CountryComponent = ({ country }) => {
        const code = country.code.toLowerCase()
        const label = `${country.name}`

        return (
            <span>
                <i
                    style={{ width: '30px' }}
                    className={`flag-icon flag-icon-${code} mr-1`}
                />
                {label}
          </span>
        )
    }

    const onChange = selected => setSelectedCountries({ ...selected });

    const saveHandler = async () => {
        // Serialize selected countries
        // The second boolean param is used for serializing data depending on your specific needs (upper/lower case)

        const serializedCountries = serializeCountries(selectedCountries)

        try {
            const data = await request('/api/countries/save', 'POST', {code: serializedCountries}, {
                Authorization: `Bearer ${token}`
            })
            message(data.message)

        } catch (e) {}
    }


    return (
        <div>
            <ContinentCountrySelect
                continents={continents} // Required
                selected={selectedCountries} // Required
                translations={{
                    toggleText: 'Toggle',
                    notFoundText: 'No countries found.'
                }} // Not required
                customComponent={CountryComponent} // Not required
                onChange={onChange} // Required
            />
            <button type="button" className='btn btn-lg btn-success'
                    onClick={saveHandler}
                    disabled={loading}
            >
                Save Selected Countries
            </button>
        </div>
    )
}

export default AdminCountryPage