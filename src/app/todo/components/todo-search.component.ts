import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-todo-search',
  template: `
    <label for="search">Search: </label>
    <input id="search" (keyup)="onSearch($event.target.value)"/>
  `
})
export class TodoSearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  changeSub: Subscription;
  searchStream = new Subject<string>();

  ngOnInit() {
    this.changeSub = this.searchStream.pipe(
      filter(searchText => searchText.length > 2),  // min length
      debounceTime(300),                            // wait for break in keystrokes
      distinctUntilChanged()                        // only if value changes
    ).subscribe(searchText => this.search.emit(searchText));
  }

  ngOnDestroy() {
    if (this.changeSub) { this.changeSub.unsubscribe(); }
  }

  onSearch(searchText: string) {
    this.searchStream.next(searchText);
  }
}
