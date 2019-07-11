import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-doby-search',
  template: `
    <label for="search">Search: </label>
    <input id="search" (keyup)="onSearch($event.target.value)"/>
  `
})
export class DobySearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  changeSub: Subscription;
  searchStream = new Subject<string>();

  ngOnInit() {
    this.changeSub = this.searchStream.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => this.search.emit(search));
  }

  ngOnDestroy() {
    if (this.changeSub) { this.changeSub.unsubscribe(); }
  }

  onSearch(search: string) {
    this.searchStream.next(search);
  }
}
