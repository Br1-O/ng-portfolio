import { Component, HostListener } from '@angular/core';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';

@Component({
  selector: 'app-about-me',
  imports: [ButtonArrowComponent],
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

  //animation
  isVisible = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const element = document.querySelector('#about-me');
    if (element) {
      const rect = element.getBoundingClientRect();
      const topInView = rect.top >= 0 && rect.top <= window.innerHeight;
      this.isVisible = topInView;
    }
  }
  
}
