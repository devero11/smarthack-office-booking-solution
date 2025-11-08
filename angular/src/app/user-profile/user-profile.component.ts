/*
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{


  constructor(private router:Router ,public userService: UserService){
  }

  ngOnInit(): void {
    if(!this.userService.token)
      this.router.navigate(["/login"])
    this.userService.getUsername()
  }
  logout(){
    this.userService.logout()
    this.router.navigate(["/login"])
  }


}
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MapComponent } from '../map/map.component';

interface UserEvent {
  roomName: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'conference' | 'recreation';
  description: string;
}

interface PendingInvite {
  roomName: string;
  title: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,NavigationBarComponent,MapComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit{
  user = {
    name: 'John Carter',
    role: 'Team Member',
    email: 'john.carter@example.com',
    location: 'Bucharest, Romania',
    joined: 'Oct 2025',
  };

  events: UserEvent[] = [
    {
      roomName: 'Stella Artois Room',
      title: 'Weekly sync with design',
      date: '2025-11-08',
      time: '10:00 – 11:00',
      type: 'meeting',
      description: 'Weekly touchpoint to align UI changes and asset delivery.',
    }

  ];

  pendingInvites: PendingInvite[] = [
    {
      roomName: 'Room 204',
      title: 'Design sync',
      date: '2025-11-09',
      time: '11:00 – 11:30',
    },
    {
      roomName: 'Room 105',
      title: 'Product catch-up',
      date: '2025-11-09',
      time: '14:00 – 14:30',
    },
  ];

  onEditProfile() {
    alert('Edit profile clicked');
  }

  onLogout() {
    alert('Logout clicked');
  }


  onAccept(invite: PendingInvite) {
    alert(`Accepted invite: ${invite.title}`);
    // mai târziu aici vei pune un apel API spre backend
  }

  onDecline(invite: PendingInvite) {
    alert(`Declined invite: ${invite.title}`);
    // mai târziu aici vei pune un apel API spre backend
  }
  constructor(private router:Router ,public userService: UserService){
  }

  ngOnInit(): void {
    if(!this.userService.token)
      this.router.navigate(["/login"])
    this.userService.getUsername()
    this.userService.getBookings()
  }
  logout(){
    this.userService.logout()
    this.router.navigate(["/login"])
  }



}







