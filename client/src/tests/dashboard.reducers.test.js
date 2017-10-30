import reducers from '../reducers/combineReducers';

global.sessionStorage = jest.genMockFunction();
global.sessionStorage.setItem = jest.genMockFunction();
global.sessionStorage.getItem = jest.genMockFunction();
global.sessionStorage.removeItem = jest.genMockFunction();

test('Fetch Journals Error', () => {
  let state;
  state = reducers(
    { auth: { isLoggedIn: false }, dashboard: {}, journal: {}, entry: {} },
    {
      type: 'JOURNAL_FETCH_ERROR',
      error: {
        config: {
          transformRequest: {},
          transformResponse: {},
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'undefined',
          },
          method: 'get',
          url: 'http://localhost:4567/api/journals',
          data: '{}',
        },
        request: {},
        response: {
          data: { name: 'JsonWebTokenError', message: 'jwt malformed' },
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
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': 'undefined',
            },
            method: 'get',
            url: 'http://localhost:4567/api/journals',
            data: '{}',
          },
          request: {},
        },
      },
    }
  );
  expect(state).toEqual({
    auth: { isLoggedIn: false },
    dashboard: { isLoggedIn: false, error: { status: 401, body: 'jwt malformed' } },
    journal: {},
    entry: {},
  });
});

test('Journal Fetch success', () => {
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
    {
      type: 'JOURNAL_FETCH_SUCCESS',
      journals: [
        {
          updatedAt: '2017-10-11T21:47:49.943Z',
          createdAt: '2017-10-11T21:47:49.943Z',
          name: 'Starter Journal',
          author: '59de918580d38c0024744f3a',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:47:49.941Z',
              createdAt: '2017-10-11T21:47:49.941Z',
              journal: '59de918580d38c0024744f3b',
              author: '59de918580d38c0024744f3a',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:47:49.939Z',
                  updatedAt: '2017-10-11T21:47:49.941Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de918580d38c0024744f3d',
                  created: '12/10/2017 08:47',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de918580d38c0024744f3c',
            },
          ],
          id: '59de918580d38c0024744f3b',
        },
      ],
    }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: true,
      user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
    },
    dashboard: {
      isLoggedIn: false,
      error: { status: 401, body: 'jwt malformed' },
      journals: [
        {
          updatedAt: '2017-10-11T21:47:49.943Z',
          createdAt: '2017-10-11T21:47:49.943Z',
          name: 'Starter Journal',
          author: '59de918580d38c0024744f3a',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:47:49.941Z',
              createdAt: '2017-10-11T21:47:49.941Z',
              journal: '59de918580d38c0024744f3b',
              author: '59de918580d38c0024744f3a',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:47:49.939Z',
                  updatedAt: '2017-10-11T21:47:49.941Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de918580d38c0024744f3d',
                  created: '12/10/2017 08:47',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de918580d38c0024744f3c',
            },
          ],
          id: '59de918580d38c0024744f3b',
        },
      ],
    },
    journal: {},
    entry: {},
  });
});

test('Toggle user creating journal', () => {
  let state;
  state = reducers(
    {
      auth: {
        isLoggedIn: true,
        user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
      },
      dashboard: {
        isLoggedIn: false,
        error: { status: 401, body: 'jwt malformed' },
        journals: [
          {
            updatedAt: '2017-10-11T21:47:49.943Z',
            createdAt: '2017-10-11T21:47:49.943Z',
            name: 'Starter Journal',
            author: '59de918580d38c0024744f3a',
            __v: 0,
            entries: [
              {
                updatedAt: '2017-10-11T21:47:49.941Z',
                createdAt: '2017-10-11T21:47:49.941Z',
                journal: '59de918580d38c0024744f3b',
                author: '59de918580d38c0024744f3a',
                __v: 0,
                isHidden: false,
                isDeleted: false,
                versions: [
                  {
                    textBody:
                      '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                    title: 'Example Entry',
                    createdAt: '2017-10-11T21:47:49.939Z',
                    updatedAt: '2017-10-11T21:47:49.941Z',
                    __v: 0,
                    wasSaved: false,
                    attachments: [],
                    id: '59de918580d38c0024744f3d',
                    created: '12/10/2017 08:47',
                    month: 'October',
                    year: 2017,
                  },
                ],
                id: '59de918580d38c0024744f3c',
              },
            ],
            id: '59de918580d38c0024744f3b',
          },
        ],
      },
      journal: {},
      entry: {},
    },
    { type: 'TOGGLE_USER_IS_CREATING_JOURNAL' }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: true,
      user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
    },
    dashboard: {
      isLoggedIn: false,
      error: {},
      journals: [
        {
          updatedAt: '2017-10-11T21:47:49.943Z',
          createdAt: '2017-10-11T21:47:49.943Z',
          name: 'Starter Journal',
          author: '59de918580d38c0024744f3a',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:47:49.941Z',
              createdAt: '2017-10-11T21:47:49.941Z',
              journal: '59de918580d38c0024744f3b',
              author: '59de918580d38c0024744f3a',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:47:49.939Z',
                  updatedAt: '2017-10-11T21:47:49.941Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de918580d38c0024744f3d',
                  created: '12/10/2017 08:47',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de918580d38c0024744f3c',
            },
          ],
          id: '59de918580d38c0024744f3b',
        },
      ],
      userIsCreatingJournal: true,
    },
    journal: {},
    entry: {},
  });
});

test('Journal Create Success', () => {
  let state;
  state = reducers(
    {
      auth: {
        isLoggedIn: true,
        user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
      },
      dashboard: {
        isLoggedIn: false,
        error: {},
        journals: [
          {
            updatedAt: '2017-10-11T21:47:49.943Z',
            createdAt: '2017-10-11T21:47:49.943Z',
            name: 'Starter Journal',
            author: '59de918580d38c0024744f3a',
            __v: 0,
            entries: [
              {
                updatedAt: '2017-10-11T21:47:49.941Z',
                createdAt: '2017-10-11T21:47:49.941Z',
                journal: '59de918580d38c0024744f3b',
                author: '59de918580d38c0024744f3a',
                __v: 0,
                isHidden: false,
                isDeleted: false,
                versions: [
                  {
                    textBody:
                      '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                    title: 'Example Entry',
                    createdAt: '2017-10-11T21:47:49.939Z',
                    updatedAt: '2017-10-11T21:47:49.941Z',
                    __v: 0,
                    wasSaved: false,
                    attachments: [],
                    id: '59de918580d38c0024744f3d',
                    created: '12/10/2017 08:47',
                    month: 'October',
                    year: 2017,
                  },
                ],
                id: '59de918580d38c0024744f3c',
              },
            ],
            id: '59de918580d38c0024744f3b',
          },
        ],
        userIsCreatingJournal: true,
      },
      journal: {},
      entry: {},
    },
    {
      type: 'JOURNAL_CREATE_SUCCESS',
      journal: {
        __v: 0,
        updatedAt: '2017-10-12T01:38:56.496Z',
        createdAt: '2017-10-12T01:38:56.496Z',
        name: 'Journal',
        author: {
          updatedAt: '2017-10-11T21:47:49.933Z',
          createdAt: '2017-10-11T21:47:49.933Z',
          firstname: 'John',
          lastname: 'Doe',
          username: 'JDoe',
          email: 'john.doe@gmail.com',
          role: 'client',
          id: '59de918580d38c0024744f3a',
        },
        entries: [],
        id: '59dec7b0361faa00d80aaab0',
      },
    }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: true,
      user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
    },
    dashboard: {
      isLoggedIn: false,
      error: {},
      journals: [
        {
          updatedAt: '2017-10-11T21:47:49.943Z',
          createdAt: '2017-10-11T21:47:49.943Z',
          name: 'Starter Journal',
          author: '59de918580d38c0024744f3a',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:47:49.941Z',
              createdAt: '2017-10-11T21:47:49.941Z',
              journal: '59de918580d38c0024744f3b',
              author: '59de918580d38c0024744f3a',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:47:49.939Z',
                  updatedAt: '2017-10-11T21:47:49.941Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de918580d38c0024744f3d',
                  created: '12/10/2017 08:47',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de918580d38c0024744f3c',
            },
          ],
          id: '59de918580d38c0024744f3b',
        },
        {
          __v: 0,
          updatedAt: '2017-10-12T01:38:56.496Z',
          createdAt: '2017-10-12T01:38:56.496Z',
          name: 'Journal',
          author: {
            updatedAt: '2017-10-11T21:47:49.933Z',
            createdAt: '2017-10-11T21:47:49.933Z',
            firstname: 'John',
            lastname: 'Doe',
            username: 'JDoe',
            email: 'john.doe@gmail.com',
            role: 'client',
            id: '59de918580d38c0024744f3a',
          },
          entries: [],
          id: '59dec7b0361faa00d80aaab0',
        },
      ],
      userIsCreatingJournal: true,
    },
    journal: {},
    entry: {},
  });
});

test('Go To Jounral Page', () => {
  let state;
  state = reducers(
    {
      auth: {
        isLoggedIn: true,
        user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
      },
      dashboard: {
        isLoggedIn: false,
        error: {},
        journals: [
          {
            updatedAt: '2017-10-11T21:47:49.943Z',
            createdAt: '2017-10-11T21:47:49.943Z',
            name: 'Starter Journal',
            author: '59de918580d38c0024744f3a',
            __v: 0,
            entries: [
              {
                updatedAt: '2017-10-11T21:47:49.941Z',
                createdAt: '2017-10-11T21:47:49.941Z',
                journal: '59de918580d38c0024744f3b',
                author: '59de918580d38c0024744f3a',
                __v: 0,
                isHidden: false,
                isDeleted: false,
                versions: [
                  {
                    textBody:
                      '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                    title: 'Example Entry',
                    createdAt: '2017-10-11T21:47:49.939Z',
                    updatedAt: '2017-10-11T21:47:49.941Z',
                    __v: 0,
                    wasSaved: false,
                    attachments: [],
                    id: '59de918580d38c0024744f3d',
                    created: '12/10/2017 08:47',
                    month: 'October',
                    year: 2017,
                  },
                ],
                id: '59de918580d38c0024744f3c',
              },
            ],
            id: '59de918580d38c0024744f3b',
          },
          {
            __v: 0,
            updatedAt: '2017-10-12T01:38:56.496Z',
            createdAt: '2017-10-12T01:38:56.496Z',
            name: 'Journal',
            author: {
              updatedAt: '2017-10-11T21:47:49.933Z',
              createdAt: '2017-10-11T21:47:49.933Z',
              firstname: 'John',
              lastname: 'Doe',
              username: 'JDoe',
              email: 'john.doe@gmail.com',
              role: 'client',
              id: '59de918580d38c0024744f3a',
            },
            entries: [],
            id: '59dec7b0361faa00d80aaab0',
          },
        ],
        userIsCreatingJournal: false,
      },
      journal: {},
      entry: {},
    },
    {
      type: 'GO_TO_JOURNAL_PAGE',
      journal: {
        updatedAt: '2017-10-11T21:47:49.943Z',
        createdAt: '2017-10-11T21:47:49.943Z',
        name: 'Starter Journal',
        author: '59de918580d38c0024744f3a',
        __v: 0,
        entries: [
          {
            updatedAt: '2017-10-11T21:47:49.941Z',
            createdAt: '2017-10-11T21:47:49.941Z',
            journal: '59de918580d38c0024744f3b',
            author: '59de918580d38c0024744f3a',
            __v: 0,
            isHidden: false,
            isDeleted: false,
            versions: [
              {
                textBody:
                  '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                title: 'Example Entry',
                createdAt: '2017-10-11T21:47:49.939Z',
                updatedAt: '2017-10-11T21:47:49.941Z',
                __v: 0,
                wasSaved: false,
                attachments: [],
                id: '59de918580d38c0024744f3d',
                created: '12/10/2017 08:47',
                month: 'October',
                year: 2017,
              },
            ],
            id: '59de918580d38c0024744f3c',
          },
        ],
        id: '59de918580d38c0024744f3b',
      },
    }
  );
  expect(state).toEqual({
    auth: {
      isLoggedIn: true,
      user: { firstname: 'John', lastname: 'Doe', username: 'JDoe', id: '59de918580d38c0024744f3a' },
    },
    dashboard: {
      isLoggedIn: false,
      error: {},
      journals: [
        {
          updatedAt: '2017-10-11T21:47:49.943Z',
          createdAt: '2017-10-11T21:47:49.943Z',
          name: 'Starter Journal',
          author: '59de918580d38c0024744f3a',
          __v: 0,
          entries: [
            {
              updatedAt: '2017-10-11T21:47:49.941Z',
              createdAt: '2017-10-11T21:47:49.941Z',
              journal: '59de918580d38c0024744f3b',
              author: '59de918580d38c0024744f3a',
              __v: 0,
              isHidden: false,
              isDeleted: false,
              versions: [
                {
                  textBody:
                    '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                  title: 'Example Entry',
                  createdAt: '2017-10-11T21:47:49.939Z',
                  updatedAt: '2017-10-11T21:47:49.941Z',
                  __v: 0,
                  wasSaved: false,
                  attachments: [],
                  id: '59de918580d38c0024744f3d',
                  created: '12/10/2017 08:47',
                  month: 'October',
                  year: 2017,
                },
              ],
              id: '59de918580d38c0024744f3c',
            },
          ],
          id: '59de918580d38c0024744f3b',
        },
        {
          __v: 0,
          updatedAt: '2017-10-12T01:38:56.496Z',
          createdAt: '2017-10-12T01:38:56.496Z',
          name: 'Journal',
          author: {
            updatedAt: '2017-10-11T21:47:49.933Z',
            createdAt: '2017-10-11T21:47:49.933Z',
            firstname: 'John',
            lastname: 'Doe',
            username: 'JDoe',
            email: 'john.doe@gmail.com',
            role: 'client',
            id: '59de918580d38c0024744f3a',
          },
          entries: [],
          id: '59dec7b0361faa00d80aaab0',
        },
      ],
      userIsCreatingJournal: false,
      journal: {
        updatedAt: '2017-10-11T21:47:49.943Z',
        createdAt: '2017-10-11T21:47:49.943Z',
        name: 'Starter Journal',
        author: '59de918580d38c0024744f3a',
        __v: 0,
        entries: [
          {
            updatedAt: '2017-10-11T21:47:49.941Z',
            createdAt: '2017-10-11T21:47:49.941Z',
            journal: '59de918580d38c0024744f3b',
            author: '59de918580d38c0024744f3a',
            __v: 0,
            isHidden: false,
            isDeleted: false,
            versions: [
              {
                textBody:
                  '\n# This is H1 heading\n## This is a H2 heading\n### this is a H3 heading\n#### This is a H4 heading\n##### This is a H5 heading\n###### This is a H6 heading\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nv divider\n--- \n^ divider\n\nhow about \n\n**bold**\n\n*italic?*\n\n~~strikethrough~~\n\n1. How do you do?\n2. An Ordered list?\n\n- what about an\n- unordered list\n\nheres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        \nhow about some inline code?\n\n` function(isThisGreatOrWhat) { return true; } `\n\n``` \ndef multiline_code:\n  return \'this is how we do it\'\n```\n\nWhat | About | Tables?\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\nheres a doggo\n\n![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)\n      ',
                title: 'Example Entry',
                createdAt: '2017-10-11T21:47:49.939Z',
                updatedAt: '2017-10-11T21:47:49.941Z',
                __v: 0,
                wasSaved: false,
                attachments: [],
                id: '59de918580d38c0024744f3d',
                created: '12/10/2017 08:47',
                month: 'October',
                year: 2017,
              },
            ],
            id: '59de918580d38c0024744f3c',
          },
        ],
        id: '59de918580d38c0024744f3b',
      },
    },
    journal: {},
    entry: {},
  });
});
