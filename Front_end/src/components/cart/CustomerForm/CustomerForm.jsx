import './CustomerForm.css'

export default function CustomerForm({ customer, errors, onChange }) {
  return (
    <div className="custForm">
      <h2 className="custForm__title">Thông Tin Khách Hàng</h2>

      <div className="custForm__grid">
        <div className="custForm__field">
          <input
            className={`custForm__input ${errors.fullName ? 'isError' : ''}`}
            placeholder="Họ và tên"
            value={customer.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
          {errors.fullName ? <div className="custForm__error">{errors.fullName}</div> : null}
        </div>

        <div className="custForm__field">
          <input
            className={`custForm__input ${errors.phone ? 'isError' : ''}`}
            placeholder="Số điện thoại"
            inputMode="tel"
            value={customer.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
          {errors.phone ? <div className="custForm__error">{errors.phone}</div> : null}
        </div>
      </div>

      <div className="custForm__field">
        <textarea
          className="custForm__textarea"
          placeholder="Ghi chú"
          rows={3}
          value={customer.note}
          onChange={(e) => onChange('note', e.target.value)}
        />
      </div>
    </div>
  )
}

