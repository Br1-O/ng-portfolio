import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { EducationCardComponent } from '../../../../components/education-card/education-card.component';
import { EducationService } from '../../../../services/education/education.service';

export interface Education {
  name: string;
  place: string
  date: string | null;
  description: string;
  img: string | null;
  subjects: string[] | null;
}

@Component({
  selector: 'app-education',
  imports: [CommonModule, ButtonArrowComponent, EducationCardComponent],
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{

  educations: Education[] = [];

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    // Fetch education data
    this.educationService.getEducation().subscribe((data) => {
      this.educations = data;
    });
  }


}
