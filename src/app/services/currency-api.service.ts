import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

// Define an interface for the expected API response structure
interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: { [key: string]: number };
  // Add other potential fields if known, e.g., time_last_update_unix
}

// Define an interface for the supported codes response
interface SupportedCodesResponse {
    result: string;
    supported_codes: [string, string][];
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  // Using a free, public API for demonstration
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/';
  private readonly CACHE_DURATION_MS = 60 * 60 * 1000; // Cache rates for 1 hour

  constructor() { }

  /**
   * Fetches the latest exchange rates for a given base currency, using cache if available and valid.
   * @param baseCurrency The base currency code (e.g., 'USD').
   * @returns Observable containing the exchange rate data.
   */
  getRates(baseCurrency: string): Observable<ExchangeRateResponse> {
    return from(this.storageService.getCachedRates(baseCurrency)).pipe(
      switchMap((cachedData: ExchangeRateResponse | null) => { // Add type to cachedData
        if (cachedData) {
          return from(this.storageService.getLastFetchTime(baseCurrency)).pipe(
            switchMap((lastFetchTime: number | null) => { // Add type to lastFetchTime
              const now = new Date().getTime();
              if (lastFetchTime && (now - lastFetchTime < this.CACHE_DURATION_MS)) {
                console.log(`Using cached rates for ${baseCurrency}`);
                return of(cachedData); // Return cached data if still valid
              } else {
                console.log(`Cache expired for ${baseCurrency}, fetching fresh rates.`);
                return this.fetchAndCacheRates(baseCurrency);
              }
            })
          );
        } else {
          console.log(`No cache found for ${baseCurrency}, fetching fresh rates.`);
          return this.fetchAndCacheRates(baseCurrency);
        }
      }),
      catchError((err: any) => { // Add type to err
        console.error('Error in getRates pipeline, trying cache as fallback:', err);
        // Attempt to return cached data even if fetch fails or cache check had issues
        return from(this.storageService.getCachedRates(baseCurrency)).pipe(
            switchMap((fallbackCache: ExchangeRateResponse | null) => { // Add type to fallbackCache
                if (fallbackCache) {
                    console.warn(`API fetch failed for ${baseCurrency}, using potentially stale cache.`);
                    return of(fallbackCache);
                } else {
                    console.error(`API fetch failed for ${baseCurrency} and no cache available.`);
                    // Return an error observable compatible with the expected type
                    return throwError(() => new Error('Falha ao buscar taxas e sem cache disponível.'));
                }
            })
        );
      })
    );
  }

  /**
   * Fetches rates from the API and caches them.
   * @param baseCurrency The base currency code.
   * @returns Observable containing the fresh exchange rate data.
   */
  private fetchAndCacheRates(baseCurrency: string): Observable<ExchangeRateResponse> {
    return this.http.get<ExchangeRateResponse>(`${this.apiUrl}${baseCurrency}`).pipe(
      tap((data: ExchangeRateResponse) => { // Add type to data
        // Ensure data is valid before caching
        if (data && data.rates) {
            this.storageService.cacheRates(baseCurrency, data);
            console.log(`Fetched and cached rates for ${baseCurrency}`);
        } else {
            console.warn(`Invalid data received from API for ${baseCurrency}, not caching.`);
        }
      }),
      catchError((err: any) => { // Add type to err
        console.error(`Failed to fetch rates for ${baseCurrency}:`, err);
        // Propagate the original error to let the main pipeline handle cache fallback
        return throwError(() => err);
      })
    );
  }

  // Fetching supported currencies (could also be cached)
  getSupportedCurrencies(): Observable<SupportedCodesResponse> {
    // Using placeholder as before, adjust if API provides this
    const commonCurrencies: { [key: string]: string } = {
       "USD": "United States Dollar", "EUR": "Euro", "JPY": "Japanese Yen", "GBP": "British Pound Sterling",
       "AUD": "Australian Dollar", "CAD": "Canadian Dollar", "CHF": "Swiss Franc", "CNY": "Chinese Yuan",
       "SEK": "Swedish Krona", "NZD": "New Zealand Dollar", "BRL": "Brazilian Real"
    };
    // Mimic API structure { result: 'success', supported_codes: [...] }
    const response: SupportedCodesResponse = {
        result: 'success',
        supported_codes: Object.entries(commonCurrencies)
    };
    return of(response);
  }
}

