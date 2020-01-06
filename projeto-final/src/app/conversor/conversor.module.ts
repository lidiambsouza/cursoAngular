import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorComponent } from './components';
import {MoedaService, ConversorService} from './services';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NumeroDirective } from './directives';
import { ModalCotacaoComponent } from './utils';
import { DataBrPipe } from './pipes';
import {ConversorRoutingComponent} from './conversor-routing.component';
import {ConversorRoutingModule} from './conversor-routing.module';



@NgModule({
  declarations: [ConversorComponent,
     NumeroDirective,
      ModalCotacaoComponent,
      ConversorRoutingComponent,
       DataBrPipe],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ConversorRoutingModule
  ],
  exports: [
    ConversorComponent
  ],
  providers: [MoedaService, ConversorService]
})
export class ConversorModule { }
