const AgeRange = require('../models/ageRangeModel');
const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Create new age range (Admin only)
exports.createAgeRange = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        startAge,
        endAge,
        description,
        displayLabel,
        order,
        isFeatured,
        metaTitle,
        metaDescription,
        metaKeywords
    } = req.body;

    // Check if age range already exists
    const existingAgeRange = await AgeRange.findOne({
        $or: [
            { name: name.trim() },
            {
                $and: [
                    { startAge: parseInt(startAge) },
                    { endAge: parseInt(endAge) }
                ]
            }
        ]
    });

    if (existingAgeRange) {
        return next(new ErrorHandler('Age range with this name or age range already exists', 400));
    }

    // Handle image if uploaded
    let imageData = null;
    if (req.file) {
        imageData = {
            url: `/uploads/age-ranges/${req.file.filename}`,
            altText: `${name} age range image`,
            publicId: null // Add cloudinary publicId if using cloud storage
        };
    }

    // Generate slug from name
    const slug = name.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

    const ageRange = await AgeRange.create({
        name: name.trim(),
        slug,
        startAge: parseInt(startAge),
        endAge: parseInt(endAge),
        description,
        displayLabel,
        image: imageData,
        order: order || 0,
        isFeatured: isFeatured || false,
        metaTitle,
        metaDescription,
        metaKeywords: metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : [],
        createdBy: req.user._id,
        updatedBy: req.user._id
    });

    res.status(201).json({
        success: true,
        message: 'Age range created successfully',
        ageRange
    });
});

// Get all age ranges (Public)
exports.getAllAgeRanges = catchAsyncErrors(async (req, res, next) => {
    const ageRanges = await AgeRange.find({ status: "active" })
        .sort({ startAge: 1 })
        .select('name slug startAge endAge displayLabel description image order isFeatured productCount');

    res.status(200).json({
        success: true,
        count: ageRanges.length,
        ageRanges
    });
});

// Get featured age ranges (Public)
exports.getFeaturedAgeRanges = catchAsyncErrors(async (req, res, next) => {
    const ageRanges = await AgeRange.find({
        status: "active",
        isFeatured: true,
        'image.url': { $ne: null }
    })
        .sort({ order: 1 })
        .select('name slug startAge endAge displayLabel image');

    res.status(200).json({
        success: true,
        count: ageRanges.length,
        ageRanges
    });
});

// Get single age range by slug (Public)
exports.getAgeRangeBySlug = catchAsyncErrors(async (req, res, next) => {
    const ageRange = await AgeRange.findOne({
        slug: req.params.slug,
        status: "active"
    }).populate({
        path: 'products',
        select: 'name slug brand categories images.thumbnail.url basePrice mrp stockQuantity averageRating totalReviews',
        match: { isActive: true, status: 'Published' },
        populate: [
            { path: 'brand', select: 'name slug' },
            { path: 'categories', select: 'name slug' }
        ]
    });

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    res.status(200).json({
        success: true,
        ageRange
    });
});

// Get single age range by ID (Admin)
exports.getAgeRange = catchAsyncErrors(async (req, res, next) => {
    const ageRange = await AgeRange.findById(req.params.id)
        .populate('products', 'name slug images.thumbnail.url');

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    res.status(200).json({
        success: true,
        ageRange
    });
});

// Update age range (Admin only)
exports.updateAgeRange = catchAsyncErrors(async (req, res, next) => {
    let ageRange = await AgeRange.findById(req.params.id);

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    // Handle image update
    if (req.file) {
        const imageData = {
            url: `/uploads/age-ranges/${req.file.filename}`,
            altText: req.body.imageAltText || `${ageRange.name} age range image`,
            publicId: null
        };
        req.body.image = imageData;
    }

    // Update products if provided
    if (req.body.products) {
        const productIds = Array.isArray(req.body.products)
            ? req.body.products
            : JSON.parse(req.body.products);

        // Validate product IDs
        const validProducts = await Product.find({
            _id: { $in: productIds },
            isActive: true
        }).select('_id');

        req.body.products = validProducts.map(p => p._id);
    }

    ageRange = await AgeRange.findByIdAndUpdate(
        req.params.id,
        {
            ...req.body,
            updatedBy: req.user._id
        },
        {
            new: true,
            runValidators: true
        }
    ).populate('products', 'name slug');

    res.status(200).json({
        success: true,
        message: 'Age range updated successfully',
        ageRange
    });
});

// Update age range status (Admin only)
exports.updateAgeRangeStatus = catchAsyncErrors(async (req, res, next) => {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
        return next(new ErrorHandler('Invalid status value', 400));
    }

    const ageRange = await AgeRange.findByIdAndUpdate(
        req.params.id,
        {
            status,
            updatedBy: req.user._id
        },
        { new: true }
    );

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    res.status(200).json({
        success: true,
        message: `Age range ${status === "active" ? "activated" : "deactivated"} successfully`,
        ageRange
    });
});

// Delete age range (Admin only)
exports.deleteAgeRange = catchAsyncErrors(async (req, res, next) => {
    const ageRange = await AgeRange.findById(req.params.id);

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    // Check if age range has products
    if (ageRange.products.length > 0) {
        return next(new ErrorHandler('Cannot delete age range with associated products. Remove products first.', 400));
    }

    await ageRange.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Age range deleted successfully'
    });
});

// Get all age ranges for admin (with all details)
exports.getAdminAgeRanges = catchAsyncErrors(async (req, res, next) => {
    const ageRanges = await AgeRange.find()
        .sort({ startAge: 1 })
        .populate('products', 'name slug');

    res.status(200).json({
        success: true,
        count: ageRanges.length,
        ageRanges
    });
});

// Add products to age range (Admin only)
exports.addProductsToAgeRange = catchAsyncErrors(async (req, res, next) => {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return next(new ErrorHandler('Product IDs are required', 400));
    }

    const ageRange = await AgeRange.findById(req.params.id);

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    // Validate product IDs
    const validProducts = await Product.find({
        _id: { $in: productIds },
        isActive: true
    }).select('_id');

    // Add products that aren't already in the age range
    const existingProductIds = new Set(ageRange.products.map(p => p.toString()));
    const newProducts = validProducts
        .filter(p => !existingProductIds.has(p._id.toString()))
        .map(p => p._id);

    if (newProducts.length === 0) {
        return next(new ErrorHandler('All products are already in this age range', 400));
    }

    ageRange.products.push(...newProducts);
    await ageRange.save();

    res.status(200).json({
        success: true,
        message: `${newProducts.length} product(s) added to age range`,
        addedCount: newProducts.length,
        ageRange
    });
});

// Remove products from age range (Admin only)
exports.removeProductsFromAgeRange = catchAsyncErrors(async (req, res, next) => {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return next(new ErrorHandler('Product IDs are required', 400));
    }

    const ageRange = await AgeRange.findById(req.params.id);

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    // Remove products
    const initialCount = ageRange.products.length;
    ageRange.products = ageRange.products.filter(
        productId => !productIds.includes(productId.toString())
    );

    const removedCount = initialCount - ageRange.products.length;
    await ageRange.save();

    res.status(200).json({
        success: true,
        message: `${removedCount} product(s) removed from age range`,
        removedCount,
        ageRange
    });
});

// Clear all products from age range (Admin only)
exports.clearAgeRangeProducts = catchAsyncErrors(async (req, res, next) => {
    const ageRange = await AgeRange.findById(req.params.id);

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    const removedCount = ageRange.products.length;
    ageRange.products = [];
    await ageRange.save();

    res.status(200).json({
        success: true,
        message: `All ${removedCount} product(s) removed from age range`,
        removedCount,
        ageRange
    });
});

// Get products for age range (Public with pagination)
exports.getAgeRangeProducts = catchAsyncErrors(async (req, res, next) => {
    const ageRange = await AgeRange.findOne({
        slug: req.params.slug,
        status: "active"
    });

    if (!ageRange) {
        return next(new ErrorHandler('Age range not found', 404));
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Get products with pagination
    const [products, totalProducts] = await Promise.all([
        Product.find({
            _id: { $in: ageRange.products },
            isActive: true,
            status: 'Published'
        })
            .select('name slug brand categories images.thumbnail.url images.hoverImage.url basePrice mrp stockQuantity averageRating totalReviews')
            .populate('brand', 'name slug')
            .populate('categories', 'name slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Product.countDocuments({
            _id: { $in: ageRange.products },
            isActive: true,
            status: 'Published'
        })
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
        success: true,
        ageRange: {
            _id: ageRange._id,
            name: ageRange.name,
            slug: ageRange.slug,
            displayLabel: ageRange.displayLabel,
            image: ageRange.image
        },
        products,
        pagination: {
            totalProducts,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    });
});
