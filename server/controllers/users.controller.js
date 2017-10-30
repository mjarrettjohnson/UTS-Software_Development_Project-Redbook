import BaseController from './base.controller';
import User from '../models/user';
import Journal from '../models/journal';
import Entry from '../models/entry';
import Version from '../models/version';

class UsersController extends BaseController {
  whitelist = ['firstname', 'lastname', 'email', 'username', 'password', 'passwordCheck', 'role'];

  _populate = async (req, res, next) => {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });

      if (!user) {
        const err = new Error('User not found.');
        err.status = 404;
        return next(err);
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };

  _createInitialJournal = async author => {
    const journal = new Journal({
      name: 'Starter Journal',
      author,
    });

    const entry = await this._createInitialEntry(author, journal);
    journal.entries.push(entry);

    return await journal.save();
  };

  _createInitialEntry = async (author, journal) => {
    const entry = new Entry({
      journal: journal.id,
      author,
    });
    const version = await this._createInitialVersion(author, journal);
    entry.versions.push(version);
    return await entry.save();
  };

  _createInitialVersion = async (author, journal) => {
    const version = new Version({
      title: 'Example Entry',
      textBody: `
# This is H1 heading
## This is a H2 heading
### this is a H3 heading
#### This is a H4 heading
##### This is a H5 heading
###### This is a H6 heading

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

v divider

--- 

^ divider

how about 

**bold**

*italic?*

~~strikethrough~~

1. How do you do?
2. An Ordered list?

- what about an
- unordered list

heres a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a cheat sheet that will help        
how about some inline code?

\` function(isThisGreatOrWhat) { return true; } \`

\`\`\` 
def multiline_code:
  return 'this is how we do it'
\`\`\`

What | About | Tables?
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

heres a doggo

![Doge](https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg)
      `,
    });

    return await version.save();
  };

  search = async (req, res, next) => {
    try {
      res.json(await User.find());
    } catch (err) {
      next(err);
    }
  };

  fetch = (req, res) => {
    const user = req.user || req.currentUser;

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  };

  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    if (params.password !== params.passwordCheck) {
      return res.status(404).json({ message: 'Passwords do not match!' });
    }

    let newUser = new User({
      ...params,
      provider: 'local',
    });

    try {
      const savedUser = await newUser.save();
      const token = savedUser.generateToken();
      this._createInitialJournal(savedUser.id);
      res.status(201).json({ token });
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
}

export default new UsersController();
