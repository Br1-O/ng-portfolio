import { Component } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [ButtonArrowComponent],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {

}
