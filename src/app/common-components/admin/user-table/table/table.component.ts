import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../interfaces/admin/user';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Output() openUpdateModal: EventEmitter<User> = new EventEmitter<User>();
  @Output() openUpdatePasswordModal: EventEmitter<User> =
    new EventEmitter<User>();
  @Output() openDeleteModal: EventEmitter<User> = new EventEmitter<User>();
  @Input() userList: User[] = [];

  public emitOpenUpdateModal(user: User): void {
    this.openUpdateModal.emit(user);
  }

  public emitOpenDeleteModal(user: User): void {
    this.openDeleteModal.emit(user);
  }

  public emitOpenUpdatePasswordModal(user: User): void {
    this.openUpdatePasswordModal.emit(user);
  }
}
