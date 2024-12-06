import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Output() clicked = new EventEmitter<void>();
  @Input() form: FormGroup = new FormGroup({});


  onClick() {
    if (this.action && this.form.valid) {
      this.action();
      this.clicked.emit();
    }
  }
}