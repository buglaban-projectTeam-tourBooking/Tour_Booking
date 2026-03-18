import QuantitySelector from '../QuantitySelector/QuantitySelector.jsx'
import './CartItem.css'

function SmallInfo({ label, value }) {
  return (
    <div className="cartItem__infoLine">
      <span className="cartItem__infoLabel">{label}</span>
      <span className="cartItem__infoValue">{value}</span>
    </div>
  )
}

export default function CartItem({ item, formatVnd, onToggleSelected, onRemove, onSetQty }) {
  const { title, code, startDate, departFrom, quantities, prices, imageUrl, selected } = item

  return (
    <article className="cartItem">
      <button className="cartItem__remove" type="button" aria-label="Xóa tour" onClick={onRemove}>
        ×
      </button>

      <label className="cartItem__checkWrap">
        <input
          className="cartItem__check"
          type="checkbox"
          checked={selected}
          onChange={onToggleSelected}
        />
        <span className="cartItem__checkUi" aria-hidden="true" />
      </label>

      <img className="cartItem__image" src={imageUrl} alt="" loading="lazy" />

      <div className="cartItem__content">
        <div className="cartItem__top">
          <h3 className="cartItem__title">{title}</h3>
          <div className="cartItem__subInfo">
            <SmallInfo label="Mã Tour:" value={code} />
            <SmallInfo label="Ngày Khởi Hành:" value={startDate} />
            <SmallInfo label="Khởi Hành Tại:" value={departFrom} />
          </div>
        </div>

        <div className="cartItem__qty">
          <div className="cartItem__qtyLabels">
            <div>Người lớn:</div>
            <div>Trẻ em:</div>
            <div>Em bé:</div>
          </div>
          <div className="cartItem__qtyControls">
            <QuantitySelector
              value={quantities.adults}
              min={1}
              onChange={(v) => onSetQty('adults', v)}
            />
            <QuantitySelector
              value={quantities.children}
              min={0}
              onChange={(v) => onSetQty('children', v)}
            />
            <QuantitySelector
              value={quantities.babies}
              min={0}
              onChange={(v) => onSetQty('babies', v)}
            />
          </div>
          <div className="cartItem__qtyPrices">
            <div className="cartItem__priceLine">
              <span className="cartItem__priceQty">{quantities.adults} x</span>
              <span className="cartItem__priceVal">{formatVnd(prices.adults)}</span>
            </div>
            <div className="cartItem__priceLine">
              <span className="cartItem__priceQty">{quantities.children} x</span>
              <span className="cartItem__priceVal">{formatVnd(prices.children)}</span>
            </div>
            <div className="cartItem__priceLine">
              <span className="cartItem__priceQty">{quantities.babies} x</span>
              <span className="cartItem__priceVal">{formatVnd(prices.babies)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

