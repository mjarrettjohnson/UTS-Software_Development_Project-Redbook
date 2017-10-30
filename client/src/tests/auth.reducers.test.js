import reducers from '../reducers/combineReducers';

global.sessionStorage = jest.genMockFunction();
global.sessionStorage.setItem = jest.genMockFunction();
global.sessionStorage.getItem = jest.genMockFunction();
global.sessionStorage.removeItem = jest.genMockFunction();

test('Initial state', () => {
  let state;
  state = reducers(undefined, {});
  expect(state).toEqual({ auth: { isLoggedIn: false }, dashboard: {}, journal: {}, entry: {} });
});

test('Register Success', () => {
  let state;
  state = reducers(
    {
      auth: {
        isLoggedIn: true,
        user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de8d3d80d38c0024744f34' },
      },
      dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
      journal: {},
      entry: {},
    },
    {
      type: 'JOURNAL_FETCH_SUCCESS',
      journals: [
        {
          updatedAt: '2017-10-11T21:29:34.000Z',
          createdAt: '2017-10-11T21:29:34.000Z',
          name: 'Starter Journal',
          author: '59de8d3d80d38c0024744f34',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:29:33.997Z',
              createdAt: '2017-10-11T21:29:33.997Z',
              journal: '59de8d3d80d38c0024744f35',
              author: '59de8d3d80d38c0024744f34',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:29:33.987Z',
                  updatedAt: '2017-10-11T21:29:33.996Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de8d3d80d38c0024744f37',
                  created: '12/10/2017 08:29',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de8d3d80d38c0024744f36',
            },
          ],
          id: '59de8d3d80d38c0024744f35',
        },
      ],
    }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: true,
      user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de8d3d80d38c0024744f34' },
    },
    dashboard: {
      isLoggedIn: false,
      error: { status: 401, body: 'jwt malformed' },
      journals: [
        {
          updatedAt: '2017-10-11T21:29:34.000Z',
          createdAt: '2017-10-11T21:29:34.000Z',
          name: 'Starter Journal',
          author: '59de8d3d80d38c0024744f34',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:29:33.997Z',
              createdAt: '2017-10-11T21:29:33.997Z',
              journal: '59de8d3d80d38c0024744f35',
              author: '59de8d3d80d38c0024744f34',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:29:33.987Z',
                  updatedAt: '2017-10-11T21:29:33.996Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de8d3d80d38c0024744f37',
                  created: '12/10/2017 08:29',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de8d3d80d38c0024744f36',
            },
          ],
          id: '59de8d3d80d38c0024744f35',
        },
      ],
    },
    journal: {},
    entry: {},
  });
});

test('Register Failure', () => {
  let state;
  state = reducers(
    {
      auth: { isLoggedIn: false },
      dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
      journal: {},
      entry: {},
    },
    {
      type: 'REGISTER_ERROR',
      error: {
        config: {
          transformRequest: {},
          transformResponse: {},
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
          method: 'post',
          url: 'http://localhost:4567/api/auth/register',
          data:
            '{"firstname":"John","lastname":"Doe","username":"JDoe","email":"john.doe@gmail.com","password":"password1"}',
        },
        request: {},
        response: {
          data: {
            message: 'User validation failed: username: Username already taken., email: Email already in use.',
            stack:
              'MongooseError: \n    at ValidationError (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/mongoose/lib/error/validation.js:27:11)\n    at model.Document.invalidate (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/mongoose/lib/document.js:1610:32)\n    at /mnt/d/Uni/31281 - SDP/journalapp/node_modules/mongoose/lib/document.js:1482:17\n    at validate (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/mongoose/lib/schematype.js:760:7)\n    at /mnt/d/Uni/31281 - SDP/journalapp/node_modules/mongoose/lib/schematype.js:829:5\n    at /mnt/d/Uni/31281 - SDP/journalapp/server/models/user.js:69:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)',
            errors: { username: 'Username already taken.', email: 'Email already in use.' },
          },
          status: 400,
          statusText: 'Bad Request',
          headers: { 'content-type': 'application/json; charset=utf-8' },
          config: {
            transformRequest: {},
            transformResponse: {},
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
            method: 'post',
            url: 'http://localhost:4567/api/auth/register',
            data:
              '{"firstname":"John","lastname":"Doe","username":"JDoe","email":"john.doe@gmail.com","password":"password1"}',
          },
          request: {},
        },
      },
    }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: false,
      error: {
        status: 400,
        body: 'User validation failed: username: Username already taken., email: Email already in use.',
      },
    },
    dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
    journal: {},
    entry: {},
  });
});

test('Login Error', () => {
  let state;
  state = reducers(
    {
      auth: { isLoggedIn: false },
      dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
      journal: {},
      entry: {},
    },
    {
      type: 'LOGIN_ERROR',
      error: {
        config: {
          transformRequest: {},
          transformResponse: {},
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
          method: 'post',
          url: 'http://localhost:4567/api/auth/login',
          data: '{"username":"JDoe","password":"pass"}',
        },
        request: {},
        response: {
          data: {
            message: 'Please verify your credentials.',
            stack:
              'Error: Please verify your credentials.\n    at AuthController._callee$ (/mnt/d/Uni/31281 - SDP/journalapp/server/controllers/auth.controller.js:12:21)\n    at tryCatch (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/regenerator-runtime/runtime.js:65:40)\n    at Generator.invoke [as _invoke] (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/regenerator-runtime/runtime.js:303:22)\n    at Generator.prototype.(anonymous function) [as next] (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/regenerator-runtime/runtime.js:117:21)\n    at step (/mnt/d/Uni/31281 - SDP/journalapp/node_modules/babel-runtime/helpers/asyncToGenerator.js:17:30)\n    at /mnt/d/Uni/31281 - SDP/journalapp/node_modules/babel-runtime/helpers/asyncToGenerator.js:28:13\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)',
          },
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'content-type': 'application/json; charset=utf-8' },
          config: {
            transformRequest: {},
            transformResponse: {},
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
            method: 'post',
            url: 'http://localhost:4567/api/auth/login',
            data: '{"username":"JDoe","password":"pass"}',
          },
          request: {},
        },
      },
    }
  );
  expect(state).toEqual({
    auth: { isLoggedIn: false, error: { status: 401, body: 'Please verify your credentials.' } },
    dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
    journal: {},
    entry: {},
  });
});

test('Login Success', () => {
  let state;
  state = reducers(
    {
      auth: { isLoggedIn: false },
      dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
      journal: {},
      entry: {},
    },
    {
      type: 'LOGIN_SUCCESS',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5ZGU5MTg1ODBkMzhjMDAyNDc0NGYzYSIsInVzZXJuYW1lIjoiSkRvZSIsImZpcnN0bmFtZSI6IkpvaG4iLCJsYXN0bmFtZSI6IkRvZSIsImlhdCI6MTUwNzc1ODUwNiwiZXhwIjoxNTA3ODQ0OTA2fQ.nM43ubnrYMqOTWHW1RgMKVc57y2RlEkYTD9VLYYN8xQ',
    }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: true,
      user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
    },
    dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
    journal: {},
    entry: {},
  });
});

test('Logout', () => {
  let state;
  state = reducers(
    {
      auth: {
        isLoggedIn: true,
        user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
      },
      dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
      journal: {},
      entry: {},
    },
    { type: 'LOGOUT' }
  );
  expect(state).toEqual({ auth: { isLoggedIn: false }, dashboard: {}, journal: {}, entry: {} });
});
