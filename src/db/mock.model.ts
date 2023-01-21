/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class MockModel<T> {
  protected abstract entityStub: T;             // Field Properties (DTO)

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }
  constructorSpy(_createEntityData: T): void {}

  async save(): Promise<T> {                // mocking the save() method
    return this.entityStub;
  }

   new(): T {                // mocking the save() method
    return  this.entityStub;
  }

  async findOne(): Promise<T> {             //mocking the mongoose method (save, findOne, FindOne and Delete e.t.c)
    return this.entityStub;
  }
}
