import React from "react"

const PartnershipCard = ({ partnership }) => {
  return (
    <>
      <div>
        <div className="d-flex justify-content-center align-items-center w-100 border border-1 shadow-sm px-3 py-1">
          <img
            src={partnership.src}
            alt="Realizace"
            className="w-100"
            style={{ filter: "grayscale(100%)" }}
          />
        </div>
      </div>
    </>
  )
}

export default PartnershipCard
