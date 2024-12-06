import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Message } from '../../interfaces/message.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPostService } from '../../services/form/form-post.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {

  postUrl="https://formspree.io/f/xrbgjera"

  form: FormGroup;

  formPostService: FormPostService;

  constructor(private fb: FormBuilder, @Inject(FormPostService) formPostService: FormPostService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.formPostService = formPostService;
  }

  send() {
    if (this.form.valid) {
      //get data from form
      const formData: Message = this.form.getRawValue();

      //post request to endpoint
      this.formPostService.postRequest(this.postUrl, formData).subscribe(
        {
          next: (response: any) => 
          {
            console.log('Form submitted successfully:', response);
            alert('Funciona, prro!');
          },
          error: (err: Error) => {
            console.log(err);
          }
        }
      );

    } else {
      // Mark all fields to show validation messages
      this.form.markAllAsTouched(); 
    }
  }
}
