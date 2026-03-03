// components/Search/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { productActions } from '../../redux/actions/productActions';
import SearchIcon from '../icons/SearchIcon';
import XIcon from '../icons/XIcon';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchQuery,
} from '../../redux/selectors/productSelector';
import { clearSearchResults, updateSearchQuery } from '../../redux/slices/productSlice';
import { getImageUrl } from '../utils/imageUtils';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get search state from Redux
  const searchResults = useAppSelector(selectSearchResults);
  const searchLoading = useAppSelector(selectSearchLoading);
  const currentSearchQuery = useAppSelector(selectSearchQuery);

  // Initialize with current search query from Redux
  useEffect(() => {
    if (currentSearchQuery) {
      setSearchTerm(currentSearchQuery);
    }
  }, [currentSearchQuery]);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 2) {
        dispatch(productActions.quickSearch(searchTerm.trim()));
        setShowSuggestions(true);
      } else if (searchTerm.trim().length === 0) {
        dispatch(clearSearchResults());
        setShowSuggestions(false);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Update Redux state
      dispatch(updateSearchQuery(searchTerm.trim()));

      // Navigate to products page with search
      // --- CHANGE 1: Updated path from /product to /products ---
      navigate({
        pathname: '/products',
        search: `?${createSearchParams({ search: searchTerm.trim() })}`
      });

      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (product: any) => {
    // Note: Assuming detail page remains /product/slug. 
    // If detail pages should also be /products/slug, change this line too.
    navigate(`/product/${product.slug}`);
    setShowSuggestions(false);
    setSearchTerm('');
    dispatch(clearSearchResults());
  };

  const handleClear = () => {
    setSearchTerm('');
    dispatch(clearSearchResults());
    dispatch(updateSearchQuery(''));
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleViewAllResults = () => {
    if (searchTerm.trim()) {
      dispatch(updateSearchQuery(searchTerm.trim()));
      // --- CHANGE 2: Updated path from /product to /products ---
      navigate({
        pathname: '/products',
        search: `?${createSearchParams({ search: searchTerm.trim() })}`
      });
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for fun toys, games, and more! 🧸"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (searchTerm.trim().length > 2 && searchResults.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
          }}
          className="pl-6 pr-28 py-3 w-full border-2 border-pink-200 rounded-full bg-yellow-50 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 focus:scale-[1.02] shadow-md hover:shadow-lg transition-all duration-300 text-purple-700 placeholder:text-pink-300 text-base font-medium"
          aria-label="Search products"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-pink-200 text-white hover:bg-pink-400 hover:scale-110 transition-all duration-300 p-1.5 rounded-full shadow-sm z-10"
            aria-label="Clear search"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-400 text-white rounded-full p-2 hover:scale-110 hover:bg-sky-500 shadow-md transition-all duration-300 z-10 flex items-center justify-center"
          aria-label="Search"
        >
          <SearchIcon className="w-5 h-5" />
        </button>

      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && isFocused && searchTerm.trim().length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-pink-100 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {searchLoading ? (
            <div className="p-6 text-center text-pink-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-pink-400 mx-auto"></div>
              <p className="mt-3 text-sm font-medium animate-pulse">Searching for fun...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="p-3 space-y-1">
                {searchResults.slice(0, 5).map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full text-left p-3 hover:bg-pink-50 hover:scale-[1.01] rounded-xl transition-all duration-300 mx-auto group flex items-center space-x-4 border border-transparent hover:border-pink-100"
                  >
                    <img
                      src={getImageUrl(product.images?.thumbnail || product.images?.[0])}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded-lg shadow-sm border border-pink-100 bg-white group-hover:shadow-md transition-all"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/48x48?text=Toy";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700 truncate group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm font-semibold text-pink-500">
                        ₹{product.offerPrice || product.basePrice}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 pt-1 border-t-2 border-pink-50 border-dashed">
                <button
                  onClick={handleViewAllResults}
                  className="w-full text-center py-3 text-sm font-bold text-white bg-gradient-to-r from-pink-400 via-yellow-400 to-sky-400 hover:scale-[1.02] rounded-full shadow-md transition-all duration-300"
                >
                  View all {searchResults.length} results for "{searchTerm}" ✨
                </button>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm font-medium">
              Aw, snap! No toys found for "{searchTerm}" 🎈
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;