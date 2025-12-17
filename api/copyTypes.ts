// Import các type bạn đã cung cấp
import { Publication } from './publicationTypes'; 

// Định nghĩa Type cho bản thân cái "Cuốn sách vật lý" (Copy) đang quản lý
export interface BookCopy {
  id: number;
  barcode: string;
  status: 'AVAILABLE' | 'ON_LOAN' | 'LOST' | 'WITHDRAWN' | string; // Type union cho status
  itemType: string;
  location: string;
  price?: number; // Dấu ? vì JSON cũ không thấy trả về, có thể null
  acquiredDate: string;
  publication: Publication; // <--- Quan trọng: Nhúng type Publication chuẩn vào đây
}