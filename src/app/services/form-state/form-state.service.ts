import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OrderItem} from '../../models/order-item';
import {Monogram} from '../../models/monogram';
import {SpecialOrder} from '../../models/special-order';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private currentOrderItem = new OrderItem();
  private state = new BehaviorSubject(new OrderItem());
  private listOfMonograms: any[] = [];
  private listOfSpecialOrders: any[] = [];
  private listOfMonogramState = new BehaviorSubject<Monogram[]>([]);
  private listOfSpecialOrderState = new BehaviorSubject<SpecialOrder[]>([]);

  getState(): any {
    return this.state;
  }

  getListOfMonogramsState(): Observable<Monogram[]> {
    return this.listOfMonogramState;
  }

  getListOfSpecialOrderState(): Observable<SpecialOrder[]> {
    return this.listOfSpecialOrderState;
  }

  update(newValue: any, property: string, sendStateChange: boolean = true) {
    this.currentOrderItem[property] = newValue;
    if (sendStateChange) {
      this.sendStateChange();
    }
  }

  updateMonogram(monogram: Monogram) {
    const isExistingMonogram = this.listOfMonograms.some(monogramList => monogramList.id === monogram.id);
    if (isExistingMonogram) {
      const replaceMonogram = this.listOfMonograms.findIndex(monogramToFind => monogramToFind.id === monogram.id);
      this.listOfMonograms.splice(replaceMonogram, 1, monogram);
    } else {
      this.listOfMonograms.push(monogram);
    }
    this.listOfMonogramState.next(this.listOfMonograms);
  }

  updateSpecialOrder(specialOrder: SpecialOrder) {
    const isExistingSpecialOrder = this.listOfSpecialOrders.some(specialOrderList => specialOrderList.id === specialOrder.id);
    if (isExistingSpecialOrder) {
      const replaceSpecialOrder = this.listOfSpecialOrders.findIndex(specialOrderToFind => specialOrderToFind.id === specialOrder.id);
      this.listOfSpecialOrders.splice(replaceSpecialOrder, 1, specialOrder);
    } else {
      this.listOfSpecialOrders.push(specialOrder);
    }
    this.listOfSpecialOrderState.next(this.listOfSpecialOrders);
  }

  removeSpecialOrder(specialOrder: SpecialOrder) {
    const newListOfSpecialOrderState: SpecialOrder[] = this.listOfSpecialOrderState.getValue();
    newListOfSpecialOrderState.forEach((item, index) => {
      if (item === specialOrder) {
        newListOfSpecialOrderState.splice(index, 1);
      }
    });
    this.listOfSpecialOrderState.next(newListOfSpecialOrderState);
  }

  removeMonogram(monogram: Monogram) {
    const newListOfMonogramState: Monogram[] = this.listOfMonogramState.getValue();
    newListOfMonogramState.forEach((item, index) => {
      if (item === monogram) {
        newListOfMonogramState.splice(index, 1);
      }
    });
    this.listOfMonogramState.next(newListOfMonogramState);
  }

  sendStateChange() {
    this.state.next(this.currentOrderItem);
  }
}
