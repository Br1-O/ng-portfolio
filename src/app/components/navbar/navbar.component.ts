import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  isScrolled = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.listen(window, 'scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  //visibility of the menu
  isMenuActive = false;

  //toggle the menu visibility
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
