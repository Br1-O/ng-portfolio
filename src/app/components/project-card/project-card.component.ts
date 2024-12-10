import { Component, Input, OnInit } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [BadgeComponent, CommonModule, TranslateModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  
  @Input() project: any;
}
