import BaseController from './base.controller';
import Journal from '../models/journal';
import _ from 'lodash';

class JournalsController extends BaseController {
  whitelist = ['name'];
  _populate = async (req, res, next) => {
    const { id } = req.params;

    try {
      const journal = await Journal.findById(id);

      if (!journal) {
        const err = new Error('Journal not Found');
        err.status = 404;
        return next(err);
      }

      req.journal = journal;
      next();
    } catch (err) {
      next(err);
    }
  };

  search = async (req, res, next) => {
    const user = req.user || req.currentUser;

    if (!user) {
      const err = new Error('Permission Denied');
      err.status(401);
      next(err);
    }

    try {
      res.status(200).json(await Journal.find({ author: user }).populate('entries'));
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    const user = req.user || req.currentUser;

    if (_.isEmpty(params)) return res.status(404).json({ message: ' A Title must be entered!' });

    if (!user) {
      return res.status(401).json({ message: 'Permission DENIED!' });
    }

    const newJournal = new Journal({
      ...params,
      author: user,
    });

    try {
      const savedJournal = await newJournal.save();
      res.status(201).json(savedJournal);
    } catch (err) {
      next(err);
    }
  };

  fetch = async (req, res, next) => {
    const journal = req.journal;
    const current = await Journal.findOne({ _id: journal.id }).populate('entries');
    if (!journal) return res.sendStatus(404);
    res.json(current);
  };
}

export default new JournalsController();