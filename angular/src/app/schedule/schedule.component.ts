import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MapComponent } from '../map/map.component';
import { UserService } from '../user.service';
interface Person {
  id: number;
  name: string;
  email?: string;
}

interface TimeBlock {
  date: string;    // YYYY-MM-DD
  slots: string[]; // e.g. '09:00 - 09:30'
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationBarComponent,MapComponent],

  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class SchedulingComponent implements OnInit {
  /* model */
  userService:UserService;

  booking = { title: '', type: '', participants: [] as Person[], time: '' };
  selectedSeats:number[] = []
  /* ui toggles */
  showTypeDropdown = false;
  showParticipantsDropdown = false;
  showTimeDropdown = false;

  /* meeting types & seats */
  meetingTypes = ['Stand-up', '1:1', 'Presentation', 'Workshop', 'Planning'];
  seats:number[]= [];

  /* people (mock) */
  people: Person[] = [];

  /* filters */
  availableQuery = '';
  addedQuery = '';
  filteredAvailable: Person[] = [];
  filteredAdded: Person[] = [];

  /* time blocks (mock) */
  timeBlocks: TimeBlock[] = [];

  /* date/slots */
  selectedDate = '';
  availableDates: string[] = [];
  availableSlots: string[] = [];

  /* popup placement state */
  participantsDirection: 'above' | 'below' = 'above';
  timeDirection: 'above' | 'below' = 'above';

  /* ViewChild refs for measuring */
  @ViewChild('participantsTrigger', { read: ElementRef }) participantsTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('participantsPopup', { read: ElementRef }) participantsPopup?: ElementRef<HTMLDivElement>;

  @ViewChild('timeTrigger', { read: ElementRef }) timeTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('timePopup', { read: ElementRef }) timePopup?: ElementRef<HTMLDivElement>;

  constructor(u:UserService) {
      this.userService = u
  }

  ngOnInit(): void {
    // mock people
    this.people = [
      { id: 1, name: 'Alice Anderson', email: 'alice@example.com' },
      { id: 2, name: 'Bob Brown', email: 'bob@example.com' },
      { id: 3, name: 'Carol Clark', email: 'carol@example.com' },
      { id: 4, name: 'Dave Davis', email: 'dave@example.com' },
      { id: 5, name: 'Eve Evans', email: 'eve@example.com' },
      { id: 6, name: 'Frank Foster', email: 'frank@example.com' }
    ];

    // mock time blocks: today + next 3 days
    const today = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const plus = (n: number) => {
      const d = new Date();
      d.setDate(today.getDate() + n);
      return iso(d);
    };

    this.timeBlocks = [
      { date: iso(today), slots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '14:30 - 15:00'] },

      { date: plus(1), slots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '14:30 - 15:00'] },
      { date: plus(2), slots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '14:30 - 15:00'] },
      { date: plus(3), slots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '14:30 - 15:00'] },
      { date: plus(4), slots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '14:30 - 15:00'] },
      { date: plus(5), slots: ['09:00 - 09:30', '10:00 - 10:30', '14:00 - 14:30', '14:30 - 15:00'] },
    ];

    this.availableDates = this.timeBlocks.map(t => t.date);
    this.selectedDate = this.availableDates.length ? this.availableDates[0] : '';
    this.updateAvailableSlots();

    // init participant lists
    this.resetParticipantsSearch();
  }

  /* ---------- Popup placement helpers ---------- */
  private computePlacement(triggerEl: ElementRef | undefined, popupEl: ElementRef | undefined, prefer: 'above' | 'below' = 'above'): 'above' | 'below' {
    if (!triggerEl || !popupEl) return prefer;
    const triggerRect = triggerEl.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    // measure popup natural height by temporarily removing max-height
    const popupNative = popupEl.nativeElement as HTMLElement;
    // force measurement
    const prevMax = popupNative.style.maxHeight;
    popupNative.style.maxHeight = '';
    const popupHeight = popupNative.offsetHeight;
    // restore
    popupNative.style.maxHeight = prevMax || '';

    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;

    if (spaceAbove >= popupHeight + 12) return 'above';
    if (spaceBelow >= popupHeight + 12) return 'below';

    // neither fits fully: choose the larger space
    return spaceBelow >= spaceAbove ? 'below' : 'above';
  }

  private applyPopupMaxHeight(popupEl: ElementRef | undefined, direction: 'above' | 'below') {
    if (!popupEl || !this.participantsTrigger) return;
    const popupNative = popupEl.nativeElement as HTMLElement;
    const triggerRect = (this.participantsTrigger || this.timeTrigger)?.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const space = direction === 'above' ? triggerRect.top : (viewportHeight - triggerRect.bottom);
    const margin = 20; // spare space
    const maxH = Math.max(80, space - margin); // don't go too small
    popupNative.style.maxHeight = `${maxH}px`;
    popupNative.style.overflow = 'auto';
  }

  @HostListener('window:resize')
  onWindowResize() {
    // reposition open popups on resize
    if (this.showParticipantsDropdown) {
      setTimeout(() => this.positionParticipantsPopup(), 0);
    }
    if (this.showTimeDropdown) {
      setTimeout(() => this.positionTimePopup(), 0);
    }
  }

  private positionParticipantsPopup() {
    if (!this.participantsTrigger || !this.participantsPopup) return;
    const dir = this.computePlacement(this.participantsTrigger, this.participantsPopup, 'above');
    this.participantsDirection = dir;
    // apply max height to avoid overflow beyond viewport
    const popupNative = this.participantsPopup.nativeElement as HTMLElement;
    const triggerRect = this.participantsTrigger.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const space = dir === 'above' ? triggerRect.top : (viewportHeight - triggerRect.bottom);
    const margin = 20;
    const maxH = Math.max(80, space - margin);
    popupNative.style.maxHeight = `${maxH}px`;
    popupNative.style.overflow = 'auto';
  }

  private positionTimePopup() {
    if (!this.timeTrigger || !this.timePopup) return;
    const dir = this.computePlacement(this.timeTrigger, this.timePopup, 'above');
    this.timeDirection = dir;
    // apply max height
    const popupNative = this.timePopup.nativeElement as HTMLElement;
    const triggerRect = this.timeTrigger.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const space = dir === 'above' ? triggerRect.top : (viewportHeight - triggerRect.bottom);
    const margin = 20;
    const maxH = Math.max(80, space - margin);
    popupNative.style.maxHeight = `${maxH}px`;
    popupNative.style.overflow = 'auto';
  }

  /* ---------- Meeting type ---------- */
  toggleTypeDropdown() {
    this.showTypeDropdown = !this.showTypeDropdown;
    if (this.showTypeDropdown) {
      this.showParticipantsDropdown = false;
      this.showTimeDropdown = false;
    }
  }

  selectType(t: string) {
    this.booking.type = t;
    this.showTypeDropdown = false;
  }

  /* ---------- Participants ---------- */
  toggleParticipantsDropdown() {
    this.showParticipantsDropdown = !this.showParticipantsDropdown;
    if (this.showParticipantsDropdown) {
      this.showTimeDropdown = false;
      this.showTypeDropdown = false;
      this.resetParticipantsSearch();
      // wait for DOM to render, then position
      setTimeout(() => this.positionParticipantsPopup(), 0);
    } else {
      // cleanup inline styles (so next open measures naturally)
      if (this.participantsPopup && this.participantsPopup.nativeElement) {
        this.participantsPopup.nativeElement.style.maxHeight = '';
      }
    }
  }

  resetParticipantsSearch() {
    this.availableQuery = '';
    this.addedQuery = '';
    this.filteredAvailable = this.getAvailablePeople();
    this.filteredAdded = [...this.booking.participants];
  }

  getAvailablePeople(): Person[] {
    const added = new Set(this.booking.participants.map(p => p.id));
    return this.people.filter(p => !added.has(p.id));
  }

  filterAvailable() {
    const q = (this.availableQuery || '').trim().toLowerCase();
    this.filteredAvailable = this.getAvailablePeople().filter(p =>
      p.name.toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q)
    );
  }

  filterAdded() {
    const q = (this.addedQuery || '').trim().toLowerCase();
    this.filteredAdded = this.booking.participants.filter(p =>
      p.name.toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q)
    );
  }

  addParticipant(p: Person) {
    if (this.booking.participants.find(x => x.id === p.id)) return;
    this.booking.participants = [...this.booking.participants, p];
    this.resetParticipantsSearch();
    // keep popup placement updated as list changes
    setTimeout(() => this.positionParticipantsPopup(), 0);
  }

  removeParticipant(p: Person) {
    this.booking.participants = this.booking.participants.filter(x => x.id !== p.id);
    this.resetParticipantsSearch();
    setTimeout(() => this.positionParticipantsPopup(), 0);
  }

  closeParticipants() {
    this.showParticipantsDropdown = false;
    if (this.participantsPopup && this.participantsPopup.nativeElement) {
      this.participantsPopup.nativeElement.style.maxHeight = '';
    }
  }

  /* ---------- Time ---------- */
  toggleTimeDropdown() {
    this.showTimeDropdown = !this.showTimeDropdown;
    if (this.showTimeDropdown) {
      this.showParticipantsDropdown = false;
      this.showTypeDropdown = false;
      this.updateAvailableSlots();
      setTimeout(() => this.positionTimePopup(), 0);
    } else {
      if (this.timePopup && this.timePopup.nativeElement) {
        this.timePopup.nativeElement.style.maxHeight = '';
      }
    }
  }

  onDateChange() {
    this.updateAvailableSlots();
    setTimeout(() => this.positionTimePopup(), 0);
  }

  selectDateFromList(d: string) {
    this.selectedDate = d;
    this.updateAvailableSlots();
    console.log(this.selectedDate)
    setTimeout(() => this.positionTimePopup(), 0);
  }

  updateAvailableSlots() {
    const found = this.timeBlocks.find(tb => tb.date === this.selectedDate);
    this.availableSlots = found ? [...found.slots] : [];
  }

  selectTime(date: string, slot: string) {
    this.booking.time = `${date} ${slot}`;
    this.showTimeDropdown = false;
    console.log(this.booking.time)
    this.startTime=this.parseDateInterval(this.booking.time).startTime
this.endTime = this.parseDateInterval(this.booking.time).endTime
  }
  startTime:string = ""
  endTime:string =""
parseDateInterval(input: string): { startTime: string; endTime: string } {
  // Split into date and the rest
  const firstSpaceIndex = input.indexOf(' ');
  const datePart = input.slice(0, firstSpaceIndex);
  const timePart = input.slice(firstSpaceIndex + 1); // "09:00 - 09:30"

  // Split start and end times
  const [startTimeRaw, endTimeRaw] = timePart.split(' - ');

  // Construct ISO strings
  const startTime = `${datePart}T${startTimeRaw}:00`;
  const endTime = `${datePart}T${endTimeRaw}:00`;

  return { startTime, endTime };
}  closeTime() {
    this.showTimeDropdown = false;
    if (this.timePopup && this.timePopup.nativeElement) {
      this.timePopup.nativeElement.style.maxHeight = '';
    }
  }

  resetDateSelection() {
    this.selectedDate = this.availableDates.length ? this.availableDates[0] : '';
    this.updateAvailableSlots();
    setTimeout(() => this.positionTimePopup(), 0);
  }

  /* ---------- Seats interactivity ---------- */
  toggleSeat(seat: string) {
    if (this.booking.title.split(/\s+/).includes(seat)) {
      this.booking.title = this.booking.title.replace(new RegExp(`\\b${seat}\\b`, 'g'), '').trim();
    } else {
      this.booking.title = (this.booking.title + ' ' + seat).trim();
    }
  }

  seatIsSelected(seat: string) {
    return this.booking.title.split(/\s+/).includes(seat);
  }

  /* ---------- Misc ---------- */
  createBooking() {
    console.log('Booking created:', this.booking);
    this.book()
  }

  resetForm() {
    this.booking = { title: '', type: '', participants: [], time: '' };
    this.resetParticipantsSearch();
    this.resetDateSelection();
  }

  closeAllDropdowns() {
    this.showTypeDropdown = false;
    this.showParticipantsDropdown = false;
    this.showTimeDropdown = false;
  }



  book():void{
    if(this.userService.username)
    this.userService.bookObject(this.seats, this.userService.username, this.startTime,this.endTime).subscribe({
      next: (res) => console.log('Booking successful', res),
      error: (err) => console.error('Booking failed', err)
    });
  }

}
