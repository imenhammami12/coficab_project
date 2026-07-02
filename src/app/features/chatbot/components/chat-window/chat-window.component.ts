import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  chatbotService = inject(ChatbotService);
  question = signal('');

  onSend() {
    const q = this.question().trim();
    if (!q || this.chatbotService.isLoading()) return;

    this.chatbotService.askQuestion(q);
    this.question.set('');
  }
}
