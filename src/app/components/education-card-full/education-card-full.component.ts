import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-education-card-full',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './education-card-full.component.html',
  styleUrl: './education-card-full.component.css'
})
export class EducationCardFullComponent {

  @Input() education: any;
}
