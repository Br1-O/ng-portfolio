import { Component, Inject, OnInit } from '@angular/core';
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

  educations: Education[] = [];

  educationService: EducationService;

  constructor(@Inject(EducationService) educationService: EducationService) {
    this.educationService = educationService;
  }

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
