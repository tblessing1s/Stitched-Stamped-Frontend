import { TestBed } from '@angular/core/testing';

import { WebsocketCallbackService } from './websocket-callback.service';

describe('WebsocketCallbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketCallbackService = TestBed.get(WebsocketCallbackService);
    expect(service).toBeTruthy();
  });
});
