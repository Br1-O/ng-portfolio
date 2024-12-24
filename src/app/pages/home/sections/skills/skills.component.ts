import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollSpyDirective } from '../../../../directives/scroll-spy.directive';
import { IconsService } from '../../../../services/skills/skills.service';
import { DomSanitizer } from '@angular/platform-browser';

interface SkillsData {
  frontend: [],
  backend: [],
  general: []
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ButtonArrowComponent, TranslateModule, ScrollSpyDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skillsFrontend: any[] = [];
  skillsBackend: any[] = [];
  skillsGeneral: any[] = [];

  currentActiveSection: string = "Backend";

  constructor(private iconsService: IconsService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.iconsService.getIcons().subscribe((data) => {

      let skillsData = (data as unknown) as SkillsData;

      this.skillsFrontend = skillsData.frontend;
      this.skillsBackend = skillsData.backend;
      this.skillsGeneral = skillsData.general;
    });

    const tagGroup = Array.from(document.querySelectorAll('.soft-skills-container ul li'));

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
  
  sanitizeSvg(svgContent: string) {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

  changeLanguagesContent(event:Event) : void{
    const newActive = (event.target as HTMLElement).textContent?.trim();
    if (newActive && newActive !== this.currentActiveSection) {
      setTimeout(() => {
        this.currentActiveSection = newActive;
        this.cdr.detectChanges();
      }, 100);
    }
  }

}
