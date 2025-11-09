/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

interface AdminEvent {
  roomName: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'conference' | 'recreation';
  description: string;
}

interface SpecialEventRequest {
  requester: string;
  title: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  admin = {
    name: 'Admin Carter',
    role: 'Workspace Administrator',
    email: 'admin@example.com',
    location: 'Bucharest, Romania',
    joined: 'Sep 2024',
  };

  // ce aproba adminul
  specialEventRequests: SpecialEventRequest[] = [
    {
      requester: 'Marketing Team',
      title: 'Brand activation showcase',
      date: '2025-11-12',
      time: '10:00 – 12:00',
    },
    {
      requester: 'HR Department',
      title: 'Wellbeing Friday extended',
      date: '2025-11-13',
      time: '15:00 – 17:00',
    },
  ];

  // toate evenimentele (câteva viitoare, câteva trecute)
  allEvents: AdminEvent[] = [
    {
      roomName: 'Stella Artois Room',
      title: 'Weekly sync with design',
      date: '2025-11-09',
      time: '18:00 – 19:00',
      type: 'meeting',
      description: 'Weekly touchpoint to align UI changes and asset delivery.',
    },
    {
      roomName: 'Miller Training Hall',
      title: 'Product launch briefing',
      date: '2025-11-10',
      time: '14:00 – 15:30',
      type: 'conference',
      description: 'Overview of launch timeline, stakeholders and comms plan.',
    },
    {
      roomName: 'Beer Point',
      title: 'Wellbeing break',
      date: '2025-11-04',
      time: '12:30 – 13:00',
      type: 'recreation',
      description: 'Relax zone booking for short break & team bonding.',
    },
    {
      roomName: 'Leffe Bubble',
      title: '1:1 with manager',
      date: '2025-11-02',
      time: '09:30 – 10:00',
      type: 'meeting',
      description: 'Progress review, blockers, next sprint focus.',
    },
    {
      roomName: 'Conference Hall A',
      title: 'Quarterly budget review',
      date: '2025-11-17',              // prima zi din next week
      time: '11:00 – 12:30',
      type: 'meeting',
      description: 'Finance + ops alignment for Q4 numbers.',
    },
    {
      roomName: 'Innovation Lab',
      title: 'New product ideation',
      date: '2025-11-18',              // tot în next week
      time: '15:00 – 17:00',
      type: 'conference',
      description: 'Cross-team brainstorming for 2026 initiatives.',
    },

  ];

  // link generat
  generatedLink = '';

  // filtru custom
  filterOptions = ['This week', 'Next week', 'All'];
  selectedFilter = 'This week';
  isFilterOpen = false;

  // ca să-ți pice cu datele de sus
  private today = new Date('2025-11-08');

  onEditProfile() {
    alert('Edit admin profile clicked');
  }

  onLogout() {
    alert('Admin logout clicked');
  }

  approveRequest(req: SpecialEventRequest) {
    alert(`Approved: ${req.title}`);
  }

  declineRequest(req: SpecialEventRequest) {
    alert(`Declined: ${req.title}`);
  }

  onGenerateLink() {
    const token = Math.random().toString(36).substring(2, 8);
    this.generatedLink = `https://office.example.com/invite/${token}`;
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onFilterChange(value: string) {
    this.selectedFilter = value;
    this.isFilterOpen = false;
  }

  // viitoare
  get upcomingEvents(): AdminEvent[] {
    const future = this.allEvents.filter((ev) => new Date(ev.date) >= this.today);

    if (this.selectedFilter === 'All') return future;

    if (this.selectedFilter === 'This week') {
      const end = new Date(this.today);
      end.setDate(this.today.getDate() + 7);
      return future.filter((ev) => {
        const d = new Date(ev.date);
        return d >= this.today && d <= end;
      });
    }

    if (this.selectedFilter === 'Next week') {
      const start = new Date(this.today);
      start.setDate(this.today.getDate() + 7);
      const end = new Date(this.today);
      end.setDate(this.today.getDate() + 14);
      return future.filter((ev) => {
        const d = new Date(ev.date);
        return d >= start && d <= end;
      });
    }

    return future;
  }

  // trecute
  get pastEvents(): AdminEvent[] {
    return this.allEvents
      .filter((ev) => new Date(ev.date) < this.today)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}


