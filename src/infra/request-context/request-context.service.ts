import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _token: string;
  private _userId: string;

  setToken(token: string) {
    this._token = token;
  }

  getToken(): string {
    return this._token;
  }

  setUserId(userId: string) {
    this._userId = userId;
  }

  getUserId(): string {
    return this._userId;
  }
}
