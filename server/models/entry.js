import mongoose from 'mongoose';
import Version from './version';

const Schema = mongoose.Schema;

const EntrySchema = new Schema(
  {
    versions: [Version.schema],
    journal: {
      type: Schema.Types.ObjectId,
      ref: 'Journal',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

EntrySchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;

    delete obj._id;
    return obj;
  },
});

const EntryModel = mongoose.model('Entry', EntrySchema);

export default EntryModel;
