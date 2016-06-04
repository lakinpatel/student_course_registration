var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var StaffSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    staffNumber: {
        type: String,
        unique: true,
        required: 'User # is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    phoneNumber: String,
    address: String,
    city: String,
    country: String,
    usertype:String,
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

StaffSchema.virtual('fullName').get(function() {
        return this.firstName + ' ' + this.lastName;
    }).set(function(fullName) {
        var splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

StaffSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
    
StaffSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
    
StaffSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};
    
StaffSchema.statics.findUniqueStaffNumber = function(staffNumber, suffix, callback) {
    var _this = this;
    var possibleUsername = staffNumber + (suffix || '');
    
    _this.findOne({
        staffNumber: possibleUsername
    }, function(err, staff) {
        if (!err) {
            if (!staff) {
                callback(possibleUsername);
            } 
            else {
                return _this.findUniqueStaffNumber(staffNumber, (suffix || 0) + 1, callback);
            }
        } 
        else {
            callback(null);
        }
    });
};

StaffSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Staff', StaffSchema);