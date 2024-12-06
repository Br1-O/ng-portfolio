import { Component } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';

@Component({
  selector: 'app-about-me',
  imports: [ButtonArrowComponent],
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
}
