import {Injectable} from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {OrderItem} from '../../models/order-item';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Monogram} from '../../models/monogram';
import {MonogramTable} from '../../models/monogram-table';
import {SpecialOrderTable} from '../../models/special-order-table';
import {SpecialOrder} from '../../models/special-order';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private state = new BehaviorSubject(false);
  private stateSubject: Subject<{ orderTable: any, orderType: string }> = new Subject<{ orderTable: any; orderType: string }>();

  private displaySpecialOrderState = new BehaviorSubject(new SpecialOrderTable());

  orderItemEndpoint = 'orderItems';
  orderTableEndpoint = 'orderTable';

  constructor(private httpWrapper: HttpClientWrapperService) {
  }

  createOrderItem(orderItem: OrderItem): Observable<any> {
    return this.httpWrapper.post<OrderItem>(orderItem, this.orderItemEndpoint);
  }

  getAllMonogramsInProgressOrdersByPurchaseOrder(purchaseOrderId: number): Observable<MonogramTable[]> {
    return this.httpWrapper.get<MonogramTable[]>(this.orderTableEndpoint + `/purchaseOrder/${purchaseOrderId}/monogram-table`);
  }

  getAllSpecialOrdersInProgressOrdersByPurchaseOrder(purchaseOrderId: number): Observable<SpecialOrderTable[]> {
    return this.httpWrapper.get<SpecialOrderTable[]>(this.orderTableEndpoint + `/purchaseOrder/${purchaseOrderId}/specialOrder-table`);
  }

  getMonogramByOrderId(orderId: number): Observable<any> {
    return this.httpWrapper.get<Monogram>(this.orderItemEndpoint + `/${orderId}/monogram`);
  }

  getMonogramsByOrderId(orderId: number): Observable<Monogram[]> {
    return this.httpWrapper.get<Monogram[]>(this.orderItemEndpoint + `/purchaseOrder/${orderId}/monograms`);
  }

  getSpecialOrderByOrderId(orderId: number): Observable<any> {
    return this.httpWrapper.get<SpecialOrder>(this.orderItemEndpoint + `/${orderId}/specialOrder`);
  }

  getSpecialOrdersByOrderId(orderId: number): Observable<SpecialOrder[]> {
    return this.httpWrapper.get<SpecialOrder[]>(this.orderItemEndpoint + `/purchaseOrder/${orderId}/specialOrders`);
  }

  getAction(): Observable<boolean> {
    return this.state;
  }

  updateAction(isEdit: boolean) {
    return this.state.next(isEdit);
  }

  getOrderDisplay(): Observable<{ orderTable: any, orderType: string }> {
    console.log('getOrderDisplay', this.stateSubject);
    return this.stateSubject;
  }

  updateOrderDisplay(orderType: string, orderTable: any) {
    console.log('updateOrderDisplay');
    return this.stateSubject.next({orderTable, orderType});
  }

  // getSpecialOrderDisplay(): Observable<SpecialOrderTable> {
  //   return this.displaySpecialOrderState;
  // }
  //
  // updateSpecialOrderDisplay(param: SpecialOrderTable) {
  //   return this.displaySpecialOrderState.next(param);
  // }
}
