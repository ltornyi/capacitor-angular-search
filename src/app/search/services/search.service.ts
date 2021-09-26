import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Org } from '../models/org.model';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private orgsSubject = new BehaviorSubject<Org[]>([]);
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  private clearOrgs = new Observable(() => this.orgsSubject.next([]));
  private clearContacts = new Observable(() => this.contactsSubject.next([]));

  constructor(private http: HttpClient) {}

  get orgs() {
    return this.orgsSubject.asObservable();
  }

  get contacts() {
    return this.contactsSubject.asObservable();
  }

  searchOrgs(searchExpression: string) {
    if (searchExpression) {
      return this.http
        .get<Org[]>('http://localhost:4000/organizations?q=' + searchExpression)
        .pipe(
          tap(orgs => this.orgsSubject.next(orgs))
        );
    } else {
      return this.clearOrgs;
    }
  }

  searchContacts(searchExpression: string) {
    if (searchExpression) {
      return this.http
        .get<Contact[]>('http://localhost:4000/contacts?q=' + searchExpression)
        .pipe(
          tap(contacts => this.contactsSubject.next(contacts))
        );
    } else {
      return this.clearContacts;
    }
  }

}
