const placeholderTourImage =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='220'%20height='150'%20viewBox='0%200%20220%20150'%3E%3Cdefs%3E%3ClinearGradient%20id='g'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23dbeafe'/%3E%3Cstop%20offset='1'%20stop-color='%23ede9fe'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='220'%20height='150'%20rx='12'%20fill='url(%23g)'/%3E%3Cpath%20d='M0%20110%20C40%2090%2080%20135%20120%20115%20C160%2095%20180%20110%20220%2090%20L220%20150%20L0%20150%20Z'%20fill='%23c7d2fe'/%3E%3Ccircle%20cx='175'%20cy='45'%20r='18'%20fill='%23fde68a'/%3E%3Ctext%20x='16'%20y='28'%20font-family='Arial'%20font-size='14'%20fill='%23111'%20opacity='0.7'%3E28.TRAVEL%3C/text%3E%3C/svg%3E"

export const PAYMENT_METHODS = {
  CASH: 'cash',
  MOMO: 'momo',
  BANK_TRANSFER: 'bank_transfer',
}

export const initialCartItems = [
  {
    id: 'tour-1',
    selected: true,
    imageUrl: placeholderTourImage,
    title: 'Tour Châu Âu Đón Noel | 11N10D | Pháp - Thụy Sĩ - Ý',
    code: 'TZ: 123456789',
    startDate: '20/10/2024',
    departFrom: 'Hà Nội',
    quantities: { adults: 1, children: 0, babies: 0 },
    prices: { adults: 10070000, children: 7990000, babies: 5990000 },
  },
  {
    id: 'tour-2',
    selected: true,
    imageUrl: placeholderTourImage,
    title: 'Tour Châu Âu Đón Noel | 11N10D | Pháp - Thụy Sĩ - Ý',
    code: 'TZ: 123456789',
    startDate: '20/10/2024',
    departFrom: 'Hà Nội',
    quantities: { adults: 1, children: 0, babies: 0 },
    prices: { adults: 12070000, children: 7990000, babies: 5990000 },
  },
]

export const initialCustomer = {
  fullName: '',
  phone: '',
  note: '',
}

export const bankTransferInfo = {
  bank: 'Vietcombank',
  accountName: 'Lê Văn A',
  accountNumber: '0123456789',
}

