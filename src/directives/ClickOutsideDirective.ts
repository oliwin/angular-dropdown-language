import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  OnInit
} from "@angular/core";

@Directive({
  selector: "[clickOutside]"
})
export class ClickOutsideDirective implements OnInit {
  @Output() clickOutside = new EventEmitter();

  captured = false;
  constructor(private elRef: ElementRef) {}

  @HostListener("document:click", ["$event.target"])
  onClick(target) {
    if (!this.captured) {
      return;
    }

    if (!this.elRef.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }

  ngOnInit() {
    document.addEventListener("click", () => (this.captured = true), {
      capture: true,
      once: true
    });
  }
}
