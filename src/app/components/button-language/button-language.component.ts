import { Component } from '@angular/core';
import { TranslateConfigModule } from '../../translate-config.module';

@Component({
  selector: 'app-button-language',
  standalone: true,
  imports: [],
  templateUrl: './button-language.component.html',
  styleUrl: './button-language.component.css'
})
export class ButtonLanguageComponent {
  currentLang = 'en'; // Default language

  constructor(private translateConfig: TranslateConfigModule) {
    this.currentLang = this.translateConfig.getCurrentLanguage(); // Get the initial language
  }

  toggleLanguage(event: Event): void {
    this.currentLang = (event.target as HTMLInputElement).checked ? 'es' : 'en';
    this.translateConfig.setLanguage(this.currentLang);
  }
}
