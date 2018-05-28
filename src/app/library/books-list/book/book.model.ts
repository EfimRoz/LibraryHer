
export class Book {
  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  private _author: string;
  private _date: Date;
  private _title: string;

  constructor(author: string, date: Date, title: string) {
    this._author = author;
    this._date = date;
    this._title = title;
  }
}
