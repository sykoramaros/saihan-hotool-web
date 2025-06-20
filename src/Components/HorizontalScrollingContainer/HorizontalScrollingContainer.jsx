import React from "react"
import { useBaseUrl } from "../../context/BaseUrlProvider"

const HorizontalScrollingContainer = ({
  image,
  title,
  tablePersonTitle,
  tableNightTitle,
  tableWeekTitle,
  tableRow,
  bookButton,
}) => {
  const BASE_URL = useBaseUrl()

  return (
    <>
      <div className="card">
        <img
          src={BASE_URL + image?.url}
          className="card-img-top img-fluid mx-auto mt-4"
          alt={image?.alternativeText}
          style={{ maxHeight: "175px" }}
          // height={"175px"}
        />
        <div className="">
          <h5 className="card-title display-6 text-center">{title}</h5>
        </div>
        <div className="card-body">
          <table className="table text-center">
            <thead>
              <tr>
                <th>{tablePersonTitle}</th>
                <th>{tableNightTitle}</th>
                <th>{tableWeekTitle}</th>
              </tr>
            </thead>
            <tbody>
              {tableRow.map((tr, index) => (
                <tr key={index}>
                  <td>{tr.PersonNumber}</td>
                  <td>{tr.NightPrice}$</td>
                  <td>{tr.WeekPrice}$</td>
                </tr>
              ))}
              {}
            </tbody>
          </table>
        </div>
        <div className="card-footer d-flex justify-content-center bg-transparent">
          <button className="btn btn-success w-75">{bookButton}</button>
        </div>
      </div>
    </>
  )
}

export default HorizontalScrollingContainer
