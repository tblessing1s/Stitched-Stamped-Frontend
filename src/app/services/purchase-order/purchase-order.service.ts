import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {PurchaseOrder} from '../../models/purchase-order';
import {PurchaseOrderTable} from '../../models/purchase-order-table';
import {MonogramTable} from '../../models/monogram-table';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  orderEndpoint = 'purchase-orders';
  purchaseOrderTableEndpoint = 'purchaseOrderTable';

  constructor(private httpWrapper: HttpClientWrapperService) {

  }
  createNewOrder(order: PurchaseOrder): Observable<PurchaseOrder> {
    if (!order.id) {
      return this.httpWrapper.post<PurchaseOrder>(order, this.orderEndpoint);
    } else {
      return this.httpWrapper.patch<PurchaseOrder>(order, this.orderEndpoint, order.id);
    }
  }

  getPurchaseOrder(orderId: number): Observable<PurchaseOrder> {
    return this.httpWrapper.get<PurchaseOrder>(this.orderEndpoint + `/${orderId}`)
  }

  getAllInProgressPurchaseOrders(): Observable<PurchaseOrderTable[]> {
    return this.httpWrapper.get<PurchaseOrderTable[]>(this.purchaseOrderTableEndpoint);
  }

  updatePurchaseOrderToFinish(orderId: number): Observable<PurchaseOrderTable[]> {
    return this.httpWrapper.postById(this.purchaseOrderTableEndpoint + `/purchaseOrder/${orderId}`);
  }
}

