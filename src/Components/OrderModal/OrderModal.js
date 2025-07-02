import React from "react"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useLanguage } from "../../context/LanguageProvider"

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

const ORDER_MODAL = gql`
  query GetOrderModal($locale: I18NLocaleCode!) {
    orderModal(locale: $locale) {
      documentId
      email
      address
      city
      country
      checkInDate
      checkOutDate
      roomType
      Economy
      Superior
      Deluxe
      checkMeOut
      BookButton
    }
  }
`

const OrderModal = () => {
  const { documentId } = useParams()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(ORDER_MODAL, {
    variables: {
      locale: currentLocale,
      documentId,
    },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            {data.orderModal.email}
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="@"
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            {data.orderModal.address}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder={data.orderModal.address}
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="inputCity" className="form-label">
            {data.orderModal.city}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            placeholder={data.orderModal.city}
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="inputCountry" className="form-label">
            {data.orderModal.country}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCountry"
            placeholder={data.orderModal.country}
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="inputCheckin" className="form-label">
            {data.orderModal.checkInDate}
          </label>
          <input type="date" className="form-control" id="inputCheckin" />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="inputCheckout" className="form-label">
            {data.orderModal.checkOutDate}
          </label>
          <input type="date" className="form-control" id="inputCheckout" />
        </div>

        <div className="col-12">
          <label className="form-label">{data.orderModal.roomType}</label>
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
                {data.orderModal.Economy}
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
                {data.orderModal.Superior}
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
                {data.orderModal.Deluxe}
              </label>
            </li>
          </ul>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              {data.orderModal.checkMeOut}
            </label>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success text-white">
            {data.orderModal.BookButton}
          </button>
        </div>
      </form>
    </>
  )
}

export default OrderModal
