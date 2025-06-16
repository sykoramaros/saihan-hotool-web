import React from "react"
import "./Title.css"

const Title = ({ title }) => {
  return (
    <>
      <div className="title-container pt-5 pt-2 pb-3">
        <h1 className="font-5 gray fw-semibold ms-4">{title}</h1>
        <hr className="ms-4" />
      </div>
    </>
  )
}

export default Title
