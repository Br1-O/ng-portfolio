import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EducationService } from '../services/education/education.service';
import { ProjectsService } from '../services/projects/projects.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, HttpClientModule],
  providers: [EducationService, ProjectsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  isLoading = true;  // Start with loading overlay visible

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    document.title = 'Loading...';

    this.renderer.listen('document', 'readystatechange', () => {
      if (document.readyState === 'complete') {
        this.isLoading = false;
        document.title = 'Bruno Ortuño | Portfolio';
      }
    });
  }
}