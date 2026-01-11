/**
 * Mock Meal Proofs Data
 * Thông tin bằng chứng bữa ăn cho trẻ em
 */

import type { MealProof } from "@/lib/api/types";

export const mockMealProofs: MealProof[] = [
  {
    id: "proof-1",
    childId: "1",
    childName: "Thào A Quyền",
    date: "2026-01-10",
    mealType: "lunch",
    description: "Bữa trưa với cơm, thịt kho, rau xào và canh rau cải",
    imageUrl: "/anhnuoi/identity_dien_bien.jpg",
    ipfsCid: "QmXx1234567890abcdefghijklmnopqrstuvwxyz1234",
    txHash:
      "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    submittedBy: "Trường Tiểu học Tủa Chùa",
    verifiedAt: "2026-01-10T12:30:00Z",
  },
  {
    id: "proof-2",
    childId: "1",
    childName: "Thào A Quyền",
    date: "2026-01-09",
    mealType: "lunch",
    description: "Bữa trưa với cơm, cá kho, đậu phụ và canh bí",
    imageUrl: "/anhnuoi/identity_dien_bien.jpg",
    ipfsCid: "QmYy1234567890abcdefghijklmnopqrstuvwxyz5678",
    txHash:
      "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    submittedBy: "Trường Tiểu học Tủa Chùa",
    verifiedAt: "2026-01-09T12:25:00Z",
  },
  {
    id: "proof-3",
    childId: "2",
    childName: "Lò Thị Mai",
    date: "2026-01-10",
    mealType: "lunch",
    description: "Bữa trưa với cơm, trứng chiên, rau muống xào và canh chua",
    imageUrl: "/anhnuoi/identity_lai_chau.jpg",
    ipfsCid: "QmZz1234567890abcdefghijklmnopqrstuvwxyz9012",
    txHash:
      "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
    submittedBy: "Trường Tiểu học Mường Lay",
    verifiedAt: "2026-01-10T12:35:00Z",
  },
  {
    id: "proof-4",
    childId: "2",
    childName: "Lò Thị Mai",
    date: "2026-01-09",
    mealType: "lunch",
    description: "Bữa trưa với cơm, thịt gà kho gừng, rau cải luộc và canh bầu",
    imageUrl: "/anhnuoi/identity_lai_chau.jpg",
    ipfsCid: "QmAa1234567890abcdefghijklmnopqrstuvwxyz3456",
    txHash:
      "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    submittedBy: "Trường Tiểu học Mường Lay",
    verifiedAt: "2026-01-09T12:28:00Z",
  },
  {
    id: "proof-5",
    childId: "1",
    childName: "Thào A Quyền",
    date: "2026-01-08",
    mealType: "lunch",
    description: "Bữa trưa với cơm, thịt lợn rang, su su xào và canh rau ngót",
    imageUrl: "/anhnuoi/identity_dien_bien.jpg",
    ipfsCid: "QmBb1234567890abcdefghijklmnopqrstuvwxyz7890",
    txHash:
      "0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
    submittedBy: "Trường Tiểu học Tủa Chùa",
    verifiedAt: "2026-01-08T12:32:00Z",
  },
  {
    id: "proof-6",
    childId: "2",
    childName: "Lò Thị Mai",
    date: "2026-01-08",
    mealType: "lunch",
    description: "Bữa trưa với cơm, cá rán, đậu cô ve xào và canh mồng tơi",
    imageUrl: "/anhnuoi/identity_lai_chau.jpg",
    ipfsCid: "QmCc1234567890abcdefghijklmnopqrstuvwxyz1234",
    txHash:
      "0x6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
    submittedBy: "Trường Tiểu học Mường Lay",
    verifiedAt: "2026-01-08T12:40:00Z",
  },
];

export const getProofsByChildId = (childId: string): MealProof[] => {
  return mockMealProofs.filter((proof) => proof.childId === childId);
};

export const getRecentProofs = (limit: number = 10): MealProof[] => {
  return [...mockMealProofs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getProofById = (id: string): MealProof | undefined => {
  return mockMealProofs.find((proof) => proof.id === id);
};
