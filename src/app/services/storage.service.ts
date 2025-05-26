import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private readonly HISTORY_KEY = 'conversionHistory';
  private readonly CACHED_RATES_KEY = 'cachedRates';
  private readonly LAST_FETCH_KEY = 'lastRateFetch';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Createionic storage instance
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Generic set method
  public async set(key: string, value: any): Promise<any> {
    return await this._storage?.set(key, value);
  }

  // Generic get method
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Specific method for conversion history
  public async addConversionToHistory(conversion: any): Promise<any[]> {
    let history = await this.get(this.HISTORY_KEY) || [];
    // Add new conversion to the beginning of the array
    history.unshift(conversion);
    // Optional: Limit history size (e.g., keep last 20 conversions)
    history = history.slice(0, 20);
    await this.set(this.HISTORY_KEY, history);
    return history;
  }

  public async getConversionHistory(): Promise<any[]> {
    return await this.get(this.HISTORY_KEY) || [];
  }

  public async clearConversionHistory(): Promise<void> {
      await this.set(this.HISTORY_KEY, []);
  }

  // Methods for caching rates
  public async cacheRates(baseCurrency: string, ratesData: any): Promise<void> {
      const cache = await this.get(this.CACHED_RATES_KEY) || {};
      cache[baseCurrency] = ratesData;
      await this.set(this.CACHED_RATES_KEY, cache);
      await this.set(this.LAST_FETCH_KEY + '_' + baseCurrency, new Date().getTime());
  }

  public async getCachedRates(baseCurrency: string): Promise<any | null> {
      const cache = await this.get(this.CACHED_RATES_KEY);
      return cache ? cache[baseCurrency] : null;
  }

  public async getLastFetchTime(baseCurrency: string): Promise<number | null> {
      return await this.get(this.LAST_FETCH_KEY + '_' + baseCurrency);
  }
}

