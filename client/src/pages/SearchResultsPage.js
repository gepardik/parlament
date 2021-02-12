import React, {useCallback, useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"
import {CountryRegionData} from "react-country-region-selector"

export const SearchResultsPage = props => {
    const countryContext = props.context
    const phrase = useParams().by
    const [result, setResult] = useState(null)
    const {request} = useHttp()
    let url = `/api/search/${phrase}`

    const clData = CountryRegionData
    const country = clData.find((country) => country[1] === countryContext.country)
    const countryName = country[0]
    let localName = null
    if (countryContext.local) {
        const locals = country[2].split('|').map(local => {
            const localData = local.split('~')
            const localName = localData[0]
            const localCode = localData[1]
            return {
                code: localCode,
                name: localName
            }
        })
        if (locals.length) {
            let newLocals = locals.find(local => local.code === countryContext.local)
            if (newLocals){
                localName = newLocals.name;
            }

        }
    }

    const filterResultByContext = useCallback(fetched => {
        if (!fetched) {
            return
        }
        let laws = fetched.laws
        let initiatives = fetched.initiatives
        if (countryContext.country) {
            laws = laws.filter(law => law.country === countryContext.country)
            if (countryContext.local && countryContext.local !== 'null') {
                laws = laws.filter(law => law.local === countryContext.local)
            } else {
                laws = laws.filter(law => {
                    return !law.local || law.local === 'null'
                })
            }
            initiatives = initiatives.filter(ini => ini.country === countryContext.country)
            setResult({initiatives, laws})
        }

    }, [countryContext.country, countryContext.local])

    const getResult = useCallback(async () => {
        try {
            await request(url, 'GET').then(fetched => filterResultByContext(fetched))

        } catch (e) {}
    }, [request, url, filterResultByContext])

    useEffect(() => {
        getResult()
    }, [getResult])

    return (
        <div className="container container-bordered p-0 mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="section-heading">
                        <h5 className="display-4">Search Results by keyphrase <span className="text-info">"{phrase}"</span> for {countryName} {localName}</h5>
                    </div>
                    {
                        result && result.laws && result.laws.length > 0 &&
                            <>
                                <h3 className="text-center">Laws</h3>
                                <table className="table bg-white table-hover">
                                    <thead className="text-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Title</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result.laws.map((law, index) => {
                                        return (
                                            <tr key={law._id}>
                                                <th scope="row">
                                                    {index + 1}.
                                                </th>
                                                <td className={'col-md-9'}>
                                                    {law.title}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/law/detail/${law._id}`}
                                                        className="btn btn-info"
                                                    >
                                                        Inspect
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </>
                    }
                    {
                        result && result.initiatives && result.initiatives.length > 0 &&
                            <>
                                <hr/>
                                <h3 className="text-center">Initiatives</h3>
                                <table className="table bg-white table-hover">
                                    <thead className="text-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Title</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result.initiatives.map((initiative, index) => {
                                        return (
                                            <tr key={initiative._id}>
                                                <th scope="row">
                                                    {index + 1}.
                                                </th>
                                                <td className={'col-md-9'}>
                                                    {initiative.title}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/detail/${initiative._id}`}
                                                        className="btn btn-info"
                                                    >
                                                        Inspect
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}