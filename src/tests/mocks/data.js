export const tripRequestResponse = [
  {
    id: 3,
    status: 'pending',
    travel_reason: 'Tour destination',
    accommodationId: 1,
    dateOfDeparture: '2022-09-17',
    dateOfReturn: null,
    tripType: 'oneway',
    manager: {
      id: 'f683cce1-a43a-41aa-8fd4-f3cb68e5d866',
      firstName: 'manager one',
      lastName: 'Doe',
      email: 'manager2@gmail.com',
    },
    owner: {
      id: 'babd475d-a21f-4a65-bc92-fe13489ce4ff',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@seed.com',
    },
    departure: {
      id: 1,
      city: 'Kigali City',
      state: null,
      province: 'kigali',
      country: 'Rwanda',
    },
    destinations: [
      {
        id: 2,
        city: 'Nairobi City',
        province: 'Nairobi',
        state: null,
        country: 'Kenya',
        createdAt: '2022-08-03T19:40:37.319Z',
        updatedAt: '2022-08-03T19:40:37.319Z',
        TripRequestDestination: {
          destinationId: 2,
          tripId: 3,
          createdAt: '2022-08-04T00:10:38.928Z',
          updatedAt: '2022-08-04T00:10:38.928Z',
        },
      },
    ],
  },
  {
    id: 4,
    status: 'approved',
    travel_reason: 'Tour destination',
    accommodationId: 1,
    dateOfDeparture: '2022-09-17',
    dateOfReturn: null,
    tripType: 'oneway',
    manager: {
      id: 'f683cce1-a43a-41aa-8fd4-f3cb68e5d866',
      firstName: 'manager one',
      lastName: 'Doe',
      email: 'manager2@gmail.com',
    },
    owner: {
      id: 'babd475d-a21f-4a65-bc92-fe13489ce4ff',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@seed.com',
    },
    departure: {
      id: 1,
      city: 'Kigali City',
      state: null,
      province: 'kigali',
      country: 'Rwanda',
    },
    destinations: [
      {
        id: 2,
        city: 'Nairobi City',
        province: 'Nairobi',
        state: null,
        country: 'Kenya',
        createdAt: '2022-08-03T19:40:37.319Z',
        updatedAt: '2022-08-03T19:40:37.319Z',
        TripRequestDestination: {
          destinationId: 2,
          tripId: 4,
          createdAt: '2022-08-04T00:10:52.906Z',
          updatedAt: '2022-08-04T00:10:52.906Z',
        },
      },
    ],
  },
  {
    id: 5,
    status: 'Rejected',
    travel_reason: 'Tour destination',
    accommodationId: 1,
    dateOfDeparture: '2022-09-17',
    dateOfReturn: null,
    tripType: 'oneway',
    manager: {
      id: 'f683cce1-a43a-41aa-8fd4-f3cb68e5d866',
      firstName: 'manager one',
      lastName: 'Doe',
      email: 'manager2@gmail.com',
    },
    owner: {
      id: 'babd475d-a21f-4a65-bc92-fe13489ce4ff',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@seed.com',
    },
    departure: {
      id: 1,
      city: 'Kigali City',
      state: null,
      province: 'kigali',
      country: 'Rwanda',
    },
    destinations: [
      {
        id: 2,
        city: 'Nairobi City',
        province: 'Nairobi',
        state: null,
        country: 'Kenya',
        createdAt: '2022-08-03T19:40:37.319Z',
        updatedAt: '2022-08-03T19:40:37.319Z',
        TripRequestDestination: {
          destinationId: 2,
          tripId: 5,
          createdAt: '2022-08-04T01:25:31.934Z',
          updatedAt: '2022-08-04T01:25:31.934Z',
        },
      },
    ],
  },
];
export const userResponse = {
  success: true,
  status: 200,
  message: 'Successfully retrieved user details',
  user: {
    id: 'f683cce1-a43a-41aa-8fd4-f3cb68e5d866',
    firstName: 'manager one',
    lastName: 'Doe',
    email: 'manager2@gmail.com',
    isVerified: true,
    user_role: '6927442b-84fb-4fc3-b799-11449fa62f52',
    managerId: null,
    remember_info: false,
    username: 'Username',
    phoneNumber: '0788888888',
    image:
      'http://res.cloudinary.com/atlp8winners/image/upload/v1660321216/winners-c8-bn-be/uwiwxk8gw4y94dtsdmq9.jpg',
    gender: 'Male',
    preferredLanguage: 'English',
    preferredCurrency: 'null',
    department: 'null',
    googleId: null,
    facebookId: null,
    allowedNotificationMethod: 'both',
    createdAt: '2022-08-03T19:40:37.541Z',
    updatedAt: '2022-08-12T16:20:17.317Z',
  },
};
