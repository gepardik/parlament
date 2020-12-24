import React, { Component } from "react";
const { Provider, Consumer } = React.createContext()

class CountryLocalContextProvider extends Component {
    state = {
        country: localStorage.getItem("countryKey"),
        local: localStorage.getItem("localKey")
    }

    selectCountry = selectedCountry => {

        this.setState(() => {
            return {
                country: selectedCountry
            }
        })
    }

    selectLocal = selectedLocal => {
        this.setState(() => {
            return {
                local: selectedLocal
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.country !== prevState.country) {
            localStorage.setItem("countryKey", this.state.country)
            localStorage.removeItem("localKey")
        }

        if (this.state.local !== prevState.local) {
            localStorage.setItem("localKey", this.state.local)
        }
    }

    render() {
        return (
            <Provider
                value={{ country: this.state.country, local: this.state.local, selectCountry: this.selectCountry, selectLocal: this.selectLocal }}
            >
                {this.props.children}
            </Provider>
        )
    }
}

export { CountryLocalContextProvider, Consumer as CountryLocalContextConsumer }