import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import {SharedModule} from './shared/shared.module';
import {SaleModule} from './modules/sale/sale.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SaleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
