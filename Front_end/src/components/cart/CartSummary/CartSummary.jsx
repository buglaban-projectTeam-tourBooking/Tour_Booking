import './CartSummary.css'

export default function CartSummary({ subtotal, discount, total, formatVnd }) {
  return (
    <div className="cartSummary">
      <div className="cartSummary__row">
        <span className="cartSummary__label">Tổng tiền</span>
        <span className="cartSummary__value">{formatVnd(subtotal)}</span>
      </div>
      <div className="cartSummary__row">
        <span className="cartSummary__label">Giảm:</span>
        <span className="cartSummary__value cartSummary__value--discount">
          -{formatVnd(discount)}
        </span>
      </div>
      <div className="cartSummary__row cartSummary__row--total">
        <span className="cartSummary__label">Thanh toán:</span>
        <span className="cartSummary__value cartSummary__value--total">{formatVnd(total)}</span>
      </div>
    </div>
  )
}

