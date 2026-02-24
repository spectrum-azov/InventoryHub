import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppItem {
    id: string;
    nomenclature: string;
    type: string;
    model: string;
    serialNumber: string;
    fullName: string;
    service: string;
    request: boolean;
    requestNumber: string;
    date: string;
    location: string;
    status: 'Потреба' | 'Погоджено' | 'Відхилено' | 'Видано' | string;
    notes: string;
    amount?: number;
    contactPerson?: string;
    position?: string;
    phone?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private itemsSubject = new BehaviorSubject<AppItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    constructor() {
        this.loadData();
    }

    private loadData() {
        const savedData = localStorage.getItem('app_data');
        if (savedData) {
            this.itemsSubject.next(JSON.parse(savedData));
        } else {
            // Mock initial data based on the structure we saw
            const initialData: AppItem[] = [
                {
                    id: '1',
                    nomenclature: 'LTE модем комплект',
                    type: 'Робочий',
                    amount: 3,
                    contactPerson: 'Мачо',
                    position: 'СБпС',
                    service: 'СБпС',
                    phone: '0975006952',
                    date: '24.01.2026',
                    location: 'БЗ',
                    status: 'Потреба',
                    notes: '',
                    model: '',
                    serialNumber: '',
                    fullName: 'Мачо',
                    request: false,
                    requestNumber: ''
                },
                {
                    id: '2',
                    nomenclature: 'Ноутбук Asus',
                    type: 'Робочий',
                    amount: 1,
                    contactPerson: 'Єршов Олексій',
                    position: 'Менеджер',
                    service: 'Кадрова робота G-1',
                    phone: '0931234567',
                    date: '20.01.2026',
                    location: 'Київ',
                    status: 'Потреба',
                    notes: 'Терміново',
                    model: '',
                    serialNumber: '',
                    fullName: 'Єршов Олексій',
                    request: true,
                    requestNumber: '137'
                },
                {
                    id: '3',
                    nomenclature: 'Принтер HP',
                    type: 'СЕДО',
                    amount: 1,
                    contactPerson: 'Горєліков Ілля',
                    position: 'Фін. відділ',
                    service: 'Фін. забезпечення',
                    phone: '0671112233',
                    date: '15.01.2026',
                    location: 'Київ',
                    status: 'Видано',
                    notes: '',
                    model: 'LaserJet 4102dw',
                    serialNumber: 'CNCRT1H5LT',
                    fullName: 'Горєліков Ілля',
                    request: false,
                    requestNumber: '122'
                }
            ];
            this.saveAndNext(initialData);
        }
    }

    private saveAndNext(items: AppItem[]) {
        localStorage.setItem('app_data', JSON.stringify(items));
        this.itemsSubject.next(items);
    }

    updateStatus(id: string, newStatus: string) {
        const currentItems = this.itemsSubject.value;
        const updatedItems = currentItems.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        );
        this.saveAndNext(updatedItems);
    }

    updateItem(updatedItem: AppItem) {
        const currentItems = this.itemsSubject.value;
        const updatedItems = currentItems.map(item =>
            item.id === updatedItem.id ? { ...updatedItem } : item
        );
        this.saveAndNext(updatedItems);
    }

    getItemsByStatus(status: string): AppItem[] {
        return this.itemsSubject.value.filter(item => item.status === status);
    }
}
