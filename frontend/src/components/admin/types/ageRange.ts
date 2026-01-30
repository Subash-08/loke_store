export interface AgeRange {
    _id: string;
    name: string;
    slug: string;
    startAge: number;
    endAge: number;
    displayLabel: string;
    description?: string;
    image?: {
        url: string;
        altText: string;
        publicId?: string;
    };
    products: string[] | any[]; // Product IDs or Populated Products
    productCount: number;
    order: number;
    isFeatured: boolean;
    status: 'active' | 'inactive';
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AgeRangeFormData {
    name: string;
    startAge: number;
    endAge: number;
    description?: string;
    displayLabel?: string;
    order?: number;
    isFeatured?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    image?: File;
    imageAltText?: string;
    products?: string[];
}

export interface AgeRangeFilters {
    search?: string;
    status?: 'active' | 'inactive' | '';
    minAge?: number;
    maxAge?: number;
    page?: number;
    limit?: number;
}

export interface AgeRangeResponse {
    success: boolean;
    message?: string;
    ageRange?: AgeRange;
    ageRanges?: AgeRange[];
    count?: number;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ProductSelection {
    _id: string;
    name: string;
    slug: string;
    brand: {
        _id: string;
        name: string;
    };
    categories: Array<{
        _id: string;
        name: string;
    }>;
    images: {
        thumbnail: {
            url: string;
        };
    };
    basePrice: number;
    stockQuantity: number;
    selected?: boolean;
}