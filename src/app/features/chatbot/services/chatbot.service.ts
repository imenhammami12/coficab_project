import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/chat-message.model';

const API_URL = 'http://localhost:8000/chatbot';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private http = inject(HttpClient);

  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  askQuestion(question: string) {
    this.messages.update(list => [...list, { role: 'user', text: question }]);
    this.isLoading.set(true);

    this.http.post<{ answer: string; sources: string[] }>(`${API_URL}/ask`, { question }).subscribe({
      next: (res) => {
        this.messages.update(list => [...list, { role: 'bot', text: res.answer, sources: res.sources }]);
        this.isLoading.set(false);
      },
      error: () => {
        this.messages.update(list => [...list, { role: 'bot', text: "Désolé, une erreur s'est produite. Réessaie dans un instant." }]);
        this.isLoading.set(false);
      }
    });
  }
}
