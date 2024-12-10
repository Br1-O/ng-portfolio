import { Component } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { CurrvitaeBtnsComponent } from '../../../../components/currvitae-btns/currvitae-btns.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [ButtonArrowComponent, CurrvitaeBtnsComponent, TranslateModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {

}