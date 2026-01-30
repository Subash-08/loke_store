import api from '../../config/axiosConfig';
import { AgeRange, AgeRangeFormData, AgeRangeFilters, AgeRangeResponse, ProductSelection } from '../types/ageRange';

export const ageRangeService = {
    // Get all age ranges (public)
    async getAgeRanges(filters: AgeRangeFilters = {}) {
        const response = await api.get('/age-ranges', { params: filters });
        return response.data;
    },

    // Get featured age ranges (public)
    async getFeaturedAgeRanges() {
        const response = await api.get('/age-ranges/featured');
        return response.data;
    },

    // Get single age range by slug (public)
    async getAgeRangeBySlug(slug: string) {
        const response = await api.get(`/age-range/${slug}`);
        return response.data;
    },

    // Get age range products (public with pagination)
    async getAgeRangeProducts(slug: string, page: number = 1, limit: number = 12) {
        const response = await api.get(`/age-range/${slug}/products`, {
            params: { page, limit }
        });
        return response.data;
    },

    // Admin: Get all age ranges
    async getAdminAgeRanges(filters: AgeRangeFilters = {}) {
        const response = await api.get('/admin/age-ranges', { params: filters });
        return response.data;
    },

    // Admin: Get single age range by ID
    async getAgeRange(id: string) {
        const response = await api.get(`/admin/age-range/${id}`);
        return response.data;
    },

    // Admin: Create age range
    async createAgeRange(formData: FormData) {
        const response = await api.post('/admin/age-range', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // Admin: Update age range
    async updateAgeRange(id: string, formData: FormData) {
        const response = await api.put(`/admin/age-range/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    // Admin: Update age range status
    async updateAgeRangeStatus(id: string, status: 'active' | 'inactive') {
        const response = await api.patch(`/admin/age-range/${id}/status`, { status });
        return response.data;
    },

    // Admin: Delete age range
    async deleteAgeRange(id: string) {
        const response = await api.delete(`/admin/age-range/${id}`);
        return response.data;
    },

    // Admin: Add products to age range
    async addProductsToAgeRange(id: string, productIds: string[]) {
        const response = await api.post(`/admin/age-range/${id}/products`, { productIds });
        return response.data;
    },

    // Admin: Remove products from age range
    async removeProductsFromAgeRange(id: string, productIds: string[]) {
        const response = await api.delete(`/admin/age-range/${id}/products`, {
            data: { productIds }
        });
        return response.data;
    },

    // Admin: Clear all products from age range
    async clearAgeRangeProducts(id: string) {
        const response = await api.delete(`/admin/age-range/${id}/products/clear`);
        return response.data;
    },

    // Helper: Prepare form data for age range
    prepareFormData(data: AgeRangeFormData): FormData {
        const formData = new FormData();

        // Basic fields
        formData.append('name', data.name);
        formData.append('startAge', data.startAge.toString());
        formData.append('endAge', data.endAge.toString());

        if (data.description) formData.append('description', data.description);
        if (data.displayLabel) formData.append('displayLabel', data.displayLabel);
        if (data.order) formData.append('order', data.order.toString());
        if (data.isFeatured) formData.append('isFeatured', data.isFeatured.toString());
        if (data.metaTitle) formData.append('metaTitle', data.metaTitle);
        if (data.metaDescription) formData.append('metaDescription', data.metaDescription);
        if (data.metaKeywords) formData.append('metaKeywords', data.metaKeywords);
        if (data.imageAltText) formData.append('imageAltText', data.imageAltText);

        // Image file
        if (data.image) {
            formData.append('image', data.image);
        }

        // Products
        if (data.products && data.products.length > 0) {
            formData.append('products', JSON.stringify(data.products));
        }

        return formData;
    }
};