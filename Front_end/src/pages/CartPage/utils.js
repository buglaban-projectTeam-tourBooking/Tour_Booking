export function clampInt(value, min, max) {
  const n = Number.parseInt(String(value ?? '').trim(), 10)
  if (Number.isNaN(n)) return min
  return Math.min(max, Math.max(min, n))
}

export function formatVnd(amount) {
  const safe = Math.max(0, Math.round(Number(amount) || 0))
  return `${safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}\u00a0đ`
}

export function normalizeCouponCode(code) {
  return String(code || '').trim().toUpperCase()
}

