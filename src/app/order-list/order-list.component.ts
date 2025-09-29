import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders = [
    { id: 'ORD001', customerName: 'John Doe', city: 'Delhi', weight: 5, status: 'Delivered', price: 50 },
    { id: 'ORD002', customerName: 'Jane Smith', city: 'Mumbai', weight: 3, status: 'In Transit', price: 30 },
    { id: 'ORD003', customerName: 'Alice Johnson', city: 'Bangalore', weight: 7, status: 'Pending', price: 70 },
    // Add more orders as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
