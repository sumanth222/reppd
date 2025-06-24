import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../dialog-component/dialog-component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DialogComponent],
  templateUrl: './contact.html',
})
export class Contact {
  contactForm: FormGroup;
  showDialog = false;
  dialogTitle = '';
  dialogMessage = '';


  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['',
        [Validators.required,
         Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
      message: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) return;

    const { name, phone, message } = this.contactForm.value;

    try {
      const contactRef = collection(this.firestore, 'contacts');
      await addDoc(contactRef, { name, phone, message, timestamp: new Date() });

      this.contactForm.reset();
      this.showDialog = true;
        // On successful action
      this.dialogTitle = 'Thank You!';
      this.dialogMessage = 'We will reach out soon.';
      this.showDialog = true;
    } catch (err) {
      console.error(err);
      // You can show an error dialog too if you'd like
    }
  }
}