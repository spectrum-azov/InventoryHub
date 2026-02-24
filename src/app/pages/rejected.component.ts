import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, AppItem } from '../services/data.service';

@Component({
    selector: 'app-rejected',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Відхилено</h1>
        <div class="bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-semibold">
          Всього: {{ items.length }}
        </div>
      </div>

      <div class="overflow-hidden bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Номенклатура</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Отримувач</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Служба</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Дата</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr *ngFor="let item of items" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td class="px-6 py-4">
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ item.nomenclature }}</div>
                <div class="text-xs text-gray-500">{{ item.type }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{{ item.fullName }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ item.service }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ item.date }}</td>
              <td class="px-6 py-4">
                <button (click)="restore(item.id)" 
                        class="text-indigo-600 hover:text-indigo-900 font-medium text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Відновити
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div *ngIf="items.length === 0" class="text-center py-20">
          <p class="text-gray-400">Відхилених заявок немає</p>
        </div>
      </div>
    </div>
  `
})
export class RejectedComponent implements OnInit {
    private dataService = inject(DataService);
    items: AppItem[] = [];

    ngOnInit() {
        this.dataService.items$.subscribe(() => {
            this.items = this.dataService.getItemsByStatus('Відхилено');
        });
    }

    restore(id: string) {
        this.dataService.updateStatus(id, 'Потреба');
    }
}
