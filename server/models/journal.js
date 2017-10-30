import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const JournalSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A journal must be created with a title.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
      },
    ],
  },
  { timestamps: true }
);

JournalSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    return obj;
  },
});

const JournalModel = mongoose.model('Journal', JournalSchema);
export default JournalModel;
