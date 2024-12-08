import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-currvitae-btns',
  standalone: true,
  imports: [ButtonComponent, ],
  templateUrl: './currvitae-btns.component.html',
  styleUrl: './currvitae-btns.component.css'
})
export class CurrvitaeBtnsComponent {
  downloadCV() {
    const fileUrl = 'documents/bruno-ortuno-developer-CV.pdf';
    window.open(fileUrl, '_blank', 'noopener noreferrer');
  }

  visitLinkedIn() {
    const linkedInUrl = 'https://www.linkedin.com/in/bortuno';
    window.open(linkedInUrl, '_blank', 'noopener noreferrer');
  }
}
