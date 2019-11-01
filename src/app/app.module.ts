import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LanguageModule } from "src/dropdown/language.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, LanguageModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
