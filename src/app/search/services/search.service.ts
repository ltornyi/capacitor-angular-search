import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { BehaviorSubject, defer, Observable } from 'rxjs';
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

  get orgs() {
    return this.orgsSubject.asObservable();
  }

  get contacts() {
    return this.contactsSubject.asObservable();
  }

  searchOrgs(searchExpression: string) {
    if (searchExpression) {
      const options = {
        url: 'http://localhost:4000/organizations',
        params: { q: searchExpression },
      }
      //Want to turn into a cold observable:
      const obs = defer(() => Http.get(options));
      return obs.pipe(
        tap(orgs =>  this.orgsSubject.next(orgs.data))
      )
    } else {
      return this.clearOrgs;
    }
  }

  searchContacts(searchExpression: string) {
    if (searchExpression) {
      const options = {
        url: 'http://localhost:4000/contacts',
        params: { q: searchExpression },
      }
      const obs = defer(() => Http.get(options));
      return obs.pipe(
        tap(orgs =>  this.contactsSubject.next(orgs.data))
      )
    } else {
      return this.clearContacts;
    }
  }

}
