import React, {useCallback, useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"
import {CountryRegionData} from "react-country-region-selector"
import Pagination from "../components/Pagination";

export const SearchResultsPage = props => {
    const countryContext = props.context
    const phrase = useParams().by
    const [result, setResult] = useState(null)
    const [tableHead, setTableHead] = useState('')
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

            setTableHead(`
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th>Actions</th>
                    </tr>`)

            const lawsHTML = laws.map((law, index) => {
                return (
                    `<tr key="${law._id}">
                        <th scope="row">
                            ${index + 1}.
                        </th>
                        <td class='col-md-9'>
                            ${law.title}
                        </td>
                        <td>
                            <a href="/law/detail/${law._id}" class="btn btn-info">Inspect</a>
                        </td>
                    </tr>`
                )
            })

            const iniHTML = initiatives.map((initiative, index) => {
                return (
                    `<tr key="${initiative._id}">
                        <th scope="row">
                            ${index + 1}.
                        </th>
                        <td class='col-md-9'>
                            ${initiative.title}
                        </td>
                        <td>
                            <a href="/detail/${initiative._id}" class="btn btn-info">Inspect</a>
                        </td>
                    </tr>`
                )
            })

            setResult({initiatives: iniHTML, laws: lawsHTML})
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
                                <Pagination
                                    tableHead={tableHead}
                                    items={result.laws}
                                    limit={10}
                                />
                            </>
                    }
                    {
                        result && result.initiatives && result.initiatives.length > 0 &&
                            <>
                                <hr/>
                                <h3 className="text-center">Initiatives</h3>
                                <Pagination
                                    tableHead={tableHead}
                                    items={result.initiatives}
                                    limit={10}
                                />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}