import './QuantitySelector.css'

export default function QuantitySelector({ value, min = 0, max = 99, onChange }) {
  const safeValue = Number.isFinite(value) ? value : min

  const dec = () => onChange(Math.max(min, safeValue - 1))
  const inc = () => onChange(Math.min(max, safeValue + 1))

  return (
    <div className="qtySel" role="group" aria-label="Số lượng">
      <input
        className="qtySel__input"
        inputMode="numeric"
        type="number"
        min={min}
        max={max}
        value={safeValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="qtySel__arrows">
        <button className="qtySel__btn" type="button" aria-label="Tăng" onClick={inc}>
          ▲
        </button>
        <button className="qtySel__btn" type="button" aria-label="Giảm" onClick={dec}>
          ▼
        </button>
      </div>
    </div>
  )
}

