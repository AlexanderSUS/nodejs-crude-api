/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http';
import { USERS_URL } from '../src/const/minor';
import { CODE_400, CODE_404 } from '../src/const/statusCodes';
import { NewUser } from '../src/types/user';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const newUserData: NewUser = {
  username: 'Pablo',
  age: 51,
  hobbies: ['fishing', 'hunting'],
};

const invalidNewUserData = {
  user: 'Pablo',
  age: 51,
  hobbies: ['fishing', 'hunting'],
};

const data = JSON.stringify(newUserData);
const dataContentLength = data.length;

const getGetRequestConfig = (path: string) => ({
  hostname: 'localhost',
  port: process.env.PORT || 5000,
  path,
  agent: false,
});

const getRequestConfig = (method: Method, path: string, contentLength: number) => ({
  hostname: 'localhost',
  port: process.env.PORT || 5000,
  path,
  method,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': contentLength,
  },
});

const nonExistentEndpoint = '/some-non/existing/resource';

describe('POST method work properly', () => {
  test('POST api/users should return newly created user', () => {
    const req = http.request(getRequestConfig('POST', USERS_URL, dataContentLength), async (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk.toString();
      });

      res.on('end', () => {
        expect(Object.keys(JSON.parse(responseData)).length).toBe(4);
      });
    });

    req.write(data);
    req.end();
  });

  test('POST api/users with wrong data should return 400 staus code', () => {
    const invalidData = JSON.stringify(invalidNewUserData);
    const invaliDataContentLeng = invalidData.length;

    const req = http.request(getRequestConfig('POST', USERS_URL, invaliDataContentLeng), (res) => {
      res.on('end', () => {
        expect(res.statusCode).toBe(CODE_400);
      });
    });

    req.write(invalidData);
    req.end();
  });

  test('POST some-non/existing/resource should return 404 status code', () => {
    const req = http.request(getRequestConfig('POST', nonExistentEndpoint, dataContentLength), (res) => {
      res.on('end', () => {
        expect(res.statusCode).toBe(CODE_404);
      });
    });

    req.write(data);
    req.end();
  });
});

describe('GET method work properly', () => {
  test('GET api/users should return all users', () => {
    http.get(getGetRequestConfig(USERS_URL), (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk.toString();
      });
      res.on('end', () => {
        const expectedUserArray = JSON.parse(body);

        expect(expectedUserArray.length).toBe(1);
      });
    });
  });

  test('GET some-non/existing/resource should return 404 status code', () => {
    http.get(getGetRequestConfig(nonExistentEndpoint), (res) => {
      expect(res.statusCode).toBe(CODE_404);
    });
  });

  test('GET api/users/userId should return users with this id', () => {
    const req = http.request(getRequestConfig('POST', USERS_URL, dataContentLength), (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk.toString();
      });

      res.on('end', () => {
        const userId = JSON.parse(responseData).id;

        http.get(getGetRequestConfig(`${USERS_URL}/${userId}`), (response) => {
          let body = '';

          response.on('data', (chunk) => {
            body += chunk.toString();
          });

          response.on('end', () => {
            const expectedId = JSON.parse(body).id;
            expect(expectedId).toMatch(new RegExp(userId));
          });
        });
      });
    });

    req.write(data);
    req.end();
  });
});
