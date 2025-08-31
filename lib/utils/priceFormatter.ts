/**
 * Formats price for display with currency symbol and proper formatting
 * @param price Price number
 * @param currency Currency code (default: USD)
 * @param locale Locale for formatting (default: en-US)
 * @returns Formatted price string
 */
export function formatPrice(
  price: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    // Fallback for unsupported locales or currencies
    return `$${price.toLocaleString()}`;
  }
}

/**
 * Formats price range for display
 * @param minPrice Minimum price
 * @param maxPrice Maximum price
 * @param currency Currency code (default: USD)
 * @param locale Locale for formatting (default: en-US)
 * @returns Formatted price range string
 */
export function formatPriceRange(
  minPrice: number, 
  maxPrice: number | null = null, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string {
  const formattedMin = formatPrice(minPrice, currency, locale);
  
  if (maxPrice === null || maxPrice === Infinity) {
    return `${formattedMin}+`;
  }
  
  if (minPrice === maxPrice) {
    return formattedMin;
  }
  
  const formattedMax = formatPrice(maxPrice, currency, locale);
  return `${formattedMin} - ${formattedMax}`;
}

/**
 * Calculates and formats discount percentage
 * @param originalPrice Original price
 * @param salePrice Sale price
 * @returns Formatted discount percentage string
 */
export function formatDiscountPercentage(originalPrice: number, salePrice: number): string {
  if (originalPrice <= salePrice) {
    return '0%';
  }
  
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return `${Math.round(discount)}%`;
}

/**
 * Calculates savings amount
 * @param originalPrice Original price
 * @param salePrice Sale price
 * @param currency Currency code (default: USD)
 * @param locale Locale for formatting (default: en-US)
 * @returns Formatted savings amount
 */
export function formatSavingsAmount(
  originalPrice: number, 
  salePrice: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string {
  const savings = originalPrice - salePrice;
  if (savings <= 0) {
    return formatPrice(0, currency, locale);
  }
  
  return formatPrice(savings, currency, locale);
}

/**
 * Formats price for input fields (removes currency symbols)
 * @param price Price number
 * @returns Plain number string for inputs
 */
export function formatPriceForInput(price: number): string {
  return price.toString();
}

/**
 * Parses price string into number
 * @param priceString Price string with or without currency symbols
 * @returns Parsed price number
 */
export function parsePriceString(priceString: string): number {
  // Remove currency symbols and non-numeric characters except decimal points
  const cleanedPrice = priceString.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleanedPrice);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Checks if a product has a discount
 * @param originalPrice Original price
 * @param currentPrice Current/sale price
 * @returns Boolean indicating if there's a discount
 */
export function hasDiscount(originalPrice?: number, currentPrice?: number): boolean {
  if (!originalPrice || !currentPrice) {
    return false;
  }
  return originalPrice > currentPrice;
}

/**
 * Formats price with custom options
 * @param price Price number
 * @param options Formatting options
 * @returns Formatted price string
 */
export function formatPriceWithOptions(
  price: number,
  options: {
    currency?: string;
    locale?: string;
    showCurrency?: boolean;
    showDecimals?: boolean;
    compactNotation?: boolean;
  } = {}
): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    showCurrency = true,
    showDecimals = false,
    compactNotation = false
  } = options;

  if (compactNotation && price >= 1000) {
    return formatCompactPrice(price, currency, locale);
  }

  if (!showCurrency) {
    return price.toLocaleString(locale, {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    });
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
}

/**
 * Formats price in compact notation (K, M, B)
 * @param price Price number
 * @param currency Currency code
 * @param locale Locale for formatting
 * @returns Compact formatted price string
 */
export function formatCompactPrice(
  price: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(price);
  } catch (error) {
    // Fallback for browsers that don't support compact notation
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    }
    return formatPrice(price, currency, locale);
  }
}

/**
 * Formats installment price
 * @param totalPrice Total price
 * @param installments Number of installments
 * @param currency Currency code
 * @param locale Locale for formatting
 * @returns Formatted installment price string
 */
export function formatInstallmentPrice(
  totalPrice: number, 
  installments: number = 12, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string {
  const installmentAmount = totalPrice / installments;
  const formattedAmount = formatPrice(installmentAmount, currency, locale);
  return `${formattedAmount} × ${installments}`;
}

/**
 * Formats price comparison
 * @param currentPrice Current price
 * @param comparePrice Comparison price
 * @param currency Currency code
 * @param locale Locale for formatting
 * @returns Object with formatted prices and comparison info
 */
export function formatPriceComparison(
  currentPrice: number,
  comparePrice: number,
  currency: string = 'USD',
  locale: string = 'en-US'
) {
  const current = formatPrice(currentPrice, currency, locale);
  const compare = formatPrice(comparePrice, currency, locale);
  
  const difference = Math.abs(currentPrice - comparePrice);
  const percentageDiff = ((difference / comparePrice) * 100).toFixed(1);
  
  const isHigher = currentPrice > comparePrice;
  const isDifferent = currentPrice !== comparePrice;
  
  return {
    current,
    compare,
    difference: formatPrice(difference, currency, locale),
    percentageDifference: `${percentageDiff}%`,
    isHigher,
    isLower: !isHigher && isDifferent,
    isSame: !isDifferent
  };
}

/**
 * Validates price input
 * @param priceString Price input string
 * @returns Validation result object
 */
export function validatePrice(priceString: string): {
  isValid: boolean;
  value: number;
  error?: string;
} {
  if (!priceString || priceString.trim() === '') {
    return {
      isValid: false,
      value: 0,
      error: 'Price is required'
    };
  }

  const parsed = parsePriceString(priceString);
  
  if (isNaN(parsed)) {
    return {
      isValid: false,
      value: 0,
      error: 'Invalid price format'
    };
  }

  if (parsed < 0) {
    return {
      isValid: false,
      value: parsed,
      error: 'Price cannot be negative'
    };
  }

  if (parsed > 1000000) {
    return {
      isValid: false,
      value: parsed,
      error: 'Price too high'
    };
  }

  return {
    isValid: true,
    value: parsed
  };
}