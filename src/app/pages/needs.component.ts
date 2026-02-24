import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, AppItem } from '../services/data.service';

@Component({
    selector: 'app-needs',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Потреба</h1>
        <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
          Всього: {{ items.length }}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let item of items" 
             class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02]">
          <div class="p-5">
            <div class="flex justify-between items-start mb-4">
              <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                {{ item.type }}
              </span>
              <div class="flex space-x-2">
                <button (click)="approve(item.id)" 
                        class="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors shadow-sm"
                        title="Погодити">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button (click)="reject(item.id)" 
                        class="p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors shadow-sm"
                        title="Відхилити">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ item.nomenclature }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              {{ item.notes || 'Немає приміток' }}
            </p>

            <div class="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div class="flex items-center text-sm">
                <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ item.contactPerson || item.fullName }}</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="text-gray-600 dark:text-gray-400">{{ item.service }}</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-600 dark:text-gray-400">{{ item.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="items.length === 0" class="text-center py-20">
        <div class="text-gray-400 mb-4">
          <svg class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-500">Потреб наразі немає</h3>
      </div>
    </div>
  `
})
export class NeedsComponent implements OnInit {
    private dataService = inject(DataService);
    items: AppItem[] = [];

    ngOnInit() {
        this.dataService.items$.subscribe(() => {
            this.items = this.dataService.getItemsByStatus('Потреба');
        });
    }

    approve(id: string) {
        this.dataService.updateStatus(id, 'Погоджено');
    }

    reject(id: string) {
        this.dataService.updateStatus(id, 'Відхилено');
    }
}
