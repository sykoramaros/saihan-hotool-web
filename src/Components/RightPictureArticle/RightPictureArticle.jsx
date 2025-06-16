import React from "react"

const RightPictureArticle = ({ header, paragraph, src }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="d-flex flex-column justify-content-center gap-2 px-5">
          <h3 className="fs-2 fw-medium text-center text-sm-start">{header}</h3>
          <p className="fs-5 fw-normal text-center text-sm-start">
            {paragraph}
          </p>
        </div>
        <div className="d-sm-none my-3"></div>
        <div className="d-flex justify-content-center align-items-center px-5">
          <img className="img-fluid" src={src} alt="" />
        </div>
      </div>
    </>
  )
}

export default RightPictureArticle
