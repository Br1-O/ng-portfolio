import { Component } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { CurrvitaeBtnsComponent } from '../../../../components/currvitae-btns/currvitae-btns.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [ButtonArrowComponent, CurrvitaeBtnsComponent],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {

}
