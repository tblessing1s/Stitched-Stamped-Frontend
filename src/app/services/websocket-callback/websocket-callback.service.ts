import { Injectable } from '@angular/core';
import {HttpClientWrapperService} from '../../shared/http-client-wrapper/http-client-wrapper.service';
import {SmsMessage} from '../../models/sms-message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketCallbackService {

  constructor(private httpWrapper: HttpClientWrapperService) { }

  sendSMS(message: SmsMessage) {
    return this.httpWrapper.postSMS(message, 'sms');
  }
}
