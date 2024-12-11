import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Message } from '../../interfaces/message.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPostService } from '../../services/form/form-post.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit{

  postUrl="https://formspree.io/f/xrbgjera"

  form: FormGroup;

  formPostService: FormPostService;

  successMessage: string = "Message sent successfully!";
  errorMessage: string = "The message couldn't be sent!";

  constructor(private fb: FormBuilder, @Inject(FormPostService) formPostService: FormPostService, private translate: TranslateService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.formPostService = formPostService;
  }

  setMessages() : void {
    this.translate.get('CONTACT-FORM.SUCCESS-MESSAGE').subscribe((successMessage : string) => {
      this.successMessage = successMessage;
    });

    this.translate.get('CONTACT-FORM.ERROR-MESSAGE').subscribe((errorMessage : string) => {
      this.errorMessage = errorMessage;
    });
  }

  ngOnInit(): void {

    this.setMessages();
    
    // Subscribe to language change
    this.translate.onLangChange.subscribe(() => {
      this.setMessages();
    });
  }

  send() {
    if (this.form.valid) {
      //get data from form
      const formData: Message = this.form.getRawValue();

      try {
        //post request to endpoint
        this.formPostService.postRequest(this.postUrl, formData).subscribe(
          {
            next: (response: any) => 
            {
              if (response.ok) {
                Swal.fire({
                  position: "bottom-end",
                  icon: "success",
                  title: this.successMessage,
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  width: "18rem"
                });
  
                this.form.reset();
              } else {
                Swal.fire({
                position: "bottom-end",
                icon: "error",
                title: this.errorMessage,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: "18rem"
                });
              }
            }
          }
        );
      } catch (error) {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          width: "18rem"
        });
      }

    } else {
      // Mark all fields to show validation messages
      this.form.markAllAsTouched(); 
    }
  }
}
