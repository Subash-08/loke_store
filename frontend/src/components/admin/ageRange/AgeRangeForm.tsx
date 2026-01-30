import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AgeRange, AgeRangeFormData } from '../types/ageRange';
import { ageRangeService } from '../services/ageRangeService';
import { Icons } from '../Icon';
import { getImageUrl } from '../../utils/imageUtils';

const AgeRangeForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<AgeRangeFormData>({
        name: '',
        startAge: 0,
        endAge: 0,
        description: '',
        displayLabel: '',
        order: 0,
        isFeatured: false,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
    });

    useEffect(() => {
        if (isEditMode) {
            fetchAgeRange();
        }
    }, [id]);

    const fetchAgeRange = async () => {
        try {
            setLoading(true);
            const response = await ageRangeService.getAgeRange(id!);
            if (response.success && response.ageRange) {
                const ageRange = response.ageRange;
                setFormData({
                    name: ageRange.name,
                    startAge: ageRange.startAge,
                    endAge: ageRange.endAge,
                    description: ageRange.description || '',
                    displayLabel: ageRange.displayLabel || '',
                    order: ageRange.order,
                    isFeatured: ageRange.isFeatured,
                    metaTitle: ageRange.metaTitle || '',
                    metaDescription: ageRange.metaDescription || '',
                    metaKeywords: ageRange.metaKeywords?.join(', ') || '',
                    imageAltText: ageRange.image?.altText || ''
                });

                if (ageRange.image?.url) {
                    setImagePreview(getImageUrl(ageRange.image));
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch age range');
        } finally {
            setLoading(false);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate age range
        if (formData.startAge >= formData.endAge) {
            setError('End age must be greater than start age');
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            const formDataToSend = ageRangeService.prepareFormData(formData);

            let response;
            if (isEditMode) {
                response = await ageRangeService.updateAgeRange(id!, formDataToSend);
            } else {
                response = await ageRangeService.createAgeRange(formDataToSend);
            }

            if (response.success) {
                navigate('/admin/age-ranges');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save age range');
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

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/admin/age-ranges')}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                    <Icons.ArrowLeft className="w-5 h-5" />
                    <span>Back to Age Ranges</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">
                    {isEditMode ? 'Edit Age Range' : 'Create New Age Range'}
                </h1>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Toddlers, Preschoolers"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Age *
                            </label>
                            <input
                                type="number"
                                name="startAge"
                                value={formData.startAge}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Age *
                            </label>
                            <input
                                type="number"
                                name="endAge"
                                value={formData.endAge}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Display Label */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Label
                    </label>
                    <input
                        type="text"
                        name="displayLabel"
                        value={formData.displayLabel}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 1-3 years (leave empty for auto-generated)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        If empty, will be auto-generated as "{formData.startAge}-{formData.endAge} years"
                    </p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe this age range..."
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age Range Image
                    </label>
                    <div className="flex items-center space-x-6">
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                name="imageAltText"
                                value={formData.imageAltText || ''}
                                onChange={handleChange}
                                placeholder="Image alt text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {imagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData(prev => ({ ...prev, image: undefined }));
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                >
                                    <Icons.X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Order
                        </label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            id="isFeatured"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                            Featured Age Range
                        </label>
                    </div>
                </div>

                {/* SEO Section */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={formData.metaTitle}
                                onChange={handleChange}
                                maxLength={60}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {(formData.metaTitle?.length || 0)}/60 characters
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleChange}
                                rows={2}
                                maxLength={160}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {formData.metaDescription?.length || 0}/160 characters
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Keywords (comma separated)
                            </label>
                            <input
                                type="text"
                                name="metaKeywords"
                                value={formData.metaKeywords}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., kids toys, children products, toddler games"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/age-ranges')}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        {submitting && <Icons.Loader className="w-4 h-4 animate-spin" />}
                        <span>{isEditMode ? 'Update' : 'Create'} Age Range</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgeRangeForm;
