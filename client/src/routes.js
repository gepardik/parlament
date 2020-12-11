import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {InitiativesPage} from "./pages/InitiativesPage"
import {CreatePage} from "./pages/CreatePage"
import {DetailPage} from "./pages/DetailPage"
import {LandingPage} from "./pages/LandingPage"
import {HomePage} from "./pages/HomePage"
import {RegisterPage} from "./pages/RegisterPage"
import {LoginPage} from "./pages/LoginPage"
import {PastPage} from "./pages/PastPage";
import {CurrentPage} from "./pages/CurrentPage";
import {Slider} from "./components/Slider";
import {AdminPage} from "./pages/AdminPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <LandingPage />
                </Route>
                <Route path="/home" exact>
                    <Slider />
                    <HomePage />
                </Route>
                <Route path="/top_initiatives" exact>
                    <InitiativesPage type={'top'} />
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
                <Route path="/past">
                    <PastPage />
                </Route>
                <Route path="/admin">
                    <AdminPage />
                </Route>
                <Route path='/current'>
                    <CurrentPage />
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
                <Slider />
                <HomePage />
            </Route>
            <Route path="/top_initiatives" exact>
                <InitiativesPage type={'top'} />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/past">
                <PastPage />
            </Route>
            <Route path='/current'>
                <CurrentPage />
            </Route>
            <Route path="/detail/:id" exact>
                <DetailPage />
            </Route>
            <Redirect to="/current" />
        </Switch>
    )
}