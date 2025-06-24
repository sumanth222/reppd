import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 animate-fadeIn"
    >
      <div class="bg-white text-black rounded-xl p-8 w-full max-w-sm text-center shadow-xl">
        <h2 class="text-2xl font-semibold text-green-600 mb-4">{{ title }}</h2>
        <p class="mb-6">{{ message }}</p>
        <button
          (click)="close.emit()"
          class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
    `,
  ],
})
export class DialogComponent {
  @Input() title = 'Success!';
  @Input() message = 'Action completed successfully.';
  @Output() close = new EventEmitter<void>();
}