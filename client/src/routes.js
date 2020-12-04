import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {InitiativesPage} from "./pages/InitiativesPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
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