import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';

@Component({
  selector: 'app-about-me',
  imports: [ButtonComponent, ButtonArrowComponent],
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

  downloadCV() {
    const fileUrl = 'documents/bruno-ortuno-developer-CV.pdf';
    window.open(fileUrl, '_blank', 'noopener noreferrer');
  }

  visitLinkedIn() {
    const linkedInUrl = 'https://www.linkedin.com/in/bortuno';
    window.open(linkedInUrl, '_blank', 'noopener noreferrer');
  }
}
