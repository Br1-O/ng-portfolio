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

      //scroll spy for animation

      const topInView =  rect.top < window.innerHeight && rect.bottom >= 0;
      this.isVisible = topInView;

      //scroll spy for navbar

      // Calculate % of the window's height
      const threshold = window.innerHeight * 0.4;

      // threshold for the end
      const thresholdNearEnd = window.innerHeight * 0.5;
        
      // Check if at least % of the element is in view from the top or bottom
      const topInView2 = rect.top < window.innerHeight - threshold && rect.top + rect.height > threshold;
      const bottomInView = rect.bottom > threshold && rect.bottom < window.innerHeight + threshold;

      const isElementInView = topInView2 || bottomInView;

      const isNearEnd = rect.bottom >= thresholdNearEnd && rect.bottom <= window.innerHeight;

      const isEnd = rect.bottom <= window.innerHeight * 0.9;

      const navbarItem: HTMLAnchorElement | null = document.querySelector(".nav-item:nth-of-type(3) a");

      if (navbarItem) {
        if (isElementInView) {
          if (isNearEnd || isEnd) {
            navbarItem.style.transform = '';
            navbarItem.style.filter = '';
            navbarItem.style.color = '';
            navbarItem.style.textShadow = '';
            navbarItem.style.borderBottom = '';
          } else {
            navbarItem.style.transform = 'scale(1.3)';
            navbarItem.style.filter = 'brightness(125%)';
            navbarItem.style.color = 'var(--font-hover-color)';
            navbarItem.style.textShadow = '-2.5px -2.5px 7px var(--secondary-color), 2.5px 2.5px 2px var(--main-color)';
            navbarItem.style.borderBottom = '1px solid var(--font-color)';
          }
        } else {
          navbarItem.style.transform = '';
          navbarItem.style.filter = '';
          navbarItem.style.color = '';
          navbarItem.style.textShadow = '';
          navbarItem.style.borderBottom = '';
        }
      }
    }
  }
}
