import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-currvitae-btns',
  standalone: true,
  imports: [ButtonComponent, TranslateModule],
  templateUrl: './currvitae-btns.component.html',
  styleUrl: './currvitae-btns.component.css'
})
export class CurrvitaeBtnsComponent implements OnInit {

  constructor(private translate: TranslateService) {}

  downloadCV() : void {
    this.translate.get('INTRODUCTION.LINK-RESUME').subscribe((fileUrl: string) => {
      window.open(fileUrl, '_blank', 'noopener noreferrer');
    });
  }

  visitLinkedIn() : void  {
    this.translate.get('INTRODUCTION.LINK-LINKEDIN').subscribe((linkedInUrl: string) => {
      window.open(linkedInUrl, '_blank', 'noopener noreferrer');
    });
  }

  ngOnInit(): void {
    // If the initial language is already set, call the function once
    if (this.translate.currentLang) {
      this.downloadCV = this.downloadCV.bind(this);
      this.visitLinkedIn = this.visitLinkedIn.bind(this);
    }
  }
}
