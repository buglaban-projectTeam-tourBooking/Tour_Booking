import CartItem from '../CartItem/CartItem.jsx'
import CouponInput from '../CouponInput/CouponInput.jsx'
import CartSummary from '../CartSummary/CartSummary.jsx'
import './CartSection.css'

export default function CartSection({
  items,
  couponDraft,
  appliedCouponCode,
  couponError,
  subtotal,
  discount,
  total,
  submitError,
  formatVnd,
  onToggleSelected,
  onRemoveItem,
  onSetQty,
  onCouponDraftChange,
  onApplyCoupon,
  onClearCoupon,
}) {
  return (
    <section className="cartSection" aria-label="Giỏ hàng">
      <div className="cartSection__header">
        <h2 className="cartSection__title">Giỏ Hàng</h2>
        <a className="cartSection__backLink" href="#" onClick={(e) => e.preventDefault()}>
          Quay lại mua hàng <span className="cartSection__chev">{'>'}</span>
        </a>
      </div>

      {submitError ? <div className="cartSection__error">{submitError}</div> : null}

      <div className="cartSection__items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            formatVnd={formatVnd}
            onToggleSelected={() => onToggleSelected(item.id)}
            onRemove={() => onRemoveItem(item.id)}
            onSetQty={(field, value) => onSetQty(item.id, field, value)}
          />
        ))}
      </div>

      <div className="cartSection__couponRow">
        <CouponInput
          value={couponDraft}
          applied={appliedCouponCode}
          error={couponError}
          onChange={onCouponDraftChange}
          onApply={onApplyCoupon}
          onClear={onClearCoupon}
        />
      </div>

      <CartSummary subtotal={subtotal} discount={discount} total={total} formatVnd={formatVnd} />
    </section>
  )
}

