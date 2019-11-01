import { Component } from "@angular/core";
import { IGroupLanguage } from "src/dropdown/language.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  groups: IGroupLanguage[] = [];

  constructor() {
    this.groups.push({ name: "Automation", languages: [] });
    this.groups.push({ name: "Monitors", languages: [] });

    for (let i = 0; i <= 20; i++) {
      this.groups[0].languages.push({
        Name: "English_" + i,
        Lcid: i,
        RightToLeft: true,
        Code: "EN_" + i,
        Mapped: i % 2 == 0
      });
    }

    for (let i = 0; i <= 600; i++) {
      this.groups[1].languages.push({
        Name: "Hinci_" + i,
        Lcid: i,
        RightToLeft: true,
        Code: "HI_" + i,
        Mapped: i % 10 == 0
      });
    }
  }
}
