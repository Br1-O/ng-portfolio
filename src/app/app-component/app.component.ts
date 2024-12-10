import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EducationService } from '../services/education/education.service';
import { ProjectsService } from '../services/projects/projects.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../translate-config.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    TranslateModule,
    TranslateConfigModule, // Import the custom translate config module
  ],
  providers: [EducationService, ProjectsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  isLoading = true;

  constructor(
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Initialize translation service
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
  }

  ngAfterViewInit(): void {
    // Default value being english
    let selectedLang : string = 'en';

    // Try to fetch user's selected language from local storage
    let savedPreferences : string | null = localStorage.getItem("BrunoOrtunoPortfolio");

    if (savedPreferences) {
      let parsedPreferences = JSON.parse(savedPreferences);
      selectedLang = parsedPreferences.lang;
    } else {
      // Get the user's preferred language
      const browserLang = this.translate.getBrowserLang();

      if (browserLang) {
        selectedLang = browserLang.match(/en|es/) ? browserLang : 'en';
      }
    }
    
    // Change language
    this.translate.use(selectedLang);

    // Set user's selected language
    localStorage.setItem("BrunoOrtunoPortfolio", JSON.stringify({lang: selectedLang}));

    // Ensure language is loaded before proceeding
    this.translate.onLangChange.subscribe(() => {
      this.isLoading = false;  // Proceed to show the app once language is ready
    });

    document.title = 'Loading...';

    this.renderer.listen('document', 'readystatechange', () => {
      // Once elements are loaded change the page's title and display the content
      if (document.readyState === 'complete') {
        this.isLoading = false;
        document.title = 'Bruno Ortuño | Portfolio';
      }
    });
  }
}