import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  Output
} from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

export class Language {
  Name: string;
  Lcid: number;
  RightToLeft: boolean;
  Code: string;
  Mapped: boolean;
}

export interface IGroupLanguage {
  name: string;
  languages?: Language[];
}

@Component({
  selector: "app-language-dropdown",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.css"]
})
export class LanguageDropdownComponent implements OnInit, AfterViewInit {
  @Input() readonly groups: IGroupLanguage[] = [];
  @Input() multiple = true;
  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;
  @Output() _selectedItems: any[] = [];

  filteredObject: IGroupLanguage[] = [];
  searchQuery: string;
  searchModel: string;
  _openSearchContent = false;
  _searchTextQueryChanged: Subject<string> = new Subject<string>();

  openSearchContent() {
    this._openSearchContent = !this._openSearchContent;

    if (this._openSearchContent) {
      this.filteredObject = this.groups;
      this.searchInput.nativeElement.focus();
    } else {
      this.searchModel = this.formatSelectedItems();
    }
  }

  resetDropDown() {
    this.filteredObject = this.groups;
    this.searchModel = null;
    this._openSearchContent = false;
    this._selectedItems = [];
  }

  formatSelectedItems(): string {
    return this._selectedItems.map((item: Language) => item.Name).join(", ");
  }

  searchModeChanged(searchQuery: string): void {
    this._searchTextQueryChanged.next(searchQuery);
  }

  showCloseButton(): boolean {
    return (
      (this.searchModel && this.searchModel.length > 0) ||
      this._selectedItems.length > 0
    );
  }

  trackByFn(index: number, item: Language) {
    return item.Code;
  }

  isHighlighted(element: Language) {
    return element.Mapped;
  }

  isSelected(element: Language) {
    const foundElement = this._selectedItems.findIndex(
      (lg: Language) => lg.Code === element.Code
    );
    return foundElement > -1;
  }

  foundResult() {
    return (
      this.filteredObject.reduce(
        (acc, element) => acc + element.languages.length,
        0
      ) > 0
    );
  }

  select(item: Language) {
    const foundElement = this._selectedItems.findIndex(
      (lg: Language) => lg.Code === item.Code
    );
    if (foundElement > -1) {
      this._selectedItems.splice(foundElement, 1);
    } else {
      if (this.multiple) {
        this._selectedItems.push(item);
      } else {
        this._selectedItems = [].concat([item]);
      }
    }
  }

  clickOutside($event) {
    if (!$event) {
      this.openSearchContent();
    }
  }

  ngAfterViewInit() {
    this._searchTextQueryChanged
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        map(query => query.toLocaleLowerCase().trim())
      )
      .subscribe((searchQuery: string) => {
        this.searchQuery = searchQuery;
        this.search(searchQuery);
      });
  }

  ngOnInit() {
    this.filteredObject = this.groups;
  }

  private search(searchQuery: string) {
    this.filteredObject = JSON.parse(JSON.stringify(this.groups));
    this.filteredObject.forEach(item => {
      item.languages = item.languages.filter(
        lg =>
          lg.Name.toLocaleLowerCase().indexOf(searchQuery) != -1 ||
          lg.Code.toLocaleLowerCase().indexOf(searchQuery) != -1
      );
    });
  }
}
