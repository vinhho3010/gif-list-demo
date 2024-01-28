import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/main/home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotFoundComponent } from 'src/app/static/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [{
    path: '',
    component: HomeComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
