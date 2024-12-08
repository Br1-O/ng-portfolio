import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { EducationCardComponent } from '../../../../components/education-card/education-card.component';
import { EducationService } from '../../../../services/education/education.service';
import { Education } from '../../../../interfaces/education.interface';

@Component({
  selector: 'app-education',
  imports: [CommonModule, ButtonArrowComponent, EducationCardComponent],
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{

  //animation
  isVisible = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const element = document.querySelector('#education');
    if (element) {
      const rect = element.getBoundingClientRect();
      // const topInView = rect.top >= 0 && rect.top <= window.innerHeight;
      const topInView =  rect.top < window.innerHeight && rect.bottom >= 0;
      this.isVisible = topInView;

      //scroll spy for navbar

      // Calculate % of the window's height
      const threshold = window.innerHeight * 0.4;
        
      // Check if at least 20% of the element is in view from the top or bottom
      const topInView2 = rect.top < window.innerHeight - threshold && rect.top + rect.height > threshold;
      const bottomInView = rect.bottom > threshold && rect.bottom < window.innerHeight + threshold;

      const isElementInView = topInView2 || bottomInView;

      //scroll spy for navbar
      const navbarItem: HTMLAnchorElement | null = document.querySelector(".nav-item:nth-of-type(2) a");

      if (navbarItem) {
        if (isElementInView) {
          navbarItem.style.transform = 'scale(1.3)';
          navbarItem.style.filter = 'brightness(125%)';
          navbarItem.style.color = 'var(--font-hover-color)';
          navbarItem.style.textShadow = '-2.5px -2.5px 7px var(--secondary-color), 2.5px 2.5px 2px var(--main-color)';
          navbarItem.style.borderBottom = '1px solid var(--font-color)';
        } else {
          navbarItem.style.transform = '';
          navbarItem.style.filter = '';
          navbarItem.style.color = '';
          navbarItem.style.textShadow = '';
          navbarItem.style.borderBottom = '';
        }
      }
    }
  }

  //injects
  educations: Education[] = [];

  educationService: EducationService;

  constructor(@Inject(EducationService) educationService: EducationService) {
    this.educationService = educationService;
  }

  //on init
  ngOnInit(): void {
    // Fetch education data
    this.educationService.getEducation().subscribe(
      {
        next: (educations: Education[]) =>
        {
          this.educations = educations;
        },
        error: (err: Error) => {
          console.log(err);
        }
      }
    );
  }
}
