'use client';

import React, { useState } from 'react';
import { ProductFilter, FilterOption } from '@/types';
import { formatPrice, parsePriceRange } from '@/lib/utils/priceFormatter';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: ProductFilter;
  onFiltersChange: (filters: ProductFilter) => void;
  availableFilters: {
    categories: FilterOption[];
    materials: FilterOption[];
    gemstones: FilterOption[];
    subcategories: FilterOption[];
    tags: FilterOption[];
    priceRange: { min: number; max: number };
  };
  className?: string;
}

/**
 * ProductFilters component provides a comprehensive filtering sidebar
 * Supports multiple filter types with collapsible sections and clear indicators
 */
export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  availableFilters,
  className
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['category', 'price', 'material'])
  );
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || availableFilters.priceRange.min,
    max: filters.priceRange?.max || availableFilters.priceRange.max
  });

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleCheckboxFilter = (
    filterKey: keyof ProductFilter,
    value: string,
    checked: boolean
  ) => {
    const currentValues = (filters[filterKey] as string[]) || [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    onFiltersChange({
      ...filters,
      [filterKey]: newValues.length > 0 ? newValues : undefined
    });
  };

  const handlePriceRangeChange = () => {
    onFiltersChange({
      ...filters,
      priceRange: {
        min: priceRange.min,
        max: priceRange.max
      }
    });
  };

  const handleBooleanFilter = (filterKey: keyof ProductFilter, value: boolean) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value
    });
  };

  const clearAllFilters = () => {
    setPriceRange({
      min: availableFilters.priceRange.min,
      max: availableFilters.priceRange.max
    });
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category?.length) count++;
    if (filters.subcategory?.length) count++;
    if (filters.material?.length) count++;
    if (filters.gemstone?.length) count++;
    if (filters.availability?.length) count++;
    if (filters.tags?.length) count++;
    if (filters.priceRange) count++;
    if (filters.featured !== undefined) count++;
    if (filters.new !== undefined) count++;
    if (filters.bestseller !== undefined) count++;
    if (filters.rating !== undefined) count++;
    return count;
  };

  const FilterSection: React.FC<{
    title: string;
    sectionKey: string;
    children: React.ReactNode;
    count?: number;
  }> = ({ title, sectionKey, children, count }) => {
    const isExpanded = expandedSections.has(sectionKey);

    return (
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex w-full items-center justify-between py-2 text-left"
        >
          <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
            {title}
            {count !== undefined && count > 0 && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </span>
          <svg
            className={cn(
              'h-5 w-5 transform transition-transform duration-200',
              isExpanded ? 'rotate-180' : 'rotate-0'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isExpanded && (
          <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  const CheckboxFilter: React.FC<{
    options: FilterOption[];
    selectedValues: string[];
    onChange: (value: string, checked: boolean) => void;
  }> = ({ options, selectedValues, onChange }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={(e) => onChange(option.value, e.target.checked)}
            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-gray-700 flex-1">{option.label}</span>
          <span className="text-xs text-gray-500">({option.count})</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className={cn("bg-white", className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            Clear all ({getActiveFilterCount()})
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <FilterSection 
          title="Category" 
          sectionKey="category"
          count={filters.category?.length}
        >
          <CheckboxFilter
            options={availableFilters.categories}
            selectedValues={filters.category || []}
            onChange={(value, checked) => handleCheckboxFilter('category', value, checked)}
          />
        </FilterSection>

        {/* Subcategory Filter */}
        {availableFilters.subcategories.length > 0 && (
          <FilterSection 
            title="Type" 
            sectionKey="subcategory"
            count={filters.subcategory?.length}
          >
            <CheckboxFilter
              options={availableFilters.subcategories}
              selectedValues={filters.subcategory || []}
              onChange={(value, checked) => handleCheckboxFilter('subcategory', value, checked)}
            />
          </FilterSection>
        )}

        {/* Price Range Filter */}
        <FilterSection title="Price Range" sectionKey="price">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  min={availableFilters.priceRange.min}
                  max={availableFilters.priceRange.max}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  min={availableFilters.priceRange.min}
                  max={availableFilters.priceRange.max}
                />
              </div>
            </div>
            
            <button
              onClick={handlePriceRangeChange}
              className="w-full bg-amber-600 text-white py-2 px-3 rounded text-sm hover:bg-amber-700 transition-colors duration-200"
            >
              Apply Price Range
            </button>
            
            <div className="text-xs text-gray-500">
              Range: {formatPrice(availableFilters.priceRange.min)} - {formatPrice(availableFilters.priceRange.max)}
            </div>
          </div>
        </FilterSection>

        {/* Material Filter */}
        <FilterSection 
          title="Material" 
          sectionKey="material"
          count={filters.material?.length}
        >
          <CheckboxFilter
            options={availableFilters.materials}
            selectedValues={filters.material || []}
            onChange={(value, checked) => handleCheckboxFilter('material', value, checked)}
          />
        </FilterSection>

        {/* Gemstone Filter */}
        {availableFilters.gemstones.length > 0 && (
          <FilterSection 
            title="Gemstones" 
            sectionKey="gemstone"
            count={filters.gemstone?.length}
          >
            <CheckboxFilter
              options={availableFilters.gemstones}
              selectedValues={filters.gemstone || []}
              onChange={(value, checked) => handleCheckboxFilter('gemstone', value, checked)}
            />
          </FilterSection>
        )}

        {/* Availability Filter */}
        <FilterSection 
          title="Availability" 
          sectionKey="availability"
          count={filters.availability?.length}
        >
          <CheckboxFilter
            options={[
              { value: 'in-stock', label: 'In Stock', count: 98 },
              { value: 'low-stock', label: 'Low Stock', count: 12 },
              { value: 'pre-order', label: 'Pre-Order', count: 8 }
            ]}
            selectedValues={filters.availability || []}
            onChange={(value, checked) => handleCheckboxFilter('availability', value, checked)}
          />
        </FilterSection>

        {/* Special Filters */}
        <FilterSection title="Special" sectionKey="special">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.featured === true}
                onChange={(e) => handleBooleanFilter('featured', e.target.checked || undefined)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">Featured Products</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.new === true}
                onChange={(e) => handleBooleanFilter('new', e.target.checked || undefined)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">New Arrivals</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.bestseller === true}
                onChange={(e) => handleBooleanFilter('bestseller', e.target.checked || undefined)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">Bestsellers</span>
            </label>
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Minimum Rating" sectionKey="rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => onFiltersChange({ ...filters, rating })}
                  className="border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < rating ? "text-amber-400 fill-current" : "text-gray-300"
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Tags Filter */}
        {availableFilters.tags.length > 0 && (
          <FilterSection 
            title="Tags" 
            sectionKey="tags"
            count={filters.tags?.length}
          >
            <CheckboxFilter
              options={availableFilters.tags}
              selectedValues={filters.tags || []}
              onChange={(value, checked) => handleCheckboxFilter('tags', value, checked)}
            />
          </FilterSection>
        )}
      </div>
    </div>
  );
};