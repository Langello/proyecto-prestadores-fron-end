import { Component, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  

  constructor(
    private queryElement: ElementRef,
    private _apiService: ApiService,
    
  ) {
    
  }

  onSearchTextEntered(searchValue: string) {
    this.query = searchValue;
  }
  search() {
  this.query = this.queryElement.nativeElement.querySelector("#query").value;
  this._apiService.textObserved.next(this.query);
  }
}


