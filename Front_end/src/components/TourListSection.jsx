import { useMemo, useState } from "react";
import "./TourListSection.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " đ";
}

function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={tour.image} alt={tour.title} />
        <span className="tour-badge">⚡ GIẢM -{tour.discount}%</span>
      </div>

      <div className="tour-card-body">
        <h3>{tour.title}</h3>

        <div className="tour-price">
          <span className="old-price">{formatPrice(tour.oldPrice)}</span>
          <span className="new-price">{formatPrice(tour.price)}</span>
        </div>

        <div className="tour-meta">
          <p>Mã tour: {tour.code}</p>
          <p>Ngày khởi hành: {tour.startDate}</p>
          <p>Thời gian: {tour.duration}</p>
        </div>

        <div className="tour-bottom">
          <div className="tour-rating">
            {"★".repeat(tour.rating)}
            {"☆".repeat(5 - tour.rating)}
            <span> ({tour.rating})</span>
          </div>
          <div className="tour-seat">Số chỗ còn: {tour.seatsLeft}</div>
        </div>
      </div>
    </div>
  );
}

export default function TourListSection({
  title,
  breadcrumb,
  description,
  tours,
  bannerImage,
}) {
  const [filters, setFilters] = useState({
    keyword: "",
    departure: "",
    destination: "",
    startDate: "",
    guests: "",
    children: "",
    infants: "",
    priceRange: "",
  });

  const [sortType, setSortType] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const toursPerPage = 6;

  const departureOptions = [...new Set(tours.map((item) => item.departure))];
  const destinationOptions = [...new Set(tours.map((item) => item.destination))];

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (filters.keyword.trim()) {
      result = result.filter((tour) =>
        tour.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.departure) {
      result = result.filter((tour) => tour.departure === filters.departure);
    }

    if (filters.destination) {
      result = result.filter((tour) => tour.destination === filters.destination);
    }

    if (filters.startDate) {
      result = result.filter((tour) => {
        const tourDate = tour.startDate.split('/').reverse().join('-');
        return tourDate === filters.startDate;
      });
    }

    if (filters.priceRange) {
      result = result.filter((tour) => {
        if (filters.priceRange === "under-5") return tour.price < 5000000;
        if (filters.priceRange === "5-10") {
          return tour.price >= 5000000 && tour.price <= 10000000;
        }
        if (filters.priceRange === "over-10") return tour.price > 10000000;
        return true;
      });
    }

    if (sortType === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortType === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [tours, filters, sortType]);

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const startIndex = (currentPage - 1) * toursPerPage;
  const currentTours = filteredTours.slice(startIndex, startIndex + toursPerPage);

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      departure: "",
      destination: "",
      priceRange: "",
    });
    setSortType("default");
    setCurrentPage(1);
  };

  return (
    <main className="tour-list-page">
      <section
        className="tour-banner"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="tour-banner-overlay">
          <div className="container">
            <h1>{title}</h1>
            <p>{breadcrumb}</p>
          </div>
        </div>
      </section>

      <section className="tour-content container">
        <aside className="tour-filter">
          <div className="filter-box">
            <h3>Bộ Lọc</h3>

            <input
              type="text"
              name="keyword"
              placeholder="Tìm theo tên tour..."
              value={filters.keyword}
              onChange={handleFilterChange}
            />

            <select
              name="departure"
              value={filters.departure}
              onChange={handleFilterChange}
            >
              <option value="">Điểm đi</option>
              {departureOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
            >
              <option value="">Điểm đến</option>
              {destinationOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="filter-input"              
              placeholder="Ngày khởi hành"
            />

            <div className="guest-row">
              <input
                type="number"
                name="guests"
                min="1"
                value={filters.guests}
                onChange={handleFilterChange}
                placeholder="Người lớn"
              />
              <input
                type="number"
                name="children"
                min="0"
                value={filters.children}
                onChange={handleFilterChange}
                placeholder="Trẻ em"
              />
              <input
                type="number"
                name="infants"
                min="0"
                value={filters.infants}
                onChange={handleFilterChange}
                placeholder="Em bé"
              />
            </div>

            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Mức giá</option>
              <option value="under-5">Dưới 5 triệu</option>
              <option value="5-10">Từ 5 - 10 triệu</option>
              <option value="over-10">Trên 10 triệu</option>
            </select>

            <button className="filter-btn" onClick={handleReset}>
              Làm mới bộ lọc
            </button>
          </div>
        </aside>

        <section className="tour-main">
          <div className="tour-heading">
            <div className="tour-heading-left">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>

            <div className="tour-sort">
              <label htmlFor="sort">Sắp xếp:</label>
              <select
                id="sort"
                value={sortType}
                onChange={(e) => {
                  setSortType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name-asc">Tên A-Z</option>
              </select>
            </div>
          </div>

          <div className="tour-total">
            Tất cả: <strong>{filteredTours.length}</strong> tour
          </div>

          <div className="tour-grid">
            {currentTours.length > 0 ? (
              currentTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            ) : (
              <div className="no-data">Không có tour phù hợp.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                «
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}