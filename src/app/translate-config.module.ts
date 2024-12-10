import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Define the loader factory for translations
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'data/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule], // Export TranslateModule to be used in other parts
})
export class TranslateConfigModule {

  constructor(public translate: TranslateService) {}

  /**
   * Initializes the language on app start.
   * Sets the language based on localStorage or defaults to 'en'.
   */
  initializeLanguage(): void {
    // Try to get the language saved in localStorage
    let savedLang = localStorage.getItem('lang');

    if (!savedLang) {
      // Fallback to the browser's language if none is saved
      const browserLang = this.translate.getBrowserLang();

      // Check if the browser language matches supported languages
      savedLang = browserLang && ['en', 'es'].includes(browserLang) ? browserLang : 'en';
    }

    // Use the language
    this.translate.use(savedLang);

    // Save to localStorage  
    localStorage.setItem('lang', savedLang);
  }

  /**
   * Sets a new language and persists it to localStorage.
   * @param lang - The language to set (e.g., 'en', 'es')
   */
  setLanguage(lang: string): void {
    this.translate.use(lang); // Change language in TranslateService
    localStorage.setItem('lang', lang); // Save to localStorage
  }

  /**
   * Gets the current language.
   * @returns The current language code.
   */
  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}