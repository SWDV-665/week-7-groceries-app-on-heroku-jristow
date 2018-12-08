
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangedSubject: Subject<boolean>;

  baseURL = "https://groceries-server-mobile.herokuapp.com";


  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');
    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }
  
  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any ) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeItem(item) {
    console.log("### Remove item - id = ", item._id);
    this.http.delete(this.baseURL + "/api/groceries/" + item._id).subscribe( res =>{
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  addItem(item) {
    this.http.post(this.baseURL+"/api/groceries/", item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  editItem(item, index) {
    console.log("Editing item = ", item);
    this.http.put(this.baseURL + "/api/groceries/" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }
}
