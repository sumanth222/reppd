import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../dialog-component/dialog-component';

@Component({
  selector: 'app-book-now',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DialogComponent],
  templateUrl: './book-now.html'
})
export class BookNow {
  bookingForm: FormGroup;
  showDialog = false;
  dialogTitle = '';
  dialogMessage = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      area: ['', Validators.required],
      trainingType: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.logPageVisit();
  }

  async logPageVisit() {
    try {
      const auditRef = collection(this.firestore, 'pageVisits');
      await addDoc(auditRef, {
        page: 'BookNow',
        timestamp: new Date(),
        referrer: document.referrer || 'Direct',
      });
    } catch (error) {
      console.error('Audit log failed:', error);
    }
  }

  async onSubmit() {
    if (this.bookingForm.invalid) return;

    const formData = this.bookingForm.value;

    try {
      const bookingRef = collection(this.firestore, 'bookings');
      await addDoc(bookingRef, { ...formData, timestamp: new Date() });

      this.dialogTitle = 'Booking Request Received! 🎯';
      this.dialogMessage = `We'll reach out to you soon to confirm your session.`;
      this.showDialog = true;
      this.bookingForm.reset();
    } catch (error) {
      console.error('Booking failed:', error);
      this.dialogTitle = 'Oops!';
      this.dialogMessage = `Something went wrong. Please try again.`;
      this.showDialog = true;
    }
  }
}
