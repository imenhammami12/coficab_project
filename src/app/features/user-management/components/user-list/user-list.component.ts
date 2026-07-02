import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserEditComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  users = this.userService.getUsers();

  selectedUser: User | null = null;

  ngOnInit() {
    this.userService.loadUsers();
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe();
  }

  onEdit(user: User) {
    this.selectedUser = user;
  }

  onCloseEdit() {
    this.selectedUser = null;
  }
}
