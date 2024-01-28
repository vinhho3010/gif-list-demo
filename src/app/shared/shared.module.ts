import { trigger, state, style, transition, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatModule } from "./mat.module";
import { HeaderComponent } from "./components/header/header.component";


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MatModule,
    ReactiveFormsModule,
    HeaderComponent
  ]
})
export class SharedModule { }
