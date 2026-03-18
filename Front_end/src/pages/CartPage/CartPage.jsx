import { useMemo, useReducer } from 'react'
import CartSection from '../../components/cart/CartSection/CartSection.jsx'
import CheckoutSection from '../../components/cart/CheckoutSection/CheckoutSection.jsx'
import { initialCartItems, initialCustomer, PAYMENT_METHODS } from './mock.js'
import { clampInt, formatVnd, normalizeCouponCode } from './utils.js'
import './CartPage.css'

function calcLineTotal(item) {
  const { quantities, prices } = item
  return (
    quantities.adults * prices.adults +
    quantities.children * prices.children +
    quantities.babies * prices.babies
  )
}

function calcSubtotal(items) {
  return items
    .filter((it) => it.selected)
    .reduce((sum, it) => sum + calcLineTotal(it), 0)
}

function calcDiscount({ subtotal, appliedCouponCode }) {
  if (!appliedCouponCode) return 0
  // Match the design screenshot: discount 5.070.000đ for TOURMUAHE2024
  if (appliedCouponCode === 'TOURMUAHE2024') return Math.min(5070000, subtotal)
  return 0
}

function validateCheckout({ items, customer }) {
  const errors = {}
  const selectedCount = items.filter((i) => i.selected).length
  if (selectedCount === 0) errors.cart = 'Vui lòng chọn ít nhất 1 tour.'

  const name = (customer.fullName || '').trim()
  const phone = (customer.phone || '').trim()
  if (!name) errors.fullName = 'Vui lòng nhập họ và tên.'
  if (!phone) errors.phone = 'Vui lòng nhập số điện thoại.'

  return errors
}

function reducer(state, action) {
  switch (action.type) {
    case 'cart/toggleSelected': {
      const { id } = action.payload
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === id ? { ...it, selected: !it.selected } : it,
        ),
        submitErrors: {},
      }
    }
    case 'cart/removeItem': {
      const { id } = action.payload
      return {
        ...state,
        items: state.items.filter((it) => it.id !== id),
        submitErrors: {},
      }
    }
    case 'cart/setQty': {
      const { id, field, value } = action.payload
      return {
        ...state,
        items: state.items.map((it) => {
          if (it.id !== id) return it
          const next = {
            ...it,
            quantities: {
              ...it.quantities,
              [field]: clampInt(value, field === 'adults' ? 1 : 0, 99),
            },
          }
          return next
        }),
        submitErrors: {},
      }
    }
    case 'coupon/setDraft': {
      return { ...state, couponDraft: action.payload.value }
    }
    case 'coupon/apply': {
      const normalized = normalizeCouponCode(state.couponDraft)
      const valid = normalized === 'TOURMUAHE2024'
      return {
        ...state,
        appliedCouponCode: valid ? normalized : '',
        couponError: valid ? '' : normalized ? 'Mã giảm giá không hợp lệ.' : '',
      }
    }
    case 'coupon/clear': {
      return { ...state, appliedCouponCode: '', couponError: '' }
    }
    case 'checkout/setCustomerField': {
      const { field, value } = action.payload
      return {
        ...state,
        customer: { ...state.customer, [field]: value },
        submitErrors: { ...state.submitErrors, [field]: '' },
      }
    }
    case 'checkout/setPaymentMethod': {
      return { ...state, paymentMethod: action.payload.value }
    }
    case 'checkout/submit': {
      const errors = validateCheckout(state)
      if (Object.keys(errors).length > 0) return { ...state, submitErrors: errors }
      // In a real app we'd POST to backend here.
      return { ...state, submitErrors: {}, submitted: true }
    }
    case 'checkout/clearSubmitted': {
      return { ...state, submitted: false }
    }
    default:
      return state
  }
}

export default function CartPage() {
  const [state, dispatch] = useReducer(reducer, {
    items: initialCartItems,
    couponDraft: 'TOURMUAHE2024',
    appliedCouponCode: '',
    couponError: '',
    customer: initialCustomer,
    paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
    submitErrors: {},
    submitted: false,
  })

  const subtotal = useMemo(() => calcSubtotal(state.items), [state.items])
  const discount = useMemo(
    () => calcDiscount({ subtotal, appliedCouponCode: state.appliedCouponCode }),
    [subtotal, state.appliedCouponCode],
  )
  const total = Math.max(0, subtotal - discount)

  return (
    <main className="cartPage">
      <div className="cartPage__container">
        <CartSection
          items={state.items}
          couponDraft={state.couponDraft}
          appliedCouponCode={state.appliedCouponCode}
          couponError={state.couponError}
          subtotal={subtotal}
          discount={discount}
          total={total}
          submitError={state.submitErrors.cart}
          formatVnd={formatVnd}
          onToggleSelected={(id) =>
            dispatch({ type: 'cart/toggleSelected', payload: { id } })
          }
          onRemoveItem={(id) => dispatch({ type: 'cart/removeItem', payload: { id } })}
          onSetQty={(id, field, value) =>
            dispatch({ type: 'cart/setQty', payload: { id, field, value } })
          }
          onCouponDraftChange={(value) =>
            dispatch({ type: 'coupon/setDraft', payload: { value } })
          }
          onApplyCoupon={() => dispatch({ type: 'coupon/apply' })}
          onClearCoupon={() => dispatch({ type: 'coupon/clear' })}
        />

        <CheckoutSection
          customer={state.customer}
          paymentMethod={state.paymentMethod}
          submitErrors={state.submitErrors}
          submitted={state.submitted}
          onCustomerChange={(field, value) =>
            dispatch({ type: 'checkout/setCustomerField', payload: { field, value } })
          }
          onPaymentChange={(value) =>
            dispatch({ type: 'checkout/setPaymentMethod', payload: { value } })
          }
          onSubmit={() => dispatch({ type: 'checkout/submit' })}
          onDismissSubmitted={() => dispatch({ type: 'checkout/clearSubmitted' })}
        />
      </div>
    </main>
  )
}

