/**
 * Mock Children Data
 * This data can be replaced with API calls when available
 */

import type { Child } from "@/lib/types/child";

export const mockChildren: Child[] = [
  {
    id: "1",
    code: "NE20997",
    name: "Thào A Quyền",
    age: 7,
    gender: "male",
    grade: "Lớp 1",
    school: "Trường Tiểu học Tủa Chùa",
    district: "Huyện Tủa Chùa",
    province: "Tỉnh Điện Biên",
    story:
      "Em Quyền là con thứ 3 trong gia đình có 4 anh chị em. Bố mẹ em làm nông nghiệp, cuộc sống gia đình còn nhiều khó khăn. Em rất chăm chỉ học tập và mong muốn được đến trường đều đặn.",
    needs: ["Sách vở", "Quần áo", "Bữa ăn trưa"],
    monthlySupport: 150000,
    imageUrl: "/anhnuoi/identity_dien_bien.jpg",
    schoolYear: "2025-2026",
    sponsor: null,
    status: "waiting",
    createdAt: "2025-09-01",
  },
  {
    id: "2",
    code: "NE21045",
    name: "Lò Thị Mai",
    age: 8,
    gender: "female",
    grade: "Lớp 2",
    school: "Trường Tiểu học Mường Lay",
    district: "Thị xã Mường Lay",
    province: "Tỉnh Điện Biên",
    story:
      "Em Mai mồ côi bố từ nhỏ, mẹ em đi làm xa để kiếm tiền nuôi 3 chị em. Em ở với bà ngoại, rất ngoan ngoãn và học giỏi.",
    needs: ["Học phí", "Sách vở", "Đồ dùng học tập"],
    monthlySupport: 150000,
    imageUrl: "/anhnuoi/identity_lai_chau.jpg",
    schoolYear: "2025-2026",
    sponsor: null,
    status: "waiting",
    createdAt: "2025-09-01",
  },
];

export const provinces = [
  "Tỉnh Điện Biên",
  "Tỉnh Lai Châu",
  "Tỉnh Lào Cai",
  "Tỉnh Yên Bái",
  "Tỉnh Hà Giang",
  "Tỉnh Cao Bằng",
];

export const grades = ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"];
