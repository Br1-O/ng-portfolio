import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true,
})
export class ScrollSpyDirective {
  @Input('appScrollSpy') targetNavbarSelector!: string;
  @Input() thresholdPercentage: number = 40; // Default threshold to 40%
  isVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const threshold = window.innerHeight * (this.thresholdPercentage / 100);

    // Check visibility with threshold logic
    const topInView = rect.top < window.innerHeight - threshold && rect.top + rect.height > threshold;
    const bottomInView = rect.bottom > threshold && rect.bottom < window.innerHeight + threshold;
    const isElementInView = topInView || bottomInView;

    // Add or remove 'visible' class based on isElementInView
    if (isElementInView && !this.isVisible) {
      this.renderer.addClass(this.el.nativeElement, 'visible');
      this.isVisible = true;
    } else if (!isElementInView && this.isVisible) {
      this.renderer.removeClass(this.el.nativeElement, 'visible');
      this.isVisible = false;
    }

    // Navbar scroll spy logic
    if (this.targetNavbarSelector) {
      const navbarItem = document.querySelector(this.targetNavbarSelector) as HTMLElement;
      if (navbarItem) {
        if (isElementInView) {
          this.applyNavbarStyles(navbarItem);
        } else {
          this.clearNavbarStyles(navbarItem);
        }
      }
    }
  }

  private applyNavbarStyles(navbarItem: HTMLElement): void {
    this.renderer.setStyle(navbarItem, 'transform', 'scale(1.3)');
    this.renderer.setStyle(navbarItem, 'filter', 'brightness(125%)');
    this.renderer.setStyle(navbarItem, 'color', 'var(--font-hover-color)');
    this.renderer.setStyle(navbarItem, 'text-shadow', '-2.5px -2.5px 7px var(--secondary-color), 2.5px 2.5px 2px var(--main-color)');
    this.renderer.setStyle(navbarItem, 'border-bottom', '1px solid var(--font-color)');
  }

  private clearNavbarStyles(navbarItem: HTMLElement): void {
    this.renderer.removeStyle(navbarItem, 'transform');
    this.renderer.removeStyle(navbarItem, 'filter');
    this.renderer.removeStyle(navbarItem, 'color');
    this.renderer.removeStyle(navbarItem, 'text-shadow');
    this.renderer.removeStyle(navbarItem, 'border-bottom');
  }
}