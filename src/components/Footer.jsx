import React from 'react'

const FooterComponent = () => {
    return (
        <div style={{ backgroundColor: "#328533", position: "relative", bottom: 0}}>
            <div className="container">
                <ul className="nav justify-content-center">
                    <li className="nav-item"><a href="#" className="nav-link" style={{ color: "white" }}>Resep</a></li>
                    <li className="nav-item"><a href="#" className="nav-link" style={{ color: "white" }}>Artikel</a></li>
                    <li className="nav-item"><a href="#" className="nav-link" style={{ color: "white" }}>Premium</a></li>
                </ul>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h6 className="text-center" style={{ color: "white" }}>© Copyright 2021 Masak Asik</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent
