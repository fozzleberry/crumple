import faker from "faker";
import { Types } from "mongoose";

export const fakeId = Types.ObjectId();
export const fakeProjection = "name address";
export const fakeOptions = { skip: 1 };
export const fakeUpdateValue = {
  firstName: faker.name.firstName()
};

export function getFakeDoc() {
  const fakeDoc = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  };

  return fakeDoc;
}

export const fakeInvalidDoc = {
  lastName: faker.name.lastName()
};

export const fakeDoc = getFakeDoc();

export const fakeRes = {
  req: {
    originalUrl: "url"
  },
  params: {
    id: "someObjectId"
  },
  location: jest.fn(),
  json: jest.fn()
};

export const fakeErrorDoc = {
  firstName: faker.name.firstName(),
  lastName: "smith"
};
