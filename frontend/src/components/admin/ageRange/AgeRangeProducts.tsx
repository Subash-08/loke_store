import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AgeRange, ProductSelection } from '../types/ageRange';
import { ageRangeService } from '../services/ageRangeService';
import { productService } from '../services/productService';
import { getImageUrl } from '../../utils/imageUtils';
import { Icons } from '../Icon';

const AgeRangeProducts: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [ageRange, setAgeRange] = useState<AgeRange | null>(null);
    const [products, setProducts] = useState<ProductSelection[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (id) {
            fetchAgeRange();
        }
    }, [id]);

    // Fetch products when modal opens
    useEffect(() => {
        if (showAddModal) {
            fetchProducts('', 1);
        }
    }, [showAddModal]);

    const fetchAgeRange = async () => {
        try {
            setLoading(true);
            const response = await ageRangeService.getAgeRange(id!);
            if (response.success && response.ageRange) {
                setAgeRange(response.ageRange);
                setSelectedProducts(response.ageRange.products);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch age range');
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (searchTerm: string = '', pageNum: number = 1) => {
        try {
            const response = await productService.getProductsForSelection({
                search: searchTerm,
                page: pageNum,
                limit: 10
            });

            if (response.success && response.products) {
                // Get existing product IDs (handle both strings and objects)
                const existingProductIds = ageRange?.products.map((p: any) =>
                    typeof p === 'string' ? p : p._id
                ) || [];

                // Filter out already selected products
                const availableProducts = response.products.filter((p: any) =>
                    !existingProductIds.includes(p._id)
                );

                // Map response to match ProductSelection interface
                const mappedProducts: ProductSelection[] = availableProducts.map((p: any) => ({
                    _id: p._id,
                    name: p.name,
                    slug: p.slug,
                    brand: p.brand,
                    categories: p.categories,
                    images: p.images,
                    basePrice: p.basePrice || p.price || 0,
                    stockQuantity: p.totalStock || p.stock || 0
                }));
                setProducts(mappedProducts);
                setTotalPages(response.totalPages || 1);
                setPage(pageNum);
            }
        } catch (err: any) {
            console.error('Failed to fetch products:', err);
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(p => p._id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleAddProducts = async () => {
        if (selectedProducts.length === 0) return;

        try {
            setSubmitting(true);
            await ageRangeService.addProductsToAgeRange(id!, selectedProducts);
            fetchAgeRange();
            setShowAddModal(false);
            setSelectedProducts([]);
            setSearch('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add products');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoveProducts = async (productIds: string[]) => {
        if (productIds.length === 0) return;

        try {
            setSubmitting(true);
            await ageRangeService.removeProductsFromAgeRange(id!, productIds);
            fetchAgeRange();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to remove products');
        } finally {
            setSubmitting(false);
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm('Are you sure you want to remove all products from this age range?')) {
            return;
        }

        try {
            setSubmitting(true);
            await ageRangeService.clearAgeRangeProducts(id!);
            fetchAgeRange();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to clear products');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!ageRange) {
        return (
            <div className="text-center py-12">
                <Icons.AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Age range not found</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <button
                        onClick={() => navigate('/admin/age-ranges')}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-2"
                    >
                        <Icons.ArrowLeft className="w-5 h-5" />
                        <span>Back to Age Ranges</span>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Manage Products: {ageRange.name}
                    </h1>
                    <p className="text-gray-600">{ageRange.displayLabel}</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                        <Icons.Plus className="w-5 h-5" />
                        <span>Add Products</span>
                    </button>
                    {ageRange.products.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                        >
                            <Icons.Trash className="w-5 h-5" />
                            <span>Clear All</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Products</div>
                    <div className="text-2xl font-bold text-gray-900">{ageRange.productCount}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Display Label</div>
                    <div className="text-lg font-medium text-gray-900">{ageRange.displayLabel}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="text-lg font-medium text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-sm ${ageRange.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {ageRange.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Current Products */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-medium text-gray-900">Current Products</h2>
                    <p className="text-sm text-gray-600">Products assigned to this age range</p>
                </div>

                {ageRange.products.length === 0 ? (
                    <div className="text-center py-12">
                        <Icons.Products className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No products assigned yet</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="mt-4 text-blue-600 hover:text-blue-800"
                        >
                            Add products to get started
                        </button>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Product
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Brand
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Categories
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Stock
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {ageRange.products.map((product: any) => (
                                        typeof product === 'object' ? (
                                            <tr key={product._id}>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {product.images?.[0]?.url || product.images?.thumbnail?.url ? (
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={getImageUrl(product.images?.thumbnail?.url ? { url: product.images.thumbnail.url } : product.images?.[0])}
                                                                    alt={product.name}
                                                                />
                                                            ) : (
                                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                                    <Icons.Products className="h-6 w-6 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                            <div className="text-sm text-gray-500">{product.slug}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{product.brand?.name || 'N/A'}</div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {product.categories?.map((c: any) => c.name).join(', ') || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">₹{(product.basePrice || product.price || 0).toFixed(2)}</div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(product.stockQuantity || product.totalStock) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {(product.stockQuantity || product.totalStock) > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleRemoveProducts([product._id])}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Icons.Trash className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={product}>
                                                <td colSpan={6} className="px-4 py-3 text-center text-sm text-gray-500">
                                                    Product details not available (ID: {product})
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Products Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Add Products</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <Icons.X className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="text-gray-600 mt-1">Select products to add to this age range</p>
                        </div>

                        <div className="p-6">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            fetchProducts(e.target.value, 1);
                                        }}
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Product Selection */}
                            <div className="border rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.length === products.length && products.length > 0}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 text-blue-600 rounded"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            Select All ({selectedProducts.length} selected)
                                        </span>
                                    </div>
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {products.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Icons.Products className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-500">No products found</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y">
                                            {products.map((product) => (
                                                <div
                                                    key={product._id}
                                                    className="flex items-center px-4 py-3 hover:bg-gray-50"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.includes(product._id)}
                                                        onChange={() => handleSelectProduct(product._id)}
                                                        className="h-4 w-4 text-blue-600 rounded"
                                                    />
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center">
                                                            {product.images?.thumbnail?.url && (
                                                                <img
                                                                    src={getImageUrl({ url: product.images.thumbnail.url })}
                                                                    alt={product.name}
                                                                    className="w-10 h-10 object-cover rounded mr-3"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {product.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {product.brand?.name} • {product.categories?.map(c => c.name).join(', ')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium text-gray-900">
                                                            ₹{product.basePrice.toFixed(2)}
                                                        </div>
                                                        <div className={`text-sm ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'
                                                            }`}>
                                                            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-4 mt-4">
                                    <button
                                        onClick={() => fetchProducts(search, page - 1)}
                                        disabled={page === 1}
                                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => fetchProducts(search, page + 1)}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProducts}
                                disabled={selectedProducts.length === 0 || submitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                            >
                                {submitting && <Icons.Loader className="w-4 h-4 animate-spin" />}
                                <span>Add {selectedProducts.length} Products</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgeRangeProducts;
