import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, AppItem } from '../services/data.service';

@Component({
    selector: 'app-issuance',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Видача</h1>
        <div class="flex space-x-2">
          <div class="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
            Погоджено: {{ approvedItems.length }}
          </div>
          <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            Видано: {{ issuedItems.length }}
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div *ngFor="let item of allItems" 
             class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 p-5 flex flex-wrap md:flex-nowrap items-center justify-between transition-all hover:shadow-xl"
             [ngClass]="item.status === 'Погоджено' ? 'border-emerald-500' : 'border-blue-400'">
          
          <div class="flex-grow">
            <div class="flex items-center space-x-3 mb-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ item.nomenclature }}</h3>
              <span [class]="'text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ' + (item.status === 'Погоджено' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700')">
                {{ item.status }}
              </span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
              <div>
                <span class="block text-xs text-gray-400">Отримувач</span>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ item.fullName }}</span>
              </div>
              <div>
                <span class="block text-xs text-gray-400">Служба</span>
                <span class="text-gray-600 dark:text-gray-400">{{ item.service }}</span>
              </div>
              <div *ngIf="item.serialNumber">
                <span class="block text-xs text-gray-400">S/N</span>
                <span class="font-mono text-gray-600 dark:text-gray-400">{{ item.serialNumber }}</span>
              </div>
              <div *ngIf="item.model">
                <span class="block text-xs text-gray-400">Модель</span>
                <span class="text-gray-600 dark:text-gray-400">{{ item.model }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 md:mt-0 md:ml-6 flex items-center space-x-3">
             <button *ngIf="item.status === 'Погоджено'"
                     (click)="markAsIssued(item.id)"
                     class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-medium text-sm shadow-md shadow-emerald-200">
               Видати
             </button>
             <div class="text-right">
               <span class="block text-xs text-gray-400">Дата</span>
               <span class="text-xs font-medium text-gray-500">{{ item.date }}</span>
             </div>
          </div>
        </div>
      </div>

      <div *ngIf="allItems.length === 0" class="text-center py-20 bg-gray-50 rounded-3xl mt-10">
        <h3 class="text-xl font-medium text-gray-400">Список видачі порожній</h3>
      </div>
    </div>
  `
})
export class IssuanceComponent implements OnInit {
    private dataService = inject(DataService);
    approvedItems: AppItem[] = [];
    issuedItems: AppItem[] = [];
    allItems: AppItem[] = [];

    ngOnInit() {
        this.dataService.items$.subscribe(() => {
            this.approvedItems = this.dataService.getItemsByStatus('Погоджено');
            this.issuedItems = this.dataService.getItemsByStatus('Видано');
            this.allItems = [...this.approvedItems, ...this.issuedItems];
        });
    }

    markAsIssued(id: string) {
        this.dataService.updateStatus(id, 'Видано');
    }
}
