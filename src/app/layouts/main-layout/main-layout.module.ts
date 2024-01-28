import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { SearchFieldComponent } from 'src/app/pages/main/home/search-field/search-field.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from 'src/app/pages/main/home/home.component';
import { GifItemComponent } from 'src/app/pages/main/home/gif-item/gif-item.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    SearchFieldComponent,
    GifItemComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainLayoutModule { }
