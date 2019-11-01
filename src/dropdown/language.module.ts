import { ClickOutsideDirective } from "../directives/ClickOutsideDirective";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LanguageDropdownComponent } from "./language.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [LanguageDropdownComponent, ClickOutsideDirective],
  imports: [CommonModule, BrowserModule, FormsModule],
  exports: [LanguageDropdownComponent],
  providers: []
})
export class LanguageModule {}
