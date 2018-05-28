import * as fetch from 'isomorphic-fetch';

class Transport {
  private static __instance: any;
  private _headers: any;
  private _baseUrl: string;

  constructor() {
    if (Transport.__instance) {
      return Transport.__instance;
    }

    this._headers = {};
    this._baseUrl = '';

    Transport.__instance = this;

    this.setUpHeaders();
  }

  get BaseUrl(): string {
    return this._baseUrl;
  }

  set BaseUrl(url: string) {
    this._baseUrl = url;
  }

  public get(uri: string, timeout: number = 20000): any {
    return this._sender(uri, 'GET', timeout);
  }

  public post(uri: string, data: any = {}, timeout: number = 20000): any {
    return this._sender(uri, 'POST', timeout, JSON.stringify(data));
  }

  private async _sender(uri: string, type: string, timeout: number, data?: string): Promise<any> {
    const options = {
      method: type,
      mode: 'no-cors',
      body: data,
      timeout: timeout
    };

    return await fetch(this._baseUrl + uri, this.setRequest(options));
  }

  private setRequest(options?: any): any {
    return {
      method: options.method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: options.body,
      credentials: 'same-origin',
      timeout: options.timeout
    };
  }

  private getFetchRequest(options?: any): any {
    return this.setRequest(options);
  }

  private setUpHeaders() {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }
}

const transport = new Transport();

export default transport;
