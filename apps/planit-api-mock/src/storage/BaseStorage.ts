export abstract class BaseStorage<T extends { id: string }> {
  private _data: T[] = [];

  private _setData(data: T[]): void {
    this._data = data;
  }

  clean(): void {
    this._setData([]);
  }

  get(): T[] {
    return this._data;
  }

  getById(id: string): T | undefined {
    return this._data.find((item) => item.id === id);
  }

  add(data: T): void {
    this._data.push(data);
  }
}
