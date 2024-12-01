import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [BadgeComponent, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project: any;
}
