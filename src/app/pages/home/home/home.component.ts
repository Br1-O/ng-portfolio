import { Component } from '@angular/core';
import { AboutMeComponent } from '../sections/about-me/about-me.component';
import { ProjectsComponent } from '../sections/projects/projects.component';
import { EducationComponent } from '../sections/education/education.component';
import { IntroductionComponent } from '../sections/introduction/introduction.component';

@Component({
  selector: 'app-home',
  imports: [AboutMeComponent, ProjectsComponent, EducationComponent, IntroductionComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
