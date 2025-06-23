import React from "react"

const LoadingSpinner = () => {
  return (
    <>
      <img
      className="position-absolute top-50 start-50 translate-middle"
        src={process.env.PUBLIC_URL + "/img/loading-spinner.svg"}
        width={"100vw"}
      />
    </>
  )
}

export default LoadingSpinner
