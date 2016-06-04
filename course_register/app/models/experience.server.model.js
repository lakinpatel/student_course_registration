var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var ExperienceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  companyName:{
      type: String,
      trim: true,
      required: 'Company Name cannot be blank'
  },
  city:{
      type: String,
      trim: true,
      required: 'City cannot be blank'
  },
  country:{
      type: String,
      trim: true,
      required: 'Country cannot be blank'
  },
  position: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  details: {
    type: String,
    default: '',
    trim: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'Student'
  }
});

mongoose.model('Experience', ExperienceSchema);