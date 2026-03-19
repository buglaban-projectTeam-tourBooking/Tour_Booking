import './CouponInput.css'

export default function CouponInput({ value, applied, error, onChange, onApply, onClear }) {
  const showApplied = Boolean(applied)

  return (
    <div className="coupon">
      <div className="coupon__row">
        <input
          className="coupon__input"
          placeholder="Nhập mã giảm giá"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="coupon__btn" type="button" onClick={onApply}>
          Dùng Mã
        </button>
        {showApplied ? (
          <button className="coupon__clear" type="button" onClick={onClear}>
            Xóa
          </button>
        ) : null}
      </div>
      {error ? <div className="coupon__error">{error}</div> : null}
      {showApplied ? (
        <div className="coupon__applied">
          Đã áp dụng mã: <strong>{applied}</strong>
        </div>
      ) : null}
    </div>
  )
}

