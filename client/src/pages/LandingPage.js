import React from 'react'

export const LandingPage = () => {
    return (
        <>
            <div className="main">
                <div className="header-block">
                    <div className="logo"></div>
                </div>

                <div className="banner-block"></div>

                <div className="countries-block">
                    <div className="container mb-4">
                        <div className="title"><h5>North America</h5></div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <a href={'/current'}>Canada</a>
                                [<a className="lang" href={'/current'}>EN</a>]
                                [<a className="lang" href={'/current'}>FR</a>]
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Mexico</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>United States</a>
                            </div>
                            <div className="col-sm">

                            </div>
                        </div>
                    </div>
                    <div className="container mb-4">
                        <div className="title"><h5>Central America</h5></div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <a href={'/current'}>Anguila</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Antigua and Barbuda</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Aruba</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Bahamas</a>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <a href={'/current'}>Barbados</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Belize</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Bermuda</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>British Virgin Islands</a>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <a href={'/current'}>El Salvador</a>
                                [<a className="lang" href={'/current'}>EN</a>]
                                [<a className="lang" href={'/current'}>FR</a>]
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Antigua and Barbuda</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Aruba</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Bahamas</a>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <a href={'/current'}>Cayman Islands</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Grenada</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Guadeloupe</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Guatemala</a>
                                [<a className="lang" href={'/current'}>EN</a>]
                                [<a className="lang" href={'/current'}>FR</a>]
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <a href={'/current'}>Anguila</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Antigua and Barbuda</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Aruba</a>
                            </div>
                            <div className="col-sm">
                                <a href={'/current'}>Bahamas</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-block"></div>
        </>
    )
}