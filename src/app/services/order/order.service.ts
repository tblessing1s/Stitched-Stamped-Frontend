import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {Order} from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderEndpoint = 'api/order';

  constructor(private httpWrapper: HttpClientWrapperService) {

  }

  createNewOrder(order: Order): Observable<Order> {
    return this.httpWrapper.post<Order>(order, this.orderEndpoint);
  }

  getOrders(): Observable<Order[]> {
    return this.httpWrapper.get(this.orderEndpoint);
  }
}
