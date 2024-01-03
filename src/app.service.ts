import { Injectable } from '@nestjs/common';
import { BookDTO } from './dto/book.dto';

const bookStore: BookDTO[] = [];

@Injectable()
export class AppService {
  getBookById(bookID: string) {
    return bookStore.find((book) => book.id === bookID);
  }

  getAllBooks() {
    return bookStore;
  }

  newBook(dto: BookDTO) {
    const exists = bookStore.find(
      (book) =>
        book.title == dto.title &&
        book.author === dto.author &&
        book.releaseDate === dto.releaseDate,
    );

    if (exists) return false;

    const newBook = {
      ...dto,
      id: `book__${bookStore.length + 1}`,
    };

    bookStore.push(newBook);
    return newBook.id;
  }
}
