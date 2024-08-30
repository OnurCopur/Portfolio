import { Directive, ElementRef, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true
})
export class IntersectionObserverDirective implements AfterViewInit, OnDestroy {
  @Output() visible = new EventEmitter<boolean>(); // Typencheck für boolean
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible.emit(entry.isIntersecting); // Emit boolean value
    }, {
      threshold: [0.1]
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
