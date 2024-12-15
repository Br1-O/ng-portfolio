import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsService } from '../services/projects/projects.service';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateConfigModule // Import the custom translate config module
  ],
  providers: [ ProjectsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  isLoading = true;

  constructor(
    private renderer: Renderer2,
    private translateConfig: TranslateConfigModule, // Use TranslateConfigModule for language handling
  ) {}

  ngOnInit(): void {
    document.title = 'Loading...';

    // Initialize language via TranslateConfigModule
    this.translateConfig.initializeLanguage();
  }

  ngAfterViewInit(): void {

    this.renderer.listen('document', 'readystatechange', () => {
      // Once elements are loaded change the page's title and display the content
      if (document.readyState === 'complete') {
        this.isLoading = false;
        document.title = 'Bruno Ortuño | Portfolio';
      }
    });
  }
}