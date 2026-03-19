import React, { useMemo, useState } from "react";
import tour1 from "../assets/tour1.svg";
import tour2 from "../assets/tour2.svg";
import tour3 from "../assets/tour3.svg";
import tour4 from "../assets/tour4.svg";
import "./TourDetail.css";

const TourDetail = () => {
  const tour = useMemo(
    () => ({
      id: "dl-3n2d",
      title: "Tour Đà Lạt 3N2Đ",
      subtitle: "Trải nghiệm xứ sở ngàn hoa cùng hành trình đáng nhớ",
      price: 3500000,
      currency: "VND",
      rating: 4.8,
      reviews: 124,
      duration: "3 ngày 2 đêm",
      departure: "Hàng ngày",
      transport: "Xe du lịch",
      hotel: "3 sao",
      maxGroup: 30,
      highlights: [
        "Tham quan Chợ Đà Lạt, Hồ Xuân Hương",
        "Check-in tại Đồi chè Cầu Đất và Quảng trường Lâm Viên",
        "Khám phá thác Datanla và vườn dâu tây",
        "Nghỉ dưỡng khách sạn 3 sao, ăn sáng buffet",
      ],
      include: [
        "Xe đời mới đưa đón theo lịch trình",
        "Khách sạn 3 sao (2 khách/phòng)",
        "Ăn sáng buffet + 4 bữa chính",
        "Vé tham quan các điểm theo chương trình",
      ],
      exclude: [
        "Vé máy bay/xe khách từ nơi đến điểm khởi hành",
        "Chi phí cá nhân, chi phí phát sinh ngoài chương trình",
        "Thuốc men, bảo hiểm du lịch",
      ],
      schedule: [
        {
          day: "Ngày 1",
          title: "Khởi hành - Nhận phòng",
          details: [
            "Tập trung tại điểm hẹn, khởi hành đi Đà Lạt.",
            "Nhận phòng, nghỉ ngơi và tự do khám phá thành phố.",
          ],
        },
        {
          day: "Ngày 2",
          title: "Tham quan các điểm nổi tiếng",
          details: [
            "Tham quan Đồi chè Cầu Đất, Vườn dâu tây, Quảng trường Lâm Viên.",
            "Thưởng thức ẩm thực địa phương và chụp ảnh tại các điểm check-in.",
          ],
        },
        {
          day: "Ngày 3",
          title: "Trở về",
          details: [
            "Dùng điểm tâm, trả phòng và tự do mua sắm đặc sản.",
            "Lên đường về điểm đón ban đầu, kết thúc hành trình.",
          ],
        },
      ],
      policies: [
        "Hủy trước 7 ngày: hoàn 100%.",
        "Hủy trước 3-6 ngày: hoàn 50%.",
        "Hủy dưới 3 ngày hoặc không báo trước: không hoàn tiền.",
      ],
    }),
    []
  );

  const images = [tour1, tour2, tour3, tour4];

  const [mainImg, setMainImg] = useState(images[0]);
  const [activeTab, setActiveTab] = useState("desc");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalPrice = useMemo(() => {
    const adultTotal = tour.price * adults;
    const childrenTotal = tour.price * 0.5 * children;
    return adultTotal + childrenTotal;
  }, [adults, children, tour.price]);

  const formatPrice = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: tour.currency,
      maximumFractionDigits: 0,
    }).format(value);

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateAdults = (delta) => setAdults((prev) => clamp(prev + delta, 1, 10));
  const updateChildren = (delta) => setChildren((prev) => clamp(prev + delta, 0, 10));

  return (
    <div className="tour-detail-page">
      <header className="tour-hero">
        <div
          className="tour-hero-bg"
          style={{ backgroundImage: `url(${mainImg})` }}
        />
        <div className="tour-hero-overlay" />
        <div className="tour-hero-content">
          <nav className="breadcrumb">
            <a href="#">Trang chủ</a>
            <span aria-hidden="true">/</span>
            <a href="#">Tour</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{tour.title}</span>
          </nav>

          <div className="hero-top">
            <div className="hero-headline">
              <h1>{tour.title}</h1>
              <p className="subtitle">{tour.subtitle}</p>
            </div>
            <div className="hero-meta">
              <div className="rating">
                <span className="rating-value">{tour.rating.toFixed(1)}</span>
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(tour.rating))}
                  {tour.rating % 1 ? '☆' : ''}
                </span>
                <span className="rating-count">({tour.reviews} đánh giá)</span>
              </div>
              <div className="price-block">
                <div className="price-title">Giá từ</div>
                <div className="price-value">
                  {formatPrice(tour.price)}{' '}
                  <span className="price-unit">/ khách</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tour-meta-list">
            <div className="meta-item">
              <span className="meta-label">Thời gian</span>
              <span>{tour.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Khởi hành</span>
              <span>{tour.departure}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Phương tiện</span>
              <span>{tour.transport}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Khách sạn</span>
              <span>{tour.hotel}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="tour-main">
        <section className="tour-main-left">
          <div className="tour-gallery">
            <div className="tour-gallery-main">
              <img src={mainImg} alt={tour.title} />
            </div>

            <div className="tour-gallery-thumbs">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={img === mainImg ? "thumb active" : "thumb"}
                  onClick={() => setMainImg(img)}
                  aria-label={`Chọn ảnh ${index + 1}`}
                >
                  <img src={img} alt={`Ảnh ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="tour-tabs">
            <button
              className={activeTab === "desc" ? "tab active" : "tab"}
              onClick={() => setActiveTab("desc")}
            >
              Mô tả
            </button>
            <button
              className={activeTab === "schedule" ? "tab active" : "tab"}
              onClick={() => setActiveTab("schedule")}
            >
              Lịch trình
            </button>
            <button
              className={activeTab === "policy" ? "tab active" : "tab"}
              onClick={() => setActiveTab("policy")}
            >
              Chính sách
            </button>
          </div>

          <section className="tour-content">
            {activeTab === "desc" && (
              <div className="tab-content">
                <p>
                  {tour.title} đưa bạn đến với một hành trình trọn vẹn, khám phá vẻ đẹp
                  nên thơ của Đà Lạt cùng nhiều trải nghiệm ẩm thực và check-in.
                </p>
                <ul className="highlights">
                  {tour.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="info-block">
                  <h3>Bao gồm</h3>
                  <ul>
                    {tour.include.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-block">
                  <h3>Không bao gồm</h3>
                  <ul>
                    {tour.exclude.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="tab-content">
                {tour.schedule.map((item) => (
                  <div key={item.day} className="schedule-day">
                    <div className="schedule-header">
                      <div className="day">{item.day}</div>
                      <div className="title">{item.title}</div>
                    </div>
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "policy" && (
              <div className="tab-content">
                <ul className="policy-list">
                  {tour.policies.map((policy) => (
                    <li key={policy}>{policy}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </section>

        <aside className="tour-sidebar">
          <div className="booking-card">
            <div className="booking-header">
              <div className="booking-title">Đặt tour ngay</div>
              <div className="booking-subtitle">Chỗ chỉ còn lại 5/30</div>
            </div>

            <div className="booking-price">
              <div className="booking-price-label">Giá từ</div>
              <div className="booking-price-value">
                {formatPrice(tour.price)}{' '}
                <span className="booking-price-unit">/ khách</span>
              </div>
            </div>

            <div className="booking-field">
              <label htmlFor="departure-date">Ngày khởi hành</label>
              <input
                id="departure-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="booking-field">
              <div className="field-label">Số lượng</div>
              <div className="counter-row">
                <div className="counter">
                  <label>Người lớn</label>
                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => updateAdults(-1)}
                      disabled={adults <= 1}
                      aria-label="Giảm người lớn"
                    >
                      –
                    </button>
                    <span>{adults}</span>
                    <button
                      type="button"
                      onClick={() => updateAdults(1)}
                      aria-label="Tăng người lớn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="counter">
                  <label>Trẻ em</label>
                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => updateChildren(-1)}
                      disabled={children <= 0}
                      aria-label="Giảm trẻ em"
                    >
                      –
                    </button>
                    <span>{children}</span>
                    <button
                      type="button"
                      onClick={() => updateChildren(1)}
                      aria-label="Tăng trẻ em"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-total">
              <span>Tổng</span>
              <span className="booking-total-value">{formatPrice(totalPrice)}</span>
            </div>

            <button className="btn-book" type="button">
              ĐẶT TOUR
            </button>

            <p className="booking-hint">
              Chọn ngày và số lượng để cập nhật giá. Đặt sớm để giữ chỗ.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TourDetail;
