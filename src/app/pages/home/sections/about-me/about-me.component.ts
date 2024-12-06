import { Component } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { CurrvitaeBtnsComponent } from '../../../../components/currvitae-btns/currvitae-btns.component';

@Component({
  selector: 'app-about-me',
  imports: [ButtonArrowComponent, CurrvitaeBtnsComponent],
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
}
