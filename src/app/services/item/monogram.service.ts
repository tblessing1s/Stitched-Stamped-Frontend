import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {Monogram} from '../../models/monogram';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonogramService {
  itemEndpoint = 'monograms';

  constructor(private httpWrapper: HttpClientWrapperService) { }

  createNewMonogram(monogram: Monogram): Observable<any> {
    if (!monogram.id) {
      return this.httpWrapper.post<Monogram>(monogram, this.itemEndpoint);
    } else {
      return this.httpWrapper.patch<Monogram>(monogram, this.itemEndpoint, monogram.id);
    }
  }

  deleteMonogram(monogram: Monogram): Observable<any> {
    return this.httpWrapper.delete<Monogram>(this.itemEndpoint, monogram.id);
  }
}
