import { Component, HostListener, OnInit } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactFormComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  ngOnInit(): void {
    const tagGroup = Array.from(document.querySelectorAll('i'));

    for (const tag of tagGroup) {
      
      tag.addEventListener('mouseenter', () => {
        if (!tag.classList.contains('animated')) {
          tag.classList.add('animated');
          tag.addEventListener('animationend', () => {
            tag.classList.remove('animated'); // Remove class when animation ends
          }, { once: true });
        }
      });
    }
  }

  //animation
  isVisible = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const element = document.querySelector('#contact');
    if (element) {
      const rect = element.getBoundingClientRect();

      //scroll spy for navbar

      // Calculate % of the window's height
      const threshold = window.innerHeight * 0.2;
        
      // Check if at least % of the element is in view from the top or bottom
      const topInView2 = rect.top < window.innerHeight - threshold && rect.top + rect.height > threshold;
      const bottomInView = rect.bottom > threshold && rect.bottom < window.innerHeight + threshold;

      const isElementInView = topInView2 || bottomInView;

      const navbarItem: HTMLAnchorElement | null = document.querySelector(".nav-item:nth-of-type(5) a");
      const prevNavbarItem: HTMLAnchorElement | null = document.querySelector(".nav-item:nth-of-type(4) a");


      if (navbarItem && prevNavbarItem) {
        if (isElementInView) {
          prevNavbarItem.style.transform = '';
          prevNavbarItem.style.filter = '';
          prevNavbarItem.style.color = '';
          prevNavbarItem.style.textShadow = '';
          prevNavbarItem.style.borderBottom = '';

          navbarItem.style.transform = 'scale(1.3)';
          navbarItem.style.filter = 'brightness(125%)';
          navbarItem.style.color = 'var(--font-hover-color)';
          navbarItem.style.textShadow = '-2.5px -2.5px 7px var(--secondary-color), 2.5px 2.5px 2px var(--main-color)';
          navbarItem.style.borderBottom = '1px solid var(--font-color)';
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
