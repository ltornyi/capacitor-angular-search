import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Toast } from '@capacitor/toast';

import { Contact } from '../models/contact.model';
import { Org } from '../models/org.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  orgs$: Observable<Org[]>;
  contacts$: Observable<Contact[]>;
  searchUpdate = new Subject<string>();

  public searchInputValue = '';

  constructor(private searchService: SearchService) {
    this.orgs$ = this.searchService.orgs;
    this.contacts$ = this.searchService.contacts;
  }

  ngOnInit(): void {
    this.handleSearchUpdate();
  }

  handleSearchUpdate() {
    this.searchUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.onSearchChanged(value);
      });
  }

  onSearchChanged(searchExpression: string) {
    this.searchService.searchOrgs(searchExpression).subscribe();
    this.searchService.searchContacts(searchExpression).subscribe();
  }

  async onDeleteClick() {
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload',
        },
        {
          title: 'Share',
        },
        {
          title: 'Remove',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });

    console.log('Action Sheet result:', result);
  }

  async showToast() {
    await Toast.show({
      text: 'This is a toast',
      duration: 'short',
      position: 'top'
    });
  }

}
