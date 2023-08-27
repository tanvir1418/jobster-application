const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide company name'],
            maxLength: 100,
        },
        position: {
            type: String,
            required: [true, 'Please provide position'],
            maxLength: 100,
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Please provide user'],
        },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'remote', 'internship'],
            default: 'full-time',
        },
        jobLocation: {
            type: String,
            default: 'my city',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Jobs', JobSchema);
