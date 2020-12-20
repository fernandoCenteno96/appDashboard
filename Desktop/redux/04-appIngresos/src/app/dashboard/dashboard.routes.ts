import { Routes } from '@angular/router';
import { StatisticsComponent } from '../entryEgress/statistics/statistics.component';
import { EntryEgressComponent } from '../entryEgress/entry-egress/entry-egress.component';
import { DetailsComponent } from '../entryEgress/details/details.component';
export const dahsboardRouter: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'entry-egress', component: EntryEgressComponent },
  { path: 'details', component: DetailsComponent },
];
