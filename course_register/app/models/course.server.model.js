var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var CourseSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name:{
      type: String,
      trim: true,
      required: 'Course Name cannot be blank'
  },
  details: {
    type: String,
    default: '',
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'Staff'
  },
  students:[{
    type:Schema.ObjectId,
    ref:'staff'
  }]
});

mongoose.model('Course', CourseSchema);