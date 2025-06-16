import React from "react"

const HorizontalScrollingContainer = ({
  title,
  subheading,
  info,
  footer,
  src,
}) => {
  return (
    <>
      <div className="card">
        <img
          src={src}
          className="card-img-top w-75 mx-auto mt-4"
          alt="picture"
        />
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          <small
            className="card-subtitle fw-light text-center text-body-secondary"
            style={{ fontSize: "0.9rem" }}
          >
            {subheading}
          </small>
          <p className="card-text fw-lighter text-center mt-1">{info}</p>
        </div>
        <div className="card-footer">
          <small className="text-body-secondary text-center">{footer}</small>
        </div>
      </div>
    </>
  )
}

export default HorizontalScrollingContainer
