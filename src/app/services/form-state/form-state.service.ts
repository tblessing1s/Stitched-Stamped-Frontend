import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {OrderItem} from '../../models/order-item';
import {Monogram} from '../../models/monogram';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private currentOrderItem = new OrderItem();
  private state = new BehaviorSubject(new OrderItem());
  private listOfMonograms: any[] = [];
  private listOfMonogramState = new BehaviorSubject<Monogram[]>([]);

  getState(): any {
    return this.state;
  }

  getListOfMonogramsState(): Observable<Monogram[]> {
    return this.listOfMonogramState;
  }

  update(newValue: any, property: string, sendStateChange: boolean = true) {
    this.currentOrderItem[property] = newValue;
    if (sendStateChange) {
      this.sendStateChange();
    }
  }

  updateMonogram(monogram: Monogram) {
    console.log('monogram to update', monogram);
    const isExistingMonogram = this.listOfMonograms.some(monogramList => monogramList.id === monogram.id);
    console.log('isExistingMonogram', isExistingMonogram);
    if (isExistingMonogram) {
      const replaceMonogram = this.listOfMonograms.findIndex(monogramToFind => monogramToFind.id === monogram.id);
      this.listOfMonograms.splice(replaceMonogram, 1, monogram);
    } else {
      this.listOfMonograms.push(monogram);
    }
    console.log('list of monograms', this.listOfMonograms);
    this.listOfMonogramState.next(this.listOfMonograms);
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
