import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'service/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public dataService: DataServiceService) {}

  public airportData: any = [];

  ngOnInit(): void {
    this.dataService.getFlightsData().subscribe((res) => {
      if (res) {
        this.airportData = res;
      }
    });
  }
}
