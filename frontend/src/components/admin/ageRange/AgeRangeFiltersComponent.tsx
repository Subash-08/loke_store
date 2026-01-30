import React, { useState } from 'react';
import { AgeRangeFilters } from '../types/ageRange';
import { Icons } from '../Icon';

interface AgeRangeFiltersComponentProps {
    filters: AgeRangeFilters;
    onSearch: (search: string) => void;
    onStatusFilter: (status: string) => void;
    onAgeFilter: (minAge?: number, maxAge?: number) => void;
}

const AgeRangeFiltersComponent: React.FC<AgeRangeFiltersComponentProps> = ({
    filters,
    onSearch,
    onStatusFilter,
    onAgeFilter
}) => {
    const [searchInput, setSearchInput] = useState(filters.search || '');
    const [showAgeFilter, setShowAgeFilter] = useState(false);
    const [minAge, setMinAge] = useState<number | ''>('');
    const [maxAge, setMaxAge] = useState<number | ''>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchInput);
    };

    const handleAgeFilter = () => {
        onAgeFilter(
            minAge !== '' ? Number(minAge) : undefined,
            maxAge !== '' ? Number(maxAge) : undefined
        );
        setShowAgeFilter(false);
    };

    const clearAgeFilter = () => {
        setMinAge('');
        setMaxAge('');
        onAgeFilter(undefined, undefined);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search age ranges..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </form>

                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => onStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Age Filter Button */}
                <button
                    onClick={() => setShowAgeFilter(!showAgeFilter)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <Icons.Filter className="w-5 h-5" />
                    <span>Age Filter</span>
                </button>
            </div>

            {/* Age Filter Dropdown */}
            {showAgeFilter && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Filter by Age</h3>
                        <button
                            onClick={clearAgeFilter}
                            className="text-sm text-red-600 hover:text-red-800"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Min Age
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value ? parseInt(e.target.value) : '')}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Age
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value ? parseInt(e.target.value) : '')}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="100"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleAgeFilter}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgeRangeFiltersComponent;
