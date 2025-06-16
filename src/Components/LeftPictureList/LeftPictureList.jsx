import React from "react"

const LeftPictureList = ({ header, list, src }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="d-none d-sm-flex justify-content-center align-items-center px-5">
          <img className="img-fluid" src={src} alt="" />
        </div>
        <div className="d-flex flex-column justify-content-center gap-2 px-5">
          <h3 className="fs-2 fw-medium text-center text-sm-start mb-4">
            {header}
          </h3>
          <ul className="">
            {list.map((ls, index) => (
              <li key={index}>
                <h4 className="fs-3 fw-medium">{ls.list_header}</h4>
                <p>{ls.list_item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-sm-none my-3"></div>
        <div className="d-sm-none d-flex justify-content-center align-items-center px-5">
          <img className="img-fluid" src={src} alt="" />
        </div>
      </div>
    </>
  )
}

export default LeftPictureList
