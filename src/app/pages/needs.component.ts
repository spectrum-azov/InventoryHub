import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, AppItem } from '../services/data.service';

@Component({
  selector: 'app-needs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Потреба</h1>
        <div class="flex items-center space-x-4">
          <button (click)="openAddModal()" 
                  class="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Додати потребу</span>
          </button>
          <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            Всього: {{ items.length }}
          </div>
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
                <button (click)="openEditModal(item)" 
                        class="p-2 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-200 transition-colors shadow-sm"
                        title="Редагувати">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
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
              <div class="flex items-center text-sm" *ngIf="item.phone">
                <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-600 dark:text-gray-400">{{ item.phone }}</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="text-gray-600 dark:text-gray-400">{{ item.service }}</span>
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

    <!-- Edit/Add Modal -->
    <div *ngIf="editingItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
        <div class="p-8 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ isAdding ? 'Додати потребу' : 'Редагувати потребу' }}
            </h2>
            <button (click)="closeEditModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form (ngSubmit)="saveItem()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Номенклатура</label>
                <input [(ngModel)]="editingItem.nomenclature" name="nomenclature" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>
              
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Тип</label>
                <select [(ngModel)]="editingItem.type" name="type" 
                        class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
                  <option value="Робочий">Робочий</option>
                  <option value="СЕДО">СЕДО</option>
                  <option value="МОСІ">МОСІ</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Статус</label>
                <select [(ngModel)]="editingItem.status" name="status" 
                        class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
                  <option value="Потреба">Потреба</option>
                  <option value="Погоджено">Погоджено</option>
                  <option value="Відхилено">Відхилено</option>
                  <option value="Видано">Видано</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Модель</label>
                <input [(ngModel)]="editingItem.model" name="model" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Серійний номер</label>
                <input [(ngModel)]="editingItem.serialNumber" name="serialNumber" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Контактна особа</label>
                <input [(ngModel)]="editingItem.contactPerson" name="contactPerson" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Номер телефону</label>
                <input [(ngModel)]="editingItem.phone" name="phone" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Служба</label>
                <input [(ngModel)]="editingItem.service" name="service" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ID запиту</label>
                <input [(ngModel)]="editingItem.requestNumber" name="requestNumber" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Картка запиту</label>
                <input [(ngModel)]="editingItem.requestCard" name="requestCard" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Заявка</label>
                <input [(ngModel)]="editingItem.application" name="application" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Номер заявки</label>
                <input [(ngModel)]="editingItem.applicationNumber" name="applicationNumber" type="text" 
                       class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium">
              </div>

              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Примітка</label>
                <textarea [(ngModel)]="editingItem.notes" name="notes" rows="2"
                          class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium resize-none"></textarea>
              </div>
            </div>

            <div class="flex space-x-4 pt-4">
              <button type="button" (click)="closeEditModal()" 
                      class="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm">
                Скасувати
              </button>
              <button type="submit" 
                      class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-lg shadow-indigo-200">
                {{ isAdding ? 'Створити' : 'Зберегти зміни' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class NeedsComponent implements OnInit {
  private dataService = inject(DataService);
  items: AppItem[] = [];
  editingItem: AppItem | null = null;
  isAdding: boolean = false;

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

  openAddModal() {
    this.isAdding = true;
    this.editingItem = {
      id: Date.now().toString(),
      nomenclature: '',
      type: 'Робочий',
      model: '',
      serialNumber: '',
      fullName: '',
      service: '',
      request: false,
      requestNumber: '',
      date: new Date().toLocaleDateString(),
      location: '',
      status: 'Потреба',
      notes: '',
      phone: '',
      contactPerson: '',
      requestCard: '',
      application: '',
      applicationNumber: ''
    };
  }

  openEditModal(item: AppItem) {
    this.isAdding = false;
    // Create a deep copy to avoid direct binding to the store before saving
    this.editingItem = JSON.parse(JSON.stringify(item));
  }

  closeEditModal() {
    this.editingItem = null;
    this.isAdding = false;
  }

  saveItem() {
    if (this.editingItem) {
      if (this.isAdding) {
        this.dataService.addItem(this.editingItem);
      } else {
        this.dataService.updateItem(this.editingItem);
      }
      this.closeEditModal();
    }
  }
}
