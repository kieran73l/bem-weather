import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

const PAGES = [HomeComponent];

@NgModule({
  declarations: PAGES,
  imports: [CommonModule],
  exports: PAGES,
})
export class PagesModule {}
