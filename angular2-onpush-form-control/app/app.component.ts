import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Control} from "@angular/common";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'my-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .example {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
    }
    
    .list-item {
      margin: 3px;
    }
    
    .list {
      margin-top: 10px;
    }
  `],
  template: `
    <div class="example">
      <label><input #i type="checkbox" (change)="markForCheck = i.checked">Automatically mark component to be checked</label>
    </div>

    <div class="example">
      <h4>Numeric input example</h4>
      <div>
        High pass filter: <input type="number" [ngFormControl]="filter"/>
      </div>
      <div class="list">
        <span class="list-item" *ngFor="let n of filteredNumbers">{{n}}</span>
      </div>
    </div>
    
    <div class="example">
      <h4>Text input example</h4>
      <div>
        Lorem filter: <input type="text" [ngFormControl]="loremFilter"/>
      </div>
      <div class="list">
        <span class="list-item" *ngFor="let word of filteredLorem">{{word}}</span>
      </div>
    </div>
  `
})
export class AppComponent { 
  markForCheck = false;
  
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  filteredNumbers: number[];
  filter = new Control();
  
  lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
  filteredLorem: string[];
  loremFilter = new Control();
  
  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.filteredNumbers = this.numbers;
    
    this.filter.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((filter: number) => {
        this.processFilter(filter);
        if(this.markForCheck) { changeDetectorRef.markForCheck(); }
      });
      
    this.filteredLorem = this.lorem.split(" ");
    
    this.loremFilter.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((filter: string) => {
        this.processLoremFilter(filter);
        if(this.markForCheck) { changeDetectorRef.markForCheck(); }
      });
  }
  
  private processFilter(filter: number): void {
    this.filteredNumbers = this.numbers.filter((n) => { return n > filter; });
  }
  
  private processLoremFilter(filter: string): void {
    let split = this.lorem.split(" ");
    
    if(filter === "") {
      this.filteredLorem = split;
    }
    else {
      this.filteredLorem = split.filter((word) => { return word.indexOf(filter) > -1;});
    }
  }
}
