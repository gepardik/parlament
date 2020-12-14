import React from 'react'
import CountryRegionSelector from "../components/CounryRegionSelector"
import AdminCountryPage from "./AdminCountryPage"

export const AdminPage = () => {
    return (
        <div className="container">
            <h1>Admin Page</h1>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-countries" role="tab"
                       aria-controls="nav-countries" aria-selected="true">Contries</a>
                    <a className="nav-link" id="nav-laws-tab" data-bs-toggle="tab" href="#nav-laws" role="tab"
                       aria-controls="nav-laws" aria-selected="false">Laws</a>
                    <a className="nav-link" id="nav-slider-tab" data-bs-toggle="tab" href="#nav-slider" role="tab"
                       aria-controls="nav-slider" aria-selected="false">Slider</a>
                    <a className="nav-link" id="nav-users-tab" data-bs-toggle="tab" href="#nav-users" role="tab"
                       aria-controls="nav-users" aria-selected="false">Users</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {/* Countries */}
                <div className="tab-pane fade show active"
                     id="nav-countries"
                     role="tabpanel"
                     aria-labelledby="nav-countries-tab"
                >
                    <AdminCountryPage />
                </div>

                {/* Laws */}
                <div className="tab-pane fade" id="nav-laws" role="tabpanel" aria-labelledby="nav-laws-tab">Laws
                    <CountryRegionSelector />
                </div>
                <div className="tab-pane fade" id="nav-slider" role="tabpanel" aria-labelledby="nav-slider-tab">Slider
                </div>
                <div className="tab-pane fade" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">Users
                </div>
            </div>
        </div>
    )
}