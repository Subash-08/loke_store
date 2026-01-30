export interface NavItem {
    label: string;
    href?: string; // Made optional for items with children
    children?: NavItem[];
    icon?: string;
}

export interface Product {
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    status?: string;
}
