import BaseController from './base.controller';

import Journal from '../models/journal';
import Entry from '../models/entry';
import Version from '../models/version';

class EntriesController extends BaseController {
  whitelist = ['title', 'textBody', 'attachments', 'isDeleted', 'isHidden', 'wasSaved', 'reasonModified'];

  _populate = async (req, res, next) => {
    const { entryId } = req.params;

    try {
      const entry = await Entry.findById(entryId);

      if (!entry) {
        const err = new Error('Entry not found.');
        err.status = 404;
        return next(err);
      }

      req.entry = entry;
      next();
    } catch (err) {
      next(err);
    }
  };

  search = async (req, res, next) => {
    try {
      res.json(await Entry.find());
    } catch (err) {
      next(err);
    }
  };

  fetch = async (req, res) => {
    const entry = req.entry;

    if (!entry) {
      return res.sendStatus(404);
    }

    res.json(await Entry.findById(entry.id).populate('journal'));
  };

  find = async (req, res, next) => {
    const params = this.filterParams(req.body, ['from', 'to']);

    const journal = req.journal;
    const author = req.user || req.currentUser;

    if (!journal) res.sendStatus(404);
    if (!author) res.sendStatus(401);
    if (!params.from) res.status(404).json({ message: 'Please provide a from date' });
    if (!params.to) res.status(404).json({ message: 'Please provide a to date' });
    const from = new Date(params.from);
    const to = new Date(params.to);
    from.setHours(0, 0, 0, 1);
    to.setHours(23, 59, 59, 59);

    try {
      res.json(await Entry.find({ journal: journal.id, createdAt: { $gte: from, $lte: to } }).populate('versions'));
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    const journal = req.journal;
    const author = req.user || req.currentUser;

    if (!journal) res.sendStatus(404);
    if (!author) res.sendStatus(401);

    let newEntry = new Entry({
      author,
      journal,
    });

    let newVersion = new Version({
      ...params,
    });
    try {
      const savedVersion = await newVersion.save();

      newEntry.versions.push(savedVersion);
      const savedEntry = await newEntry.save();

      const currentJournal = await Journal.findById(req.journal.id);
      currentJournal.entries.push(savedEntry);
      await currentJournal.save();

      res.status(201).json(await Journal.findById(req.journal.id).populate('entries'));
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };

  hide = async (req, res, next) => {
    const entry = req.entry;

    if (!entry) return res.sendStatus(404);

    try {
      const currentEntry = await Entry.findById(entry.id);

      currentEntry.isHidden = !currentEntry.isHidden;
      const savedEntry = await currentEntry.save();
      res.status(200).json(await Entry.findById(savedEntry.id).populate('journal'));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    const entry = req.entry;

    if (!entry) return res.sendStatus(404);

    try {
      const currentEntry = await Entry.findById(entry.id);

      currentEntry.isDeleted = !currentEntry.isDeleted;
      const savedEntry = await currentEntry.save();
      res.status(200).json(await Entry.findById(savedEntry.id).populate('journal'));
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    const journal = req.journal;
    const author = req.user || req.currentUser;
    const entry = req.entry;

    if (!journal) res.sendStatus(404);
    if (!entry) res.sendStatus(404);
    if (!author) res.sendStatus(401);

    const newVersion = new Version({
      ...params,
    });

    try {
      const currentEntry = await Entry.findById(entry.id);
      const savedVersion = await newVersion.save();
      currentEntry.versions.push(savedVersion);
      const savedEntry = await currentEntry.save();
      res.status(201).json(await Entry.findById(savedEntry.id).populate('journal'));
    } catch (err) {
      next(err);
    }
  };
}

export default new EntriesController();
