import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  rootUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) {}

  createUser(postCard: any) {
    return this.http.post(this.rootUrl + 'Users/', postCard);
  }

  getUser() {
    return this.http.get(this.rootUrl + 'Users/');
  }

  getFlightsData() {
    return this.http.get(
      'https://opensky-network.org/api/flights/all?begin=1682605907&end=1682609507'
    );
  }
}
