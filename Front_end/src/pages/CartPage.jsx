// CartPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  // Dữ liệu mẫu từ ảnh (bạn có thể thay bằng state từ Redux/Context sau)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tour Châu Âu Đón Noel 11N10Đ | Pháp - Thụy Sĩ - Ý",
      code: "1234565789",
      date: "30/12/2024",
      departure: "Hà Nội",
      image: "https://example.com/europe-christmas.jpg", // thay bằng link thật
      adults: 1,
      children: 0,
      infants: 0,
      adultPrice: 10000000,
      childPrice: 7990000,
      infantPrice: 5990000,
    },
    {
      id: 2,
      name: "Tour Châu Âu Đón Noel 11N10Đ | Pháp - Thụy Sĩ - Ý",
      code: "1234565789",
      date: "30/12/2024",
      departure: "Đà Nẵng",
      image: "https://example.com/europe-christmas-2.jpg",
      adults: 1,
      children: 0,
      infants: 0,
      adultPrice: 10000000,
      childPrice: 7990000,
      infantPrice: 5990000,
    },
  ]);

  const [promoCode, setPromoCode] = useState("TOURMGMHAE2024");
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("transfer"); // 'cash' hoặc 'transfer'

  // Tính tổng (dựa trên ảnh)
  const subtotal = 15070000;
  const discount = 5070000;
  const total = subtotal - discount;

  const handleQuantityChange = (itemId, type, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, [type]: Math.max(0, item[type] + delta) }
          : item,
      ),
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const formatVnd = (value) => `${value.toLocaleString("vi-VN")} đ`;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đặt tour thành công! (Đây chỉ là demo)");
    // Gọi API đặt tour ở đây
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Giỏ Hàng</h1>

        <div className="cart-card">
          <div className="cart-card-header">
            <div className="header-left">
              <span>Giỏ hàng</span>
            </div>
            <div className="header-right">
              <Link to="/tours/domestic" className="header-back-link">
                Chọn tour
              </Link>
            </div>
          </div>

          {cartItems.map((item) => {
            const itemTotal =
              item.adults * item.adultPrice +
              item.children * item.childPrice +
              item.infants * item.infantPrice;

            return (
              <div key={item.id} className="cart-item">
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ×
                </button>
                <div className="item-left">
                  <div className="item-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                  </div>
                  <div className="item-meta">
                    <h3>{item.name}</h3>
                    <p>Mã tour: {item.code}</p>
                    <p>Ngày khởi hành: {item.date}</p>
                    <p>Khởi hành tại: {item.departure}</p>
                  </div>
                </div>
                <div className="item-right">
                  <div className="item-qty-row">
                    <div>Người lớn</div>
                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "adults", -1)
                        }
                      >
                        -
                      </button>
                      <span>{item.adults}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "adults", 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="qty-price">
                      1 x {formatVnd(item.adultPrice)}
                    </div>
                  </div>
                  <div className="item-qty-row">
                    <div>Trẻ em</div>
                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "children", -1)
                        }
                      >
                        -
                      </button>
                      <span>{item.children}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "children", 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="qty-price">
                      0 x {formatVnd(item.childPrice)}
                    </div>
                  </div>
                  <div className="item-qty-row">
                    <div>Em bé</div>
                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "infants", -1)
                        }
                      >
                        -
                      </button>
                      <span>{item.infants}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "infants", 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="qty-price">
                      0 x {formatVnd(item.infantPrice)}
                    </div>
                  </div>
                  <div className="item-subtotal">{formatVnd(itemTotal)}</div>
                </div>
              </div>
            );
          })}

          <div className="promo-row">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="TOURMUAHE2024"
            />
            <button>Đúng Mã</button>
          </div>

          <div className="calc-row">
            <div>
              <div className="calc-label">Tổng tiền:</div>
              <div className="calc-value">{formatVnd(subtotal)}</div>
            </div>
            <div>
              <div className="calc-label">Giảm:</div>
              <div className="calc-value discount">-{formatVnd(discount)}</div>
            </div>
            <div className="calc-final">
              <div className="calc-label">Thanh toán:</div>
              <div className="calc-value total">{formatVnd(total)}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="customer-block">
            <h2>Thông Tin Khách Hàng</h2>
            <div className="customer-fields">
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={customerInfo.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <textarea
              name="note"
              placeholder="Ghi chú"
              value={customerInfo.note}
              onChange={handleInputChange}
            />
          </div>

          <div className="payment-block">
            <h2>Chọn phương thức thanh toán</h2>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Thanh toán tiền mặt khi đi tour
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked={paymentMethod === "transfer"}
                onChange={() => setPaymentMethod("transfer")}
              />
              Chuyển khoản ngân hàng
            </label>
            {paymentMethod === "transfer" && (
              <div className="bank-info">
                <p>Ngân hàng: Vietcombank</p>
                <p>Tên tài khoản: Lê Văn A</p>
                <p>STK: 0123456789</p>
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            ĐẶT TOUR
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
