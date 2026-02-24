export interface Item {
    id: string;
    nomenclature: string;
    type: string;
    model: string;
    serialNumber: string;
    fullName: string;
    service: string;
    request: boolean;
    requestNumber: string | number | null;
    date: string | null;
    location: string | null;
    status: 'Потреба' | 'Погоджено' | 'Відхилено' | 'Видано' | string;
    notes: string | null;
}
