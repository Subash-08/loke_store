import React from 'react';
import { AgeRange } from '../types/ageRange';
import { Icons } from '../Icon';
import { getImageUrl } from '../../utils/imageUtils';

interface AgeRangeTableProps {
    ageRanges: AgeRange[];
    loading: boolean;
    onStatusToggle: (id: string, status: 'active' | 'inactive') => void;
    onEdit: (ageRange: AgeRange) => void;
    onManageProducts: (ageRange: AgeRange) => void;
    onDelete: (id: string) => void;
}

const AgeRangeTable: React.FC<AgeRangeTableProps> = ({
    ageRanges,
    loading,
    onStatusToggle,
    onEdit,
    onManageProducts,
    onDelete
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (ageRanges.length === 0) {
        return (
            <div className="text-center py-12">
                <Icons.AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No age ranges found</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Age Range
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Products
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Featured
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {ageRanges.map((ageRange) => (
                        <tr key={ageRange._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {ageRange.image?.url && (
                                        <img
                                            src={getImageUrl(ageRange.image)}
                                            alt={ageRange.image.altText}
                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                        />
                                    )}
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {ageRange.displayLabel}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {ageRange.startAge} - {ageRange.endAge} years
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {ageRange.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    /{ageRange.slug}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {ageRange.productCount} products
                                </div>
                                <button
                                    onClick={() => onManageProducts(ageRange)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Manage
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ageRange.isFeatured
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {ageRange.isFeatured ? 'Yes' : 'No'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onStatusToggle(ageRange._id, ageRange.status)}
                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${ageRange.status === 'active'
                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                        }`}
                                >
                                    {ageRange.status === 'active' ? 'Active' : 'Inactive'}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => onEdit(ageRange)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Edit"
                                    >
                                        <Icons.Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(ageRange._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <Icons.Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AgeRangeTable;
