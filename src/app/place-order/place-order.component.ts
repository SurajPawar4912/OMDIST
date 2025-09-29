import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {


  orderData = {
    name: '',
    email: '',
    phone: '',
    city: '',
    weight: 0,
    address:''
  };
  
  submitted = false;
  totalPrice = 0;
  cities = [
    { "name": "Delhi", "price": 10 },
    { "name": "Mumbai", "price": 15 },
    { "name": "Bangalore", "price": 20 },
    { "name": "Hyderabad", "price": 18 },
    { "name": "Chennai", "price": 22 },
    { "name": "Kolkata", "price": 17 },
    { "name": "Pune", "price": 19 },
    { "name": "Ahmedabad", "price": 21 },
    { "name": "Surat", "price": 23 },
    { "name": "Jaipur", "price": 16 },
    { "name": "Lucknow", "price": 14 },
    { "name": "Kanpur", "price": 25 },
    { "name": "Nagpur", "price": 20 },
    { "name": "Indore", "price": 24 },
    { "name": "Bhopal", "price": 22 },
    { "name": "Coimbatore", "price": 19 },
    { "name": "Patna", "price": 26 },
    { "name": "Vadodara", "price": 27 },
    { "name": "Visakhapatnam", "price": 18 },
    { "name": "Madurai", "price": 28 },
    { "name": "Vijayawada", "price": 21 },
    { "name": "Chandigarh", "price": 23 },
    { "name": "Mysore", "price": 22 },
    { "name": "Jabalpur", "price": 20 },
    { "name": "Amritsar", "price": 17 },
    { "name": "Raipur", "price": 26 },
    { "name": "Jodhpur", "price": 25 },
    { "name": "Gwalior", "price": 24 },
    { "name": "Agra", "price": 19 },
    { "name": "Dehradun", "price": 21 },
    { "name": "Ranchi", "price": 18 },
    { "name": "Shimla", "price": 29 },
    { "name": "Gangtok", "price": 30 },
    { "name": "Port Blair", "price": 32 },
    { "name": "Siliguri", "price": 23 },
    { "name": "Bhubaneswar", "price": 25 },
    { "name": "Cuttack", "price": 27 },
    { "name": "Rourkela", "price": 22 },
    { "name": "Dibrugarh", "price": 28 },
    { "name": "Guwahati", "price": 26 },
    { "name": "Kohima", "price": 30 },
    { "name": "Aizawl", "price": 33 },
    { "name": "Imphal", "price": 31 },
    { "name": "Shillong", "price": 29 },
    { "name": "Agartala", "price": 34 },
    { "name": "Kolkata", "price": 16 },
    { "name": "Bhilai", "price": 28 },
    { "name": "Bikaner", "price": 24 },
    { "name": "Jaisalmer", "price": 26 },
    { "name": "Pondicherry", "price": 30 },
    { "name": "Chennai", "price": 22 },
    { "name": "Thane", "price": 23 },
    { "name": "Navi Mumbai", "price": 25 },
    { "name": "Ulhasnagar", "price": 20 },
    { "name": "Kalyan", "price": 27 },
    { "name": "Kolhapur", "price": 24 },
    { "name": "Solapur", "price": 26 },
    { "name": "Latur", "price": 22 },
    { "name": "Satara", "price": 20 },
    { "name": "Jalgaon", "price": 23 },
    { "name": "Nashik", "price": 21 },
    { "name": "Aurangabad", "price": 25 },
    { "name": "Karimnagar", "price": 18 },
    { "name": "Warangal", "price": 19 },
    { "name": "Khammam", "price": 20 },
    { "name": "Nellore", "price": 21 },
    { "name": "Tirupati", "price": 22 },
    { "name": "Guntur", "price": 19 },
    { "name": "Kakinada", "price": 25 },
    { "name": "Rajahmundry", "price": 24 },
    { "name": "Vellore", "price": 23 },
    { "name": "Tirunelveli", "price": 20 },
    { "name": "Dindigul", "price": 21 },
    { "name": "Salem", "price": 22 },
    { "name": "Erode", "price": 23 },
    { "name": "Namakkal", "price": 25 },
    { "name": "Dharmapuri", "price": 24 },
    { "name": "Kumbakonam", "price": 26 },
    { "name": "Trichy", "price": 22 },
    { "name": "Madurai", "price": 20 },
    { "name": "Tiruchirapalli", "price": 25 },
    { "name": "Kancheepuram", "price": 24 },
    { "name": "Thanjavur", "price": 27 },
    { "name": "Cuddalore", "price": 23 },
    { "name": "Karaikal", "price": 25 },
    { "name": "Perambalur", "price": 22 },
    { "name": "Puducherry", "price": 26 }
  ]
  

  ngOnInit(): void {
    // Initialize default city if needed
    if (this.cities.length > 0) {
      this.orderData.city = this.cities[0].name;
      this.calculatePrice();
    }
  }

  onCityChange(): void {
    this.calculatePrice();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.isValidForm()) {
      // Handle order placement logic here
      console.log('Order Data:', this.orderData);
      // Show a success message or redirect to another page
    }
  }

  isValidForm(): any {
    return this.orderData.name && this.isValidEmail(this.orderData.email) && this.orderData.phone && this.orderData.city && this.orderData.weight > 0;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  calculatePrice(): void {
    const city = this.cities.find(c => c.name === this.orderData.city);
    if (city) {
      this.totalPrice = city.price * this.orderData.weight;
    } else {
      this.totalPrice = 0;
    }
  }
}
