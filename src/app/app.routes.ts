import { Routes } from '@angular/router';
import { NeedsComponent } from './pages/needs.component';
import { IssuanceComponent } from './pages/issuance.component';
import { RejectedComponent } from './pages/rejected.component';

export const routes: Routes = [
    { path: '', redirectTo: 'needs', pathMatch: 'full' },
    { path: 'needs', component: NeedsComponent },
    { path: 'issuance', component: IssuanceComponent },
    { path: 'rejected', component: RejectedComponent }
];
