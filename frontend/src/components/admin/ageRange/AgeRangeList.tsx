import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgeRange, AgeRangeFilters } from '../types/ageRange';
import { ageRangeService } from '../services/ageRangeService';
import AgeRangeTable from './AgeRangeTable';
import AgeRangeFiltersComponent from './AgeRangeFiltersComponent';
import { Icons } from '../Icon';

const AgeRangeList: React.FC = () => {
    const navigate = useNavigate();
    const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState<AgeRangeFilters>({
        search: '',
        status: '',
        page: 1,
        limit: 10
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });

    const fetchAgeRanges = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await ageRangeService.getAdminAgeRanges(filters);
            setAgeRanges(response.ageRanges || []);
            setPagination(response.pagination || {
                page: 1,
                limit: 10,
                total: 0,
                pages: 0
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch age ranges');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgeRanges();
    }, [filters]);

    const handleSearch = (search: string) => {
        setFilters(prev => ({ ...prev, search, page: 1 }));
    };

    const handleStatusFilter = (status: string) => {
        setFilters(prev => ({ ...prev, status, page: 1 }));
    };

    const handleAgeFilter = (minAge?: number, maxAge?: number) => {
        setFilters(prev => ({
            ...prev,
            minAge,
            maxAge,
            page: 1
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    const handleStatusToggle = async (ageRangeId: string, currentStatus: 'active' | 'inactive') => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await ageRangeService.updateAgeRangeStatus(ageRangeId, newStatus);
            fetchAgeRanges(); // Refresh the list
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update age range status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this age range?')) {
            return;
        }

        try {
            await ageRangeService.deleteAgeRange(id);
            fetchAgeRanges(); // Refresh the list
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete age range');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Age Range Management</h1>
                    <p className="text-gray-600">Manage age ranges for product categorization</p>
                </div>
                <button
                    onClick={() => navigate('/admin/age-ranges/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                    <Icons.Plus className="w-5 h-5" />
                    <span>Add Age Range</span>
                </button>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Filters */}
            <AgeRangeFiltersComponent
                filters={filters}
                onSearch={handleSearch}
                onStatusFilter={handleStatusFilter}
                onAgeFilter={handleAgeFilter}
            />

            {/* Age Ranges Table */}
            <div className="bg-white rounded-lg shadow">
                <AgeRangeTable
                    ageRanges={ageRanges}
                    loading={loading}
                    onStatusToggle={handleStatusToggle}
                    onEdit={(ageRange) => navigate(`/admin/age-ranges/edit/${ageRange._id}`)}
                    onManageProducts={(ageRange) => navigate(`/admin/age-ranges/${ageRange._id}/products`)}
                    onDelete={handleDelete}
                />
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-700">
                        Page {pagination.page} of {pagination.pages}
                    </span>

                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AgeRangeList;
