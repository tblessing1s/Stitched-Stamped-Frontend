import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {Monogram} from '../../models/monogram';
import {BehaviorSubject, Observable} from 'rxjs';
import {MonogramTable} from '../../models/monogram-table';
import {SpecialOrder} from '../../models/special-order';
import {Form, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MonogramService {
  listener: any;
  formGroup: FormGroup;

  monogramEndpoint = 'monograms';
  specialOrderEndpoint = 'specialOrders';

  constructor(private httpWrapper: HttpClientWrapperService) { }


  createNewMonogram(monogram: Monogram): Observable<any> {
    if (!monogram.id) {
      return this.httpWrapper.post<Monogram>(monogram, this.monogramEndpoint);
    } else {
      return this.httpWrapper.patch<Monogram>(monogram, this.monogramEndpoint, monogram.id);
    }
  }

  deleteMonogram(monogram: Monogram): Observable<any> {
    return this.httpWrapper.delete<Monogram>(this.monogramEndpoint, monogram.id);
  }

  createNewSpecialOrder(specialOrder: SpecialOrder): Observable<any>  {
    if (!specialOrder.id) {
      return this.httpWrapper.post<SpecialOrder>(specialOrder, this.specialOrderEndpoint);
    } else {
      return this.httpWrapper.patch<SpecialOrder>(specialOrder, this.specialOrderEndpoint, specialOrder.id);
    }
  }

  deleteSpecialOrder(specialOrder: SpecialOrder): Observable<any> {
    return this.httpWrapper.delete<SpecialOrder>(this.specialOrderEndpoint, specialOrder.id);
  }

}
