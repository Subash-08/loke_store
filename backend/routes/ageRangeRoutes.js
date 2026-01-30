const express = require("express");
const router = express.Router();
const {
    createAgeRange,
    getAllAgeRanges,
    getAgeRangeBySlug,
    getAgeRange,
    updateAgeRange,
    updateAgeRangeStatus,
    deleteAgeRange,
    getAdminAgeRanges,
    addProductsToAgeRange,
    removeProductsFromAgeRange,
    clearAgeRangeProducts,
    getAgeRangeProducts,
    getFeaturedAgeRanges
} = require("../controllers/ageRangeController");

const { ageRangeUpload } = require("../config/multerConfig");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authenticate");

// Public Routes
router.get("/age-ranges", getAllAgeRanges);
router.get("/age-ranges/featured", getFeaturedAgeRanges);
router.get("/age-range/:slug", getAgeRangeBySlug);
router.get("/age-range/:slug/products", getAgeRangeProducts);

// Admin Routes
router.get(
    "/admin/age-ranges",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAdminAgeRanges
);

router.post(
    "/admin/age-range",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    ageRangeUpload.single('image'),
    createAgeRange
);

router.get(
    "/admin/age-range/:id",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    getAgeRange
);

router.put(
    "/admin/age-range/:id",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    ageRangeUpload.single('image'),
    updateAgeRange
);

router.patch(
    "/admin/age-range/:id/status",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    updateAgeRangeStatus
);

router.delete(
    "/admin/age-range/:id",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    deleteAgeRange
);

// Product Management for Age Range
router.post(
    "/admin/age-range/:id/products",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    addProductsToAgeRange
);

router.delete(
    "/admin/age-range/:id/products",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    removeProductsFromAgeRange
);

router.delete(
    "/admin/age-range/:id/products/clear",
    isAuthenticatedUser,
    authorizeRoles('admin'),
    clearAgeRangeProducts
);

module.exports = router;
