import React from "react"

const TextBox = ({ text }) => {
  return (
    <>
      <div className="row d-flex justify-content-center">
        <p className="col-9 col-sm-7 fs-5 fw-normal text-center">{text}</p>
      </div>
    </>
  )
}

export default TextBox
