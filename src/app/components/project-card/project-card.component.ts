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
export class ProjectCardComponent implements OnInit {
  
  @Input() project: any;

  ngOnInit(): void {
    const tagGroup = Array.from(document.querySelectorAll('i'));

    for (const tag of tagGroup) {
      
      tag.addEventListener('mouseenter', () => {
        if (!tag.classList.contains('animated')) {
          tag.classList.add('animated');
          tag.addEventListener('animationend', () => {
            tag.classList.remove('animated'); // Remove class when animation ends
          }, { once: true });
        }
      });
    }
  }
}
