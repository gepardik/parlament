import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {InitiativesPage} from "./pages/InitiativesPage"
import {CreatePage} from "./pages/CreatePage"
import {DetailPage} from "./pages/DetailPage"
import {LandingPage} from "./pages/LandingPage"
import {HomePage} from "./pages/HomePage";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <LandingPage />
            </Route>
            <Route path="/home" exact>
                <HomePage />
            </Route>
            <Route path="/initiatives" exact>
                <InitiativesPage />
            </Route>
            <Route path="/create" exact>
                <CreatePage />
            </Route>
            <Route path="/detail/:id" exact>
                <DetailPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}