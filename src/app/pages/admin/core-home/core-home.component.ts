import { Component } from '@angular/core';
import { TableSelectionComponent } from '../../../common-components/admin/table-selection/table-selection.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoTableComponent } from '../../../common-components/admin/video-table/video-table.component';
import { UserTableComponent } from '../../../common-components/admin/user-table/user-table.component';
import { ChannelTableComponent } from '../../../common-components/admin/channel-table/channel-table.component';
import { AdminInfoComponent } from '../../../common-components/admin/admin-info/admin-info.component';

@Component({
  selector: 'app-core-home',
  standalone: true,
  imports: [
    CommonModule,
    TableSelectionComponent,
    VideoTableComponent,
    UserTableComponent,
    ChannelTableComponent,
    AdminInfoComponent,
  ],
  templateUrl: './core-home.component.html',
  styleUrl: './core-home.component.scss',
})
export class CoreHomeComponent {
  selectedTable: string | null = null;
  tableList: string[] = ['info', 'videos', 'users', 'channels'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.selectedTable = queryParams['table'];
    });
  }

  public changeTable(table: string): void {
    this.router.navigate(['/admin/core'], {
      queryParams: { table: table },
    });
  }
}
