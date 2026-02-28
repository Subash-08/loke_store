/**
 * priceUtils.ts
 * Frontend utility for handling inclusive to exclusive tax conversions.
 * Designed to power the Admin Product Form inputs.
 */

/**
 * Normalizes a tax rate safely to a percentage.
 * @param rate - The tax rate (e.g. 18 or 0.18)
 * @returns {number} The percentage tax rate (e.g. 18)
 */
export const normalizeTaxRate = (rate?: number | string | null): number => {
    if (rate === undefined || rate === null || rate === '') return 18;
    let numRate = Number(rate);
    if (isNaN(numRate)) return 18;

    if (numRate > 0 && numRate < 1) {
        numRate = numRate * 100;
    }
    return Math.round(numRate * 100) / 100;
};

/**
 * Calculates the EXCLUSIVE basePrice from a given INCLUSIVE selling price.
 * Formula: exclusivePrice = inclusivePrice / (1 + (taxRate / 100))
 * 
 * @param inclusivePrice - The desired final price including tax
 * @param taxRate - The applicable tax rate percentage (e.g. 18)
 * @returns {number} The basePrice (exclusive of tax) rounded to 2 decimals
 */
export const calculateExclusivePrice = (inclusivePrice: number, taxRate: number = 18): number => {
    if (!inclusivePrice || inclusivePrice <= 0) return 0;
    const rate = normalizeTaxRate(taxRate);
    const exclusive = inclusivePrice / (1 + (rate / 100));
    return Math.round(exclusive * 100) / 100;
};

/**
 * Calculates the INCLUSIVE selling price from a given EXCLUSIVE basePrice.
 * Formula: inclusivePrice = exclusivePrice * (1 + (taxRate / 100))
 * 
 * @param exclusivePrice - The basePrice (exclusive of tax) stored in the DB
 * @param taxRate - The applicable tax rate percentage (e.g. 18)
 * @returns {number} The final price to charge the customer, rounded to 2 decimals
 */
export const calculateInclusivePrice = (exclusivePrice: number, taxRate: number = 18): number => {
    if (!exclusivePrice || exclusivePrice <= 0) return 0;
    const rate = normalizeTaxRate(taxRate);
    const inclusive = exclusivePrice * (1 + (rate / 100));
    return Math.round(inclusive * 100) / 100;
};
