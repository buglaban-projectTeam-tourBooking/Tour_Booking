import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for domestic tours
const domesticTours = [
  {
    id: "da-nang-1",
    title: "Combo Đà Nẵng 2024: ĐÀ NẴNG - HỘI AN - BÀ NÀ HILL",
    price: 2590000,
    originalPrice: 13650000,
    discount: 30,
    image: "https://via.placeholder.com/300x200?text=Da+Nang+Hoi+An",
    rating: 4.5,
    reviews: 5,
    startDate: "22/07/2024",
    endDate: "Thứ Năm",
    duration: "10 ngày 9 đêm",
    available: 10,
    description: "Hãy cùng khám phá vẻ đẹp của Đà Nẵng, Hội An cổ kính và cảnh tượng tuyệt vời tại Bà Nà Hill.",
  },
  {
    id: "da-nang-2",
    title: "Combo Đà Nẵng 2024: ĐÀ NẴNG - HỘI AN - BÀ NÀ HILL",
    price: 2590000,
    originalPrice: 13650000,
    discount: 30,
    image: "https://via.placeholder.com/300x200?text=Da+Nang+Hoi+An2",
    rating: 4.5,
    reviews: 5,
    startDate: "22/07/2024",
    endDate: "Thứ Năm",
    duration: "10 ngày 9 đêm",
    available: 10,
    description: "Hãy cùng khám phá vẻ đẹp của Đà Nẵng, Hội An cổ kính và cảnh tượng tuyệt vời tại Bà Nà Hill.",
  },
  {
    id: "ho-chi-minh-1",
    title: "Hồ Nội - Lào Cai - SaPa 4N3Đ",
    price: 2590000,
    originalPrice: 13650000,
    discount: 30,
    image: "https://via.placeholder.com/300x200?text=Ha+Noi+Sapa",
    rating: 5,
    reviews: 5,
    startDate: "22/07/2024",
    endDate: "Thứ Năm",
    duration: "10 ngày 9 đêm",
    available: 10,
    description: "Khám phá vẻ đẹp tuyệt vời của Hà Nội, Lào Cai và Sa Pa.",
  },
  {
    id: "phu-quoc-1",
    title: "Tour 2024 Phú Quốc - Thiên Đường Đảo Ngọc (3N2Đ)",
    price: 2590000,
    originalPrice: 13650000,
    discount: 30,
    image: "https://via.placeholder.com/300x200?text=Phu+Quoc",
    rating: 4,
    reviews: 5,
    startDate: "22/07/2022",
    endDate: "Thứ Năm",
    duration: "10 ngày 9 đêm",
    available: 10,
    description: "Hãy khám phá hòn đảo thiên đường Phú Quốc với những bãi biển tuyệt đẹp.",
  },
  {
    id: "sapa-1",
    title: "Combo Đà Nẵng 2024: ĐÀ NẴNG - HỘI AN - BÀ NÀ HILL",
    price: 2590000,
    originalPrice: 13650000,
    discount: 30,
    image: "https://via.placeholder.com/300x200?text=Sapa",
    rating: 4,
    reviews: 5,
    startDate: "22/07/2024",
    endDate: "Thứ Năm",
    duration: "10 ngày 9 đêm",
    available: 10,
    description: "Khám phá vẻ đẹp Sa Pa với những cánh đồng ruộng bậc thang tuyệt vời.",
  },
  {
    id: "ha-long-1",
    title: "Combo Đà Nẵng 2024: ĐÀ NẴNG - HỘI AN - BÀ NÀ HILL",
    price: 2590000,
    originalPrice: 13650000,
    discount: 30,
    image: "https://via.placeholder.com/300x200?text=Ha+Long+Bay",
    rating: 4,
    reviews: 5,
    startDate: "22/07/2024",
    endDate: "Thứ Năm",
    duration: "10 ngày 9 đêm",
    available: 10,
    description: "Khám phá kỳ quan thế giới - Vịnh Hạ Long với những hòn đảo độc đáo.",
  },
];

// Routes
app.get("/api/tours/domestic", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedTours = domesticTours.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: paginatedTours,
    total: domesticTours.length,
    page,
    limit,
    totalPages: Math.ceil(domesticTours.length / limit),
  });
});

app.get("/api/tours/domestic/:id", (req, res) => {
  const tour = domesticTours.find(t => t.id === req.params.id);
  
  if (!tour) {
    return res.status(404).json({ success: false, message: "Tour not found" });
  }
  
  res.json({ success: true, data: tour });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
