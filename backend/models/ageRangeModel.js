const mongoose = require("mongoose");

const ageRangeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Age range name is required'],
            trim: true,
            maxLength: [100, 'Age range name cannot exceed 100 characters']
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: [true, 'Age range slug is required']
        },
        startAge: {
            type: Number,
            required: [true, 'Start age is required'],
            min: [0, 'Start age cannot be negative'],
            max: [100, 'Start age cannot exceed 100']
        },
        endAge: {
            type: Number,
            required: [true, 'End age is required'],
            min: [0, 'End age cannot be negative'],
            max: [100, 'End age cannot exceed 100'],
            validate: {
                validator: function (value) {
                    return value > this.startAge;
                },
                message: 'End age must be greater than start age'
            }
        },
        displayLabel: {
            type: String,
            trim: true,
            default: function () {
                return `${this.startAge}-${this.endAge} years`;
            }
        },
        description: {
            type: String,
            maxLength: [500, 'Description cannot exceed 500 characters']
        },
        // Image for age range (shown in frontend)
        image: {
            url: {
                type: String,
                default: null
            },
            altText: {
                type: String,
                default: null
            },
            publicId: {
                type: String,
                default: null
            }
        },
        // Array of products in this age range
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        productCount: {
            type: Number,
            default: 0,
            min: 0
        },
        // Order for display
        order: {
            type: Number,
            default: 0,
            index: true
        },
        isFeatured: {
            type: Boolean,
            default: false,
            index: true
        },
        // Status Management
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
            index: true
        },
        // SEO Fields
        metaTitle: {
            type: String,
            maxLength: [60, 'Meta title cannot exceed 60 characters']
        },
        metaDescription: {
            type: String,
            maxLength: [160, 'Meta description cannot exceed 160 characters']
        },
        metaKeywords: [{
            type: String,
            lowercase: true,
            trim: true
        }],
        // Audit Fields
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for age range display
ageRangeSchema.virtual("ageRangeDisplay").get(function () {
    return `${this.startAge}-${this.endAge} years`;
});

// Indexes for performance
ageRangeSchema.index({ startAge: 1, endAge: 1 });
ageRangeSchema.index({ slug: 1, status: 1 });
ageRangeSchema.index({ 'image.url': 1 });
ageRangeSchema.index({ isFeatured: -1, order: 1 });
ageRangeSchema.index({ productCount: -1 });

// Pre-save middleware
ageRangeSchema.pre('save', function (next) {
    // Generate slug if not provided
    if (!this.slug) {
        this.slug = this.name.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    // Update display label if not manually set
    if (!this.displayLabel || this.isModified('startAge') || this.isModified('endAge')) {
        this.displayLabel = `${this.startAge}-${this.endAge} years`;
    }

    next();
});

// Pre-save to update product count
ageRangeSchema.pre('save', function (next) {
    if (this.products) {
        this.productCount = this.products.length;
    }
    next();
});

// Instance methods
ageRangeSchema.methods.addProduct = async function (productId) {
    if (!this.products.includes(productId)) {
        this.products.push(productId);
        await this.save();
    }
    return this;
};

ageRangeSchema.methods.removeProduct = async function (productId) {
    const index = this.products.indexOf(productId);
    if (index > -1) {
        this.products.splice(index, 1);
        await this.save();
    }
    return this;
};

ageRangeSchema.methods.clearProducts = async function () {
    this.products = [];
    await this.save();
    return this;
};

ageRangeSchema.methods.updateImage = async function (imageData) {
    this.image = {
        url: imageData.url || this.image.url,
        altText: imageData.altText || this.image.altText,
        publicId: imageData.publicId || this.image.publicId
    };
    return this.save();
};

ageRangeSchema.methods.removeImage = async function () {
    this.image = {
        url: null,
        altText: null,
        publicId: null
    };
    return this.save();
};

// Static methods
ageRangeSchema.statics.getActiveAgeRanges = function () {
    return this.find({ status: "active" })
        .sort({ startAge: 1 })
        .populate('products', 'name slug images.thumbnail.url');
};

ageRangeSchema.statics.getAgeRangesWithImages = function () {
    return this.find({
        status: "active",
        'image.url': { $ne: null }
    }).sort({ order: 1, startAge: 1 });
};

ageRangeSchema.statics.findByAge = function (age) {
    return this.find({
        status: "active",
        startAge: { $lte: age },
        endAge: { $gte: age }
    });
};

ageRangeSchema.statics.getFeaturedAgeRanges = function () {
    return this.find({
        status: "active",
        isFeatured: true
    }).sort({ order: 1 });
};

// Query helpers
ageRangeSchema.query.active = function () {
    return this.where({ status: "active" });
};

ageRangeSchema.query.featured = function () {
    return this.where({ isFeatured: true, status: "active" });
};

ageRangeSchema.query.withProducts = function () {
    return this.where({ productCount: { $gt: 0 } });
};

ageRangeSchema.query.withImages = function () {
    return this.where({ 'image.url': { $ne: null } });
};

module.exports = mongoose.model("AgeRange", ageRangeSchema);
