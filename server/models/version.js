import mongoose from 'mongoose';
import DateFormatter from '../utils/date-formatter';
const Schema = mongoose.Schema;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const VersionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    textBody: {
      type: String,
      required: [true, 'Entry text is required'],
    },
    attachments: [Buffer],

    wasSaved: {
      type: Boolean,
      default: false,
    },
    reasonModified: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

VersionSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    obj.created = DateFormatter.createTimestamp(obj.createdAt);
    obj.month = getMonth(obj.createdAt);
    obj.year = getYear(obj.createdAt);
    delete obj._id;
    return obj;
  },
});

const getMonth = dateStr => {
  const index = new Date(dateStr).getMonth(0);
  return MONTHS[index];
};

const getYear = dateStr => {
  return new Date(dateStr).getFullYear();
};

const VersionModel = mongoose.model('Version', VersionSchema);

export default VersionModel;
