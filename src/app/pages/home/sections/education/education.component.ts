import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { EducationCardComponent } from '../../../../components/education-card/education-card.component';
import { Education } from '../../../../interfaces/education.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollSpyDirective } from '../../../../directives/scroll-spy.directive';
import { EducationCardFullComponent } from '../../../../components/education-card-full/education-card-full.component';

@Component({
  selector: 'app-education',
  imports: [CommonModule, ButtonArrowComponent, EducationCardComponent, TranslateModule, ScrollSpyDirective, EducationCardFullComponent],
  standalone: true,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit{

  educations: Education[] = [];
  isViewSetAsCards: boolean = false;
  isViewSetAsList: boolean = true;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadEducationData();

    // Subscribe to language change
    this.translate.onLangChange.subscribe(() => {
      this.loadEducationData(); // Reload education data whenever language changes
    });
  }
  
  setViewAsCards() {
    this.isViewSetAsCards = true;
    this.isViewSetAsList = false;
  }

  setViewAsList() {
    this.isViewSetAsList = true;
    this.isViewSetAsCards = false;
  }

  loadEducationData(): void {
    this.translate.get('EDUCATION.EDUCATIONS').subscribe((educations) => {
      this.educations = educations;
    });
  }
}
