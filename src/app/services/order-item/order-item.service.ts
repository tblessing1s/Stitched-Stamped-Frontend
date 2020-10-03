import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {OrderItem} from '../../models/order-item';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  orderItemEndpoint = 'orderItems';

  constructor(private httpWrapper: HttpClientWrapperService) { }



  createOrderItem(orderItem: OrderItem): Observable<any> {
    return this.httpWrapper.post<OrderItem>(orderItem, this.orderItemEndpoint);
  }
}
