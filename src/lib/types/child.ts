/**
 * Child Types - Type definitions for children data
 */

export interface Child {
  id: string;
  code: string;
  name: string;
  age: number;
  gender: "male" | "female";
  grade: string;
  school: string;
  district: string;
  province: string;
  story: string;
  needs: string[];
  monthlySupport: number;
  imageUrl: string;
  schoolYear: string;
  sponsor?: {
    name: string;
    type: "individual" | "organization";
  } | null;
  status: "waiting" | "sponsored" | "graduated";
  createdAt: string;
}

export interface ChildrenFilters {
  province?: string;
  district?: string;
  gender?: "male" | "female";
  grade?: string;
  status?: "waiting" | "sponsored";
}

export interface ChildrenResponse {
  children: Child[];
  total: number;
  page: number;
  pageSize: number;
}
