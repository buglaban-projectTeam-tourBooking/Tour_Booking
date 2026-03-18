import CustomerForm from '../CustomerForm/CustomerForm.jsx'
import PaymentMethods from '../PaymentMethods/PaymentMethods.jsx'
import { bankTransferInfo, PAYMENT_METHODS } from '../../../pages/CartPage/mock.js'
import './CheckoutSection.css'

export default function CheckoutSection({
  customer,
  paymentMethod,
  submitErrors,
  submitted,
  onCustomerChange,
  onPaymentChange,
  onSubmit,
  onDismissSubmitted,
}) {
  return (
    <section className="checkoutSection" aria-label="Thông tin & thanh toán">
      <div className="checkoutSection__inner">
        <CustomerForm customer={customer} errors={submitErrors} onChange={onCustomerChange} />

        <PaymentMethods
          value={paymentMethod}
          onChange={onPaymentChange}
          showBankInfo={paymentMethod === PAYMENT_METHODS.BANK_TRANSFER}
          bankInfo={bankTransferInfo}
        />

        <div className="checkoutSection__actions">
          <button className="checkoutSection__submit" type="button" onClick={onSubmit}>
            ĐẶT TOUR
          </button>
          {submitted ? (
            <div className="checkoutSection__success" role="status">
              <div className="checkoutSection__successTitle">Đặt tour thành công (mock)</div>
              <div className="checkoutSection__successDesc">
                Mình đã validate cơ bản và chuẩn bị sẵn state; bạn chỉ cần nối API backend.
              </div>
              <button
                className="checkoutSection__successBtn"
                type="button"
                onClick={onDismissSubmitted}
              >
                Đóng
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

