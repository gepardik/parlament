import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {InitiativesPage} from "./pages/InitiativesPage"
import {CreatePage} from "./pages/CreatePage"
import {DetailPage} from "./pages/DetailPage"
import {LandingPage} from "./pages/LandingPage"
import {HomePage} from "./pages/HomePage"
import {RegisterPage} from "./pages/RegisterPage"
import {LoginPage} from "./pages/LoginPage"
import {Slider} from "./components/Slider"
import {AdminPage} from "./pages/AdminPage"
import {LawsPage} from "./pages/LawsPage"
import {LawDetailPage} from "./pages/LawDetailPage"
import {CountryLocalContextConsumer} from "./context/CountryLocalContext"
import {SearchResultsPage} from "./pages/SearchResultsPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <LandingPage />
                </Route>
                <Route path="/home" exact>
                    <CountryLocalContextConsumer>
                        {context => (
                            <>
                                <Slider context={context} />
                                <HomePage context={context} />
                            </>

                        )}
                    </CountryLocalContextConsumer>
                </Route>
                <Route path="/top_initiatives" exact>
                    <CountryLocalContextConsumer>
                        {context => (
                            <InitiativesPage type={'top'} context={context} />
                        )}
                    </CountryLocalContextConsumer>

                </Route>
                <Route path="/my_initiatives" exact>
                    <InitiativesPage type={'my'} />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/law/detail/:id">
                    <LawDetailPage />
                </Route>
                <Route path="/past">
                    <CountryLocalContextConsumer>
                        {context => (
                            <LawsPage type={'past'} context={context} />
                        )}
                    </CountryLocalContextConsumer>
                </Route>
                <Route path="/admin">
                    <AdminPage />
                </Route>
                <Route path='/current'>
                    <CountryLocalContextConsumer>
                        {context => (
                            <LawsPage type={'current'} context={context} />
                        )}
                    </CountryLocalContextConsumer>
                </Route>
                <Route path="/search/:by">
                    <CountryLocalContextConsumer>
                        {context => (
                            <SearchResultsPage context={context} />
                        )}
                    </CountryLocalContextConsumer>
                </Route>
                <Redirect to="/current" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <LandingPage />
            </Route>
            <Route path="/home" exact>
                <CountryLocalContextConsumer>
                    {context => (
                        <>
                            <Slider context={context} />
                            <HomePage context={context} />
                        </>

                    )}
                </CountryLocalContextConsumer>
            </Route>
            <Route path="/top_initiatives" exact>
                <CountryLocalContextConsumer>
                    {context => (
                        <InitiativesPage type={'top'} context={context} />
                    )}
                </CountryLocalContextConsumer>
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/past">
                <CountryLocalContextConsumer>
                    {context => (
                        <LawsPage type={'past'} context={context} />
                    )}
                </CountryLocalContextConsumer>
            </Route>
            <Route path='/current'>
                <CountryLocalContextConsumer>
                    {context => (
                        <LawsPage type={'current'} context={context} />
                    )}
                </CountryLocalContextConsumer>
            </Route>
            <Route path="/detail/:id" exact>
                <DetailPage />
            </Route>
            <Route path="/law/detail/:id">
                <LawDetailPage />
            </Route>
            <Route path="/search/:by">
                <CountryLocalContextConsumer>
                    {context => (
                        <SearchResultsPage context={context} />
                    )}
                </CountryLocalContextConsumer>
            </Route>
            <Redirect to="/current" />
        </Switch>
    )
}