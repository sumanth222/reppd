import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog-component/dialog-component';

@Component({
  selector: 'app-request-pdf',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogComponent],
  templateUrl: './request-pdf.html'
})
export class RequestPdf {
  pdfForm: FormGroup;
  showDialog = false;
  dialogTitle = '';
  dialogMessage = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.pdfForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      muscle1: ['', Validators.required],
      muscle2: ['', Validators.required],
      workoutLevel: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.pdfForm.invalid) return;

    const formData = this.pdfForm.value;

    try {
      const pdfRequestsRef = collection(this.firestore, 'pdfRequests');
      await addDoc(pdfRequestsRef, {
        ...formData,
        timestamp: new Date()
      });

      this.dialogTitle = 'Request Submitted! 💪';
      this.dialogMessage = 'We’ll contact you soon and share your custom workout plans after confirmation.';
      this.showDialog = true;
      this.pdfForm.reset();
    } catch (error) {
      console.error('Error submitting PDF request:', error);
      this.dialogTitle = 'Something went wrong';
      this.dialogMessage = 'Please try again or contact us directly.';
      this.showDialog = true;
    }
  }
}
