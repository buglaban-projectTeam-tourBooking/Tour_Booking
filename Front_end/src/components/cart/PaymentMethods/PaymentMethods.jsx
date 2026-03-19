import BankTransferInfo from '../BankTransferInfo/BankTransferInfo.jsx'
import { PAYMENT_METHODS } from '../../../pages/CartPage/mock.js'
import './PaymentMethods.css'

function Radio({ checked, label, onChange }) {
  return (
    <label className="pay__radio">
      <input className="pay__radioInput" type="radio" checked={checked} onChange={onChange} />
      <span className="pay__radioUi" aria-hidden="true" />
      <span className="pay__radioLabel">{label}</span>
    </label>
  )
}

export default function PaymentMethods({ value, onChange, showBankInfo, bankInfo }) {
  return (
    <div className="pay">
      <h2 className="pay__title">Chọn phương thức thanh toán</h2>

      <div className="pay__list" role="radiogroup" aria-label="Phương thức thanh toán">
        <Radio
          checked={value === PAYMENT_METHODS.CASH}
          label="Thanh toán tiền mặt khi đi tour"
          onChange={() => onChange(PAYMENT_METHODS.CASH)}
        />
        <Radio
          checked={value === PAYMENT_METHODS.MOMO}
          label="Ví MoMo"
          onChange={() => onChange(PAYMENT_METHODS.MOMO)}
        />
        <Radio
          checked={value === PAYMENT_METHODS.BANK_TRANSFER}
          label="Chuyển khoản ngân hàng"
          onChange={() => onChange(PAYMENT_METHODS.BANK_TRANSFER)}
        />
      </div>

      {showBankInfo ? <BankTransferInfo info={bankInfo} /> : null}
    </div>
  )
}

