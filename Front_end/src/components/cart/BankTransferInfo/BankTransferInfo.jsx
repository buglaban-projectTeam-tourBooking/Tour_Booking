import './BankTransferInfo.css'

export default function BankTransferInfo({ info }) {
  return (
    <div className="bankInfo" aria-label="Thông tin chuyển khoản">
      <div className="bankInfo__title">Thông tin chuyển khoản</div>
      <div className="bankInfo__row">
        <span className="bankInfo__label">Ngân hàng:</span>
        <span className="bankInfo__value">{info.bank}</span>
      </div>
      <div className="bankInfo__row">
        <span className="bankInfo__label">Tên tài khoản:</span>
        <span className="bankInfo__value">{info.accountName}</span>
      </div>
      <div className="bankInfo__row">
        <span className="bankInfo__label">STK:</span>
        <span className="bankInfo__value">{info.accountNumber}</span>
      </div>
    </div>
  )
}

