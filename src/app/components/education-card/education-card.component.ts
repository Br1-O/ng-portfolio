import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-card.component.html',
  styleUrl: './education-card.component.css'
})
export class EducationCardComponent {

  @Input() education: any;
}
