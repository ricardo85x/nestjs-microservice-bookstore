import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { BookDTO } from './dto/book.dto';
import { delay } from './util/book.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'new_book' })
  newBook(book: BookDTO): string {
    delay(1000);
    const result = this.appService.newBook(book);
    if (!result) {
      return 'Book already exists';
    } else {
      return result;
    }
  }

  @MessagePattern({ cmd: 'get_book' })
  getBook(bookId: string): BookDTO {
    return this.appService.getBookById(bookId);
  }

  @MessagePattern({ cmd: 'get_books' })
  getBooks(): BookDTO[] {
    return this.appService.getAllBooks();
  }
}
