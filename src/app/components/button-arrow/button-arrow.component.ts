import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-arrow',
  standalone: true,
  imports: [],
  templateUrl: './button-arrow.component.html',
  styleUrl: './button-arrow.component.css'
})
export class ButtonArrowComponent {
  @Input() section:string = "#";
  @Input() sectionName:string = "Inicio";
}
