import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { EducationCardComponent } from '../../../../components/education-card/education-card.component';
import { Education } from '../../../../interfaces/education.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollSpyDirective } from '../../../../directives/scroll-spy.directive';

@Component({
  selector: 'app-education',
  imports: [CommonModule, ButtonArrowComponent, EducationCardComponent, TranslateModule, ScrollSpyDirective],
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{

  educations: Education[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadEducationData();

    // Subscribe to language change
    this.translate.onLangChange.subscribe(() => {
      this.loadEducationData(); // Reload education data whenever language changes
    });
  }

  loadEducationData(): void {
    this.translate.get('EDUCATION.EDUCATIONS').subscribe((educations) => {
      this.educations = educations;
    });
  }
}
