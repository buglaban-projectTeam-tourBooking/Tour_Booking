import TourListSection from "../components/TourListSection";
import { domesticTours } from "../data/tours";

export default function DomesticToursPage() {
  return (
    <TourListSection
      title="Tour Trong Nước"
      breadcrumb="Trang chủ > Tour Trong Nước"
      description="Khám phá các điểm đến nổi bật tại Việt Nam với lịch trình hấp dẫn, giá tốt và dịch vụ chuyên nghiệp. Các tour trong nước phù hợp cho gia đình, nhóm bạn và doanh nghiệp."
      tours={domesticTours}
      bannerImage="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80"
    />
  );
}
