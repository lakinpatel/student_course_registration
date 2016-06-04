var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var GradeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  marks:{
      type: String,
      trim:true,
      required: 'Assign some marks'
  },
  student:{
    type:Schema.ObjectId,
    ref:'Staff'
  },
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
});

mongoose.model('Grade', GradeSchema);