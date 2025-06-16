import React from "react"

const SubtitledArticle = ({ subtitle, article }) => {
  return (
    <>
      <div className="row mb-2">
        <div className="col-12 col-sm-3">
          <h2 className="fs-4">{subtitle}</h2>
        </div>
        <div className="col-12 col-sm-9">
          <p className="fs-6">{article}</p>
        </div>
      </div>
    </>
  )
}

export default SubtitledArticle
