import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Data, ParamMap, Router, RouterModule} from '@angular/router';
import {combineLatest, Observable, Subject, switchMap, tap} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import {EntityArrayResponseType, PostService} from "../entities/post/service/post.service";
import {IPost} from "../entities/post/post.model";
import {SortService} from "../shared/sort/sort.service";
import {ASC, DEFAULT_SORT_DATA, DESC, SORT} from "../config/navigation.constants";

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule, RouterModule],
})
export default class HomeComponent implements OnInit {

  posts : IPost[] = [];

  isLoading = false;

  predicate = 'id';
  ascending = true;


  constructor(private postService: PostService,
              private router: Router,
              protected sortService: SortService,
              protected activatedRoute: ActivatedRoute
              ) {}

  ngOnInit(): void {
     this.loadAll();
  }

  loadAll(): void {
    const queryObject: any = {
      sort: this.getSortQueryParam(this.predicate, this.ascending),
    };
    this.postService.query(queryObject).subscribe(
      res => {

        this.onResponseSuccess(res);
      }
    );

  }







  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.posts = this.refineData(dataFromBody);

  }

  protected fillComponentAttributesFromResponseBody(data: IPost[] | null): IPost[] {
    return data ?? [];
  }

  protected refineData(data: IPost[]): IPost[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }


}
