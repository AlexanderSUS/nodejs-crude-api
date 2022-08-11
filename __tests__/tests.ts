/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import http from 'http';
import { DEFAULT_PORT, USERS_URL } from '../src/const/minor';
import { CODE_204, CODE_400, CODE_404 } from '../src/const/statusCodes';
import { NewUser } from '../src/types/user';
import 'dotenv/config';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const PORT = process.env.PORT || DEFAULT_PORT;

const newUserData: NewUser = {
  username: 'Pablo',
  age: 51,
  hobbies: ['fishing', 'hunting'],
};

const updateUserData: NewUser = {
  username: 'Jovano',
  age: 42,
  hobbies: ['hiking, swiming, bouling'],
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
  port: PORT,
  path,
  agent: false,
});

const getRequestConfig = (method: Method, path: string, contentLength: number) => ({
  hostname: 'localhost',
  port: PORT,
  path,
  method,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': contentLength,
  },
});

const getDeleteRequestConfig = (id: string) => ({
  hostname: 'localhost',
  port: PORT,
  path: `${USERS_URL}/${id}`,
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
});

const nonExistentEndpoint = '/some-non/existing/resource';

const nonExistentId = '84df97c5-2ce2-4a31-aeb3-e3121a90fc8c';

const invalidId = 'invalid-id';

describe('POST method work properly', () => {
  test('POST api/users should return newly created user', () => {
    const req = http.request(getRequestConfig('POST', USERS_URL, dataContentLength), (res) => {
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

  test('POST api/users with invalid object keys should return 400 staus code', () => {
    const invalidData = JSON.stringify(invalidNewUserData);
    const invaliDataContentLength = invalidData.length;

    const req = http.request(getRequestConfig('POST', USERS_URL, invaliDataContentLength), (res) => {
      expect(res.statusCode).toBe(CODE_400);
    });

    req.write(invalidData);
    req.end();
  });

  test('POST some-non/existing/resource should return 404 status code', () => {
    const req = http.request(getRequestConfig('POST', nonExistentEndpoint, dataContentLength), async (res) => {
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

        expect(expectedUserArray.length).toBeGreaterThan(0);
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

  test('GET api/users/userId should return status code 404 if user does not exist', () => {
    http.get(getGetRequestConfig(`http://localhost:${PORT}/${USERS_URL}/${nonExistentId}`), (res) => {
      expect(res.statusCode).toBe(CODE_404);
    });
  });
});

describe('PUT method work properly', () => {
  test('PUT api/users/userId should return updated user', () => {
    // Create new user and get userId form response
    const req = http.request(getRequestConfig('POST', USERS_URL, dataContentLength), (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk.toString();
      });

      res.on('end', () => {
        const { id } = JSON.parse(responseData);

        const userData = JSON.stringify(updateUserData);
        const updateDataContentLength = userData.length;

        // Send PUT requset with userId
        const putRequest = http.request(getRequestConfig('PUT', `${USERS_URL}/${id}`, updateDataContentLength), (putResponse) => {
          // Clear old data
          responseData = '';

          putResponse.on('data', (chunk) => {
            responseData += chunk.toString();
          });

          putResponse.on('end', () => {
            const updatedUser = JSON.parse(responseData);
            expect(updatedUser).toEqual({ id, ...updateUserData });
          });
        });

        putRequest.write(userData);
        putRequest.end();
      });
    });

    req.write(data);
    req.end();
  });

  test('PUT api/users/id with invalid key in object should return 400 staus code', () => {
    // Create new user and get userId form response
    const req = http.request(getRequestConfig('POST', USERS_URL, dataContentLength), (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk.toString();
      });

      res.on('end', () => {
        const { id } = JSON.parse(responseData);

        const invalidData = JSON.stringify(invalidNewUserData);
        const invaliDataContentLeng = invalidData.length;

        // Send PUT requset with userId
        const putRequest = http.request(getRequestConfig('PUT', `${USERS_URL}/${id}`, invaliDataContentLeng), (putResponse) => {
          expect(putResponse.statusCode).toBe(CODE_400);
        });

        putRequest.write(invalidData);
        putRequest.end();
      });
    });

    req.write(data);
    req.end();
  });

  test('PUT api/users/non-existent-id should return 404 status code', () => {
    const userData = JSON.stringify(updateUserData);
    const updateDataContentLength = userData.length;

    // Send PUT requset with userId
    const putRequest = http.request(getRequestConfig('PUT', `${USERS_URL}/${nonExistentId}`, updateDataContentLength), (putResponse) => {
      expect(putResponse.statusCode).toBe(CODE_404);
    });

    putRequest.write(userData);
    putRequest.end();
  });
});

describe('DELETE method work properly', () => {
  test('DELETE api/users/userId should delete existent user from database and return 204 status code', () => {
    // Create new user and get userId form response
    const req = http.request(getRequestConfig('POST', USERS_URL, dataContentLength), (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk.toString();
      });

      res.on('end', () => {
        const { id } = JSON.parse(responseData);

        // Send DELTE requset with userId
        const deleteRequest = http.request(getDeleteRequestConfig(id), (deleteResponse) => {
          expect(deleteResponse.statusCode).toBe(CODE_204);
        });

        deleteRequest.end();
      });
    });

    req.write(data);
    req.end();
  });

  test('DELETE api/users/id with invalid id should return 400 staus code', () => {
    const deleteRequest = http.request(getDeleteRequestConfig(invalidId), (deleteResponse) => {
      expect(deleteResponse.statusCode).toBe(CODE_400);
    });

    deleteRequest.end();
  });

  test('DELETE api/users/non-existent-id should return 404 status code', () => {
    const deleteRequest = http.request(getDeleteRequestConfig(nonExistentId), (deleteResponse) => {
      expect(deleteResponse.statusCode).toBe(CODE_404);
    });

    deleteRequest.end();
  });
});
