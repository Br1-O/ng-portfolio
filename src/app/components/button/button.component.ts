import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() action: () => void = () => {}; // Function to execute
  @Output() clicked = new EventEmitter<void>(); // Optional output event

  onClick() {
    if (this.action) {
      this.action(); // Call the passed function
    }
    this.clicked.emit(); // Emit event for the parent component
  }
}