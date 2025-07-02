import React from "react"

const OrderModal = () => {
  return (
    <>
      <form className="row g-3 ">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>

        <div className="col-12 col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <input
                className="form-check-input me-1"
                type="radio"
                name="listGroupRadio"
                value=""
                id="firstRadio"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="firstRadio">
                Economy
              </label>
            </li>
            <li className="list-group-item">
              <input
                className="form-check-input me-1"
                type="radio"
                name="listGroupRadio"
                value=""
                id="secondRadio"
              />
              <label className="form-check-label" htmlFor="secondRadio">
                Superior
              </label>
            </li>
            <li className="list-group-item">
              <input
                className="form-check-input me-1"
                type="radio"
                name="listGroupRadio"
                value=""
                id="thirdRadio"
              />
              <label className="form-check-label" htmlFor="thirdRadio">
                Deluxe
              </label>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <button type="submit" className="btn btn-success text-white">
            Sign in
          </button>
        </div>
      </form>
    </>
  )
}

export default OrderModal
