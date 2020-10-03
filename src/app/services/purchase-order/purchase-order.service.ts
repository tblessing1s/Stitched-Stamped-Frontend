import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {PurchaseOrder} from '../../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  orderEndpoint = 'purchase-orders';

  constructor(private httpWrapper: HttpClientWrapperService) {

  }
  createNewOrder(order: PurchaseOrder): Observable<PurchaseOrder> {
    if (!order.id) {
      return this.httpWrapper.post<PurchaseOrder>(order, this.orderEndpoint);
    } else {
      return this.httpWrapper.patch<PurchaseOrder>(order, this.orderEndpoint, order.id);
    }
  }

}

