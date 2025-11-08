import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  public token:string|null = null
  public username:string|null = null

  public  events:UserEvent[] = []
  http = inject(HttpClient)
  constructor(private authService: AuthService) {
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token")
      this.getUsername()
    }
  }



  public requestUserData(): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(`${this.authService.apiUrl}/user/username`, {
      headers, responseType: 'text' as const});
  }


  public getUsername() {

    this.requestUserData().subscribe({
      next: res => this.username = res,
      error: err => {console.error('Get username error:', err)
        this.logout()
      }

    });
  }

 public requestBookings(): Observable<any> {
    return this.http.get('http://localhost:8080/getbookings');
  }

  // Function to subscribe and handle the JSON later
  public getBookings() {
    this.requestBookings().subscribe({
      next: data => {

        console.log(data)
        data.forEach( (el:Booking) => {
          if(el.users == this.username)
          this.events?.push({
  roomName: 'Seats: ' + el.objectIds.join(", "),
  title: "",
  date: el.startTime,
  time: el.endTime,
  type: 'meeting' ,
  description: ""
          })

        console.log("1")
        });
        console.log(this.events)
        // Parse or process later
      },
      error: err => {
        console.error('Get bookings error:', err);
      }
    });
  }

  public saveToken(token:string){
    this.token=token
    localStorage.setItem("token", token)
  }

  public logout(){
    this.username = null
    this.token = null
    localStorage.removeItem("token")
  }

}


interface UserEvent {
  roomName: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'conference' | 'recreation';
  description: string;
}

export interface Booking {
  id: number;
  objectIds: number[];
  users: string;
  startTime: string; // or Date if you plan to convert the string to Date
  endTime: string;   // same as above
}
