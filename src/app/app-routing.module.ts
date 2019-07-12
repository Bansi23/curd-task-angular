import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudDemoComponent } from './crud-demo/crud-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/studentinfo', pathMatch: 'full' },
  { path: 'studentinfo', component: CrudDemoComponent },
  { path: '**', redirectTo: 'studentinfo'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
