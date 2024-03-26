import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableSelectionComponent } from '../../../common-components/admin/table-selection/table-selection.component';
import { CommonModule } from '@angular/common';
import { VideoTableComponent } from '../../../common-components/admin/video-table/video-table.component';
import { UserTableComponent } from '../../../common-components/admin/user-table/user-table.component';
import { AdminInfoComponent } from '../../../common-components/admin/admin-info/admin-info.component';

@Component({
  selector: 'app-feed-home',
  standalone: true,
  imports: [
    CommonModule,
    TableSelectionComponent,
    VideoTableComponent,
    UserTableComponent,
    AdminInfoComponent,
  ],
  templateUrl: './feed-home.component.html',
  styleUrl: './feed-home.component.scss',
})
export class FeedHomeComponent implements OnInit {
  selectedTable: string | null = null;
  tableList: string[] = ['info', 'videos', 'users'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.selectedTable = queryParams['table'];
    });
  }

  public changeTable(table: string): void {
    this.router.navigate(['/admin/feed'], {
      queryParams: { table: table },
    });
  }
}
