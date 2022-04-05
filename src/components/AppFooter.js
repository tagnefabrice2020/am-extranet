import React from "react"

const AppFooter = () => {
    return (
        <footer className="main-footer" style={{maxHeight: `57px`, height: `57px`}}>
            <div className="float-right d-none d-sm-block">
            <b>Version</b> 1.0.0
            </div>
            <strong>Copyright © 2021 <a href="amexpert.pro" target="_blank" style={{color: `black`}}>Amexpert</a>.</strong> Tous droits réservés.
        </footer>
    )
}

export default AppFooter;