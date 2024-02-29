import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameboardComponent } from './component/gameboard/gameboard.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule,
  ],
  declarations: [AppComponent, GameboardComponent
  ],
  bootstrap: [AppComponent],
  providers: [
   
  ]
})
export class AppModule { }
