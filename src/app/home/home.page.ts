import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonSelect, IonSelectOption, IonLabel, IonInput, IonButton, IonSpinner, IonNote, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CurrencyApiService } from '../services/currency-api.service';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { swapVerticalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonNote, IonSpinner, IonButton, IonInput, IonLabel, IonSelectOption, IonSelect, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule],
})
export class HomePage implements OnInit {
  private currencyService = inject(CurrencyApiService);
  private storageService = inject(StorageService);

  supportedCurrencies: [string, string][] = [];
  fromCurrency: string = 'USD';
  toCurrency: string = 'BRL';
  amount: number | null = 1;
  convertedAmount: number | null = null;
  exchangeRate: number | null = null;
  isLoadingRates: boolean = false;
  isLoadingCurrencies: boolean = false;
  error: string | null = null;

  constructor() {
    addIcons({ swapVerticalOutline });
  }

  ngOnInit() {
    this.loadSupportedCurrencies();
  }

  loadSupportedCurrencies() {
    this.isLoadingCurrencies = true;
    this.error = null;
    this.currencyService.getSupportedCurrencies().subscribe({
      next: (data) => {
        if (data && data.supported_codes) {
          this.supportedCurrencies = data.supported_codes;
          // Ensure default currencies are valid
          if (!this.supportedCurrencies.find(c => c[0] === this.fromCurrency)) {
            this.fromCurrency = this.supportedCurrencies.length > 0 ? this.supportedCurrencies[0][0] : '';
          }
          if (!this.supportedCurrencies.find(c => c[0] === this.toCurrency)) {
            this.toCurrency = this.supportedCurrencies.length > 1 ? this.supportedCurrencies[1][0] : (this.supportedCurrencies.length > 0 ? this.supportedCurrencies[0][0] : '');
          }
        } else {
          // Fallback list
          this.supportedCurrencies = Object.entries({
            "USD": "United States Dollar", "EUR": "Euro", "JPY": "Japanese Yen", "GBP": "British Pound Sterling",
            "AUD": "Australian Dollar", "CAD": "Canadian Dollar", "CHF": "Swiss Franc", "CNY": "Chinese Yuan",
            "SEK": "Swedish Krona", "NZD": "New Zealand Dollar", "BRL": "Brazilian Real"
          });
          console.warn('Using fallback currency list.');
        }
        this.isLoadingCurrencies = false;
        this.convertCurrency(); // Initial conversion
      },
      error: (err) => {
        console.error('Error loading supported currencies:', err);
        this.error = 'Falha ao carregar moedas suportadas.';
        this.isLoadingCurrencies = false;
        // Use fallback list on error
        this.supportedCurrencies = Object.entries({
            "USD": "United States Dollar", "EUR": "Euro", "JPY": "Japanese Yen", "GBP": "British Pound Sterling",
            "AUD": "Australian Dollar", "CAD": "Canadian Dollar", "CHF": "Swiss Franc", "CNY": "Chinese Yuan",
            "SEK": "Swedish Krona", "NZD": "New Zealand Dollar", "BRL": "Brazilian Real"
        });
      }
    });
  }

  convertCurrency() {
    const currentAmount = this.amount ?? 0;
    if (!this.fromCurrency || !this.toCurrency || currentAmount === null || currentAmount < 0) {
      this.convertedAmount = null;
      this.exchangeRate = null;
      return;
    }

    this.isLoadingRates = true;
    this.convertedAmount = null;
    this.exchangeRate = null;
    this.error = null;

    this.currencyService.getRates(this.fromCurrency).subscribe({
      next: (data) => {
        this.isLoadingRates = false;
        if (data && data.rates && data.rates[this.toCurrency]) {
          this.exchangeRate = data.rates[this.toCurrency];
          if (typeof currentAmount === 'number' && typeof this.exchangeRate === 'number') {
            this.convertedAmount = currentAmount * this.exchangeRate;
            const conversionRecord = {
              from: this.fromCurrency,
              to: this.toCurrency,
              amount: currentAmount,
              result: this.convertedAmount,
              rate: this.exchangeRate,
              timestamp: new Date().toISOString()
            };
            this.storageService.addConversionToHistory(conversionRecord)
              .then(() => console.log('Conversion saved to history'))
              .catch(err => console.error('Failed to save history:', err));
          } else {
            this.error = 'Erro interno ao calcular conversão.';
            console.error('Invalid types for calculation:', currentAmount, this.exchangeRate);
          }
        } else {
          this.error = `Não foi possível obter a taxa de câmbio para ${this.toCurrency}.`;
          console.error('Invalid rate data received:', data);
        }
      },
      error: (err) => {
        this.isLoadingRates = false;
        console.error('Error fetching exchange rates:', err);
        if (err && err.message && err.message.includes('Falha ao buscar taxas e sem cache disponível')) {
             this.error = 'Falha ao buscar taxas. Verifique a conexão. Exibindo último resultado do cache, se disponível.';
        } else if (err && err.message && err.message.includes('Sem conexão com a internet')) {
             this.error = 'Você está offline. Exibindo último resultado do cache, se disponível.';
        } else {
            this.error = 'Erro desconhecido ao buscar taxas.';
        }
        this.displayCachedResultOnError();
      }
    });
  }

  async displayCachedResultOnError() {
    const cachedData = await this.storageService.getCachedRates(this.fromCurrency);
    const currentAmount = this.amount ?? 0;
    if (cachedData && cachedData.rates && cachedData.rates[this.toCurrency] && typeof currentAmount === 'number') {
      this.exchangeRate = cachedData.rates[this.toCurrency];
      if (typeof this.exchangeRate === 'number') {
        this.convertedAmount = currentAmount * this.exchangeRate;
        console.warn('Displayed result from cache due to API error.');
      } else {
        this.convertedAmount = null;
        this.exchangeRate = null;
        console.error('Cached rate is not a number:', this.exchangeRate);
      }
    } else {
      this.convertedAmount = null;
      this.exchangeRate = null;
    }
  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.convertCurrency();
  }
}

