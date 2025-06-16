import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <div className="container-fluid shadow">
        <div className="footer-container row p-4">
          <div className="d-block d-sm-none col-sm-12 d-flex justify-content-center align-items-center mb-3">
            <Link
              to="/contacts"
              className="text-white text-center d-block text-decoration-none fs-1 bg-green py-2 px-3"
            >
              Contact Us
            </Link>
          </div>
          <div className="col-6 col-sm-4 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center py-1 gray roounded-1 fs-5 h-100">
              <address className="text-end mb-0">TZB Orlová s.r.o.</address>
              <address className="text-end mb-0 ">Slezská 1288</address>
              <address className="text-end mb-0 ">735 14 Orlová-Poruba</address>
            </div>
          </div>
          <div className="d-none d-sm-block col-sm-4 d-flex justify-content-center align-items-center">
            <Link
              to="/contacts"
              className="text-white text-center d-block text-decoration-none bg-green p-2 rounded-1 fs-1"
            >
              Contact Us
            </Link>
          </div>
          <div className="col-6 col-sm-4 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center py-1 gray rounded-1 fs-5 h-100">
              <Link
                to="/data-protections"
                className="text-start green mb-0 text-decoration-none"
              >
                Data Protections
              </Link>
              <p className="text-start mb-0">Copyright © 2025</p>
              <p className="text-start mb-0">All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
