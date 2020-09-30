import { Injectable } from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {Monogram} from '../../models/monogram';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemEndpoint = '/monograms';

  constructor(private httpWrapper: HttpClientWrapperService) { }

  createNewMonogram(monogram: Monogram): Observable<Monogram> {
    return this.httpWrapper.post<Monogram>(monogram, this.itemEndpoint);
  }
}
