import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-todo-tags',
  template: `
    <label for="tags" title="enter tags as comma separated values">Tags: </label>
    <input id="tags"
      [value]="tags?.length && tags?.join(', ')"
      (keyup)="onTagsChange($event.target.value)"/>
  `
})
export class TodoTagsComponent implements OnInit, OnDestroy {
  @Input() tags: string[];
  @Output() tagsChange = new EventEmitter<string[]>();
  changeSub: Subscription;

  tagsStream = new Subject<string>();

  ngOnInit() {
    this.changeSub = this.tagsStream.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(values => !!values || values === ''),
      map((values: string) => values.split(',').map(v => v.trim()).filter(v => v)),
    ).subscribe(tags => this.tagsChange.emit(tags));
  }

  ngOnDestroy() {
    if (this.changeSub) { this.changeSub.unsubscribe(); }
  }

  onTagsChange(tags: string) {
    this.tagsStream.next(tags);
  }
}
