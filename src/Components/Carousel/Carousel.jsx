import React from "react"
import "./Carousel.css"

import { useBaseUrl } from "../../context/BaseUrlProvider"

const Carousel = ({ picture }) => {
  const BASE_URL = useBaseUrl()
  const slider = picture

  return (
    <>
      <div className="carousel-container">
        <div
          id="carouselAutoplaying"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {picture.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                {/* <span className="carousel-text ms-2 mt-1 me-2 px-2 text-white fs-2 fw-medium rounded-1 position-absolute top-0 start-0 z-1">
                  {item.text}
                </span> */}
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={`${BASE_URL}${item.url}`}
                    className="carousel-img"
                    alt={item.alt}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
          <div className="carousel-indicators">
            {slider.map((item, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselAutoplaying"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel
