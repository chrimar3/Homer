'use client';

import React, { useState } from 'react';
import { Product, ProductCustomization, ProductCustomizationOption } from '@/types';
import { formatPrice } from '@/lib/utils/priceFormatter';
import { cn } from '@/lib/utils';

interface ProductOptionsProps {
  product: Product;
  onOptionsChange?: (options: Record<string, string>, priceAdjustment: number) => void;
  className?: string;
}

interface SelectedOptions {
  [key: string]: string;
}

/**
 * ProductOptions component handles product customization and option selection
 * Supports size, material, gemstone, engraving, and color customizations
 */
export const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  onOptionsChange,
  className
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product.customizable || !product.customizationOptions) {
    return null;
  }

  const calculatePriceAdjustment = (options: SelectedOptions): number => {
    let adjustment = 0;
    
    product.customizationOptions?.forEach(customization => {
      const selectedValue = options[customization.type];
      if (selectedValue) {
        const selectedOption = customization.options.find(opt => opt.value === selectedValue);
        if (selectedOption?.price) {
          adjustment += selectedOption.price;
        }
      }
    });

    return adjustment;
  };

  const handleOptionChange = (type: string, value: string) => {
    const newOptions = { ...selectedOptions, [type]: value };
    setSelectedOptions(newOptions);
    
    // Clear error for this field
    if (errors[type]) {
      const newErrors = { ...errors };
      delete newErrors[type];
      setErrors(newErrors);
    }

    const priceAdjustment = calculatePriceAdjustment(newOptions);
    
    if (onOptionsChange) {
      onOptionsChange(newOptions, priceAdjustment);
    }
  };

  const validateOptions = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    product.customizationOptions?.forEach(customization => {
      if (customization.required && !selectedOptions[customization.type]) {
        newErrors[customization.type] = `Please select ${customization.label.toLowerCase()}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderOption = (customization: ProductCustomization) => {
    const selectedValue = selectedOptions[customization.type];
    const hasError = errors[customization.type];

    switch (customization.type) {
      case 'size':
        return renderSizeOptions(customization, selectedValue, hasError);
      case 'material':
        return renderMaterialOptions(customization, selectedValue, hasError);
      case 'gemstone':
        return renderGemstoneOptions(customization, selectedValue, hasError);
      case 'color':
        return renderColorOptions(customization, selectedValue, hasError);
      case 'engraving':
        return renderEngravingOptions(customization, selectedValue, hasError);
      default:
        return renderSelectOptions(customization, selectedValue, hasError);
    }
  };

  const renderSizeOptions = (
    customization: ProductCustomization,
    selectedValue: string,
    hasError: string | undefined
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {customization.label} {customization.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="grid grid-cols-3 gap-2">
        {customization.options.map((option) => (
          <button
            key={option.value}
            onClick={() => !option.disabled && handleOptionChange(customization.type, option.value)}
            disabled={option.disabled}
            className={cn(
              "p-3 border rounded-md text-sm font-medium transition-all duration-200",
              selectedValue === option.value
                ? "border-amber-500 bg-amber-50 text-amber-900"
                : "border-gray-300 hover:border-gray-400 text-gray-900",
              option.disabled && "opacity-50 cursor-not-allowed",
              hasError && selectedValue !== option.value && "border-red-300"
            )}
          >
            <div className="text-center">
              <div>{option.label}</div>
              {option.price && option.price !== 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {option.price > 0 ? '+' : ''}{formatPrice(option.price)}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
    </div>
  );

  const renderMaterialOptions = (
    customization: ProductCustomization,
    selectedValue: string,
    hasError: string | undefined
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {customization.label} {customization.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="space-y-2">
        {customization.options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center justify-between p-3 border rounded-md cursor-pointer transition-all duration-200",
              selectedValue === option.value
                ? "border-amber-500 bg-amber-50"
                : "border-gray-300 hover:border-gray-400",
              option.disabled && "opacity-50 cursor-not-allowed",
              hasError && "border-red-300"
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name={customization.type}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => !option.disabled && handleOptionChange(customization.type, option.value)}
                disabled={option.disabled}
                className="text-amber-600 focus:ring-amber-500"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                {option.image && (
                  <div className="w-8 h-2 rounded mt-1" style={{ backgroundColor: option.image }} />
                )}
              </div>
            </div>
            
            {option.price && option.price !== 0 && (
              <div className="text-sm font-medium text-gray-900">
                {option.price > 0 ? '+' : ''}{formatPrice(option.price)}
              </div>
            )}
          </label>
        ))}
      </div>
      
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
    </div>
  );

  const renderGemstoneOptions = (
    customization: ProductCustomization,
    selectedValue: string,
    hasError: string | undefined
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {customization.label} {customization.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {customization.options.map((option) => (
          <button
            key={option.value}
            onClick={() => !option.disabled && handleOptionChange(customization.type, option.value)}
            disabled={option.disabled}
            className={cn(
              "p-4 border rounded-lg text-left transition-all duration-200",
              selectedValue === option.value
                ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                : "border-gray-300 hover:border-gray-400",
              option.disabled && "opacity-50 cursor-not-allowed",
              hasError && "border-red-300"
            )}
          >
            <div className="font-medium text-gray-900">{option.label}</div>
            {option.price && option.price !== 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {option.price > 0 ? '+' : ''}{formatPrice(option.price)}
              </div>
            )}
          </button>
        ))}
      </div>
      
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
    </div>
  );

  const renderColorOptions = (
    customization: ProductCustomization,
    selectedValue: string,
    hasError: string | undefined
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {customization.label} {customization.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="flex flex-wrap gap-3">
        {customization.options.map((option) => (
          <button
            key={option.value}
            onClick={() => !option.disabled && handleOptionChange(customization.type, option.value)}
            disabled={option.disabled}
            className={cn(
              "relative w-12 h-12 rounded-full border-4 transition-all duration-200",
              selectedValue === option.value
                ? "border-amber-500 ring-2 ring-amber-200"
                : "border-gray-300 hover:border-gray-400",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ backgroundColor: option.image || '#ccc' }}
            title={option.label}
          >
            {selectedValue === option.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {customization.options.map((option) => (
          <span
            key={`label-${option.value}`}
            className={cn(
              "px-2 py-1 rounded",
              selectedValue === option.value ? "bg-amber-100 text-amber-800" : ""
            )}
          >
            {option.label}
            {option.price && option.price !== 0 && (
              <span className="ml-1">
                ({option.price > 0 ? '+' : ''}{formatPrice(option.price)})
              </span>
            )}
          </span>
        ))}
      </div>
      
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
    </div>
  );

  const renderEngravingOptions = (
    customization: ProductCustomization,
    selectedValue: string,
    hasError: string | undefined
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {customization.label} {customization.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="space-y-2">
        {customization.options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center justify-between p-3 border rounded-md cursor-pointer transition-all duration-200",
              selectedValue === option.value
                ? "border-amber-500 bg-amber-50"
                : "border-gray-300 hover:border-gray-400",
              option.disabled && "opacity-50 cursor-not-allowed",
              hasError && "border-red-300"
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name={customization.type}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => !option.disabled && handleOptionChange(customization.type, option.value)}
                disabled={option.disabled}
                className="text-amber-600 focus:ring-amber-500"
              />
              <div className="font-medium text-gray-900">{option.label}</div>
            </div>
            
            {option.price && option.price !== 0 && (
              <div className="text-sm font-medium text-gray-900">
                {option.price > 0 ? '+' : ''}{formatPrice(option.price)}
              </div>
            )}
          </label>
        ))}
      </div>
      
      {selectedValue && selectedValue !== 'none' && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Custom Text
          </label>
          <input
            type="text"
            placeholder="Enter your custom text here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            maxLength={selectedValue === 'initials' ? 3 : 20}
          />
          <p className="text-xs text-gray-500 mt-1">
            {selectedValue === 'initials' 
              ? 'Maximum 3 characters' 
              : 'Maximum 20 characters'
            }
          </p>
        </div>
      )}
      
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
    </div>
  );

  const renderSelectOptions = (
    customization: ProductCustomization,
    selectedValue: string,
    hasError: string | undefined
  ) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {customization.label} {customization.required && <span className="text-red-500">*</span>}
      </label>
      
      <select
        value={selectedValue || ''}
        onChange={(e) => handleOptionChange(customization.type, e.target.value)}
        className={cn(
          "w-full px-3 py-2 border rounded-md focus:ring-amber-500 focus:border-amber-500",
          hasError ? "border-red-300" : "border-gray-300"
        )}
      >
        <option value="">Please select...</option>
        {customization.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
            {option.price && option.price !== 0 && (
              ` (${option.price > 0 ? '+' : ''}${formatPrice(option.price)})`
            )}
          </option>
        ))}
      </select>
      
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
    </div>
  );

  const totalPriceAdjustment = calculatePriceAdjustment(selectedOptions);

  return (
    <div className={cn("space-y-6", className)}>
      {product.customizationOptions.map((customization) => (
        <div key={customization.type}>
          {renderOption(customization)}
        </div>
      ))}

      {/* Price Summary */}
      {totalPriceAdjustment !== 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Customization Total:</span>
            <span className={cn(
              "font-bold",
              totalPriceAdjustment > 0 ? "text-amber-600" : "text-green-600"
            )}>
              {totalPriceAdjustment > 0 ? '+' : ''}{formatPrice(totalPriceAdjustment)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Final Price: {formatPrice(product.price + totalPriceAdjustment)}
          </div>
        </div>
      )}

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Please complete your selections
              </h3>
              <div className="text-sm text-red-700 mt-1">
                <ul className="list-disc pl-5 space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};