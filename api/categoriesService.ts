import axiosInstance from './axiosInstance';
import { ApiResponse, Category } from './publicationTypes';

/**
 * Categories Service
 *
 * Service để gọi API Categories
 */

const categoriesService = {
  /**
   * Lấy tất cả categories
   *
   * @example
   * const result = await categoriesService.getAllCategories();
   */
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    return axiosInstance.get('/categories');
  },
};

export default categoriesService;
