// models/Group.js
const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model
        required: true,
      },
      share: {
        type: Number,
        default: 0,
      },
    },
  ],
  expenses: [
    {
      description: String,
      amount: Number,
      payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      beneficiaries: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
          },
          share: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
  settlements: [
    {
      payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      beneficiary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      settled: {
        type: Boolean,
        default: false,
      },
    }
  ],
});

// groupSchema.methods.addMember = function (userId) {
//   this.members.push({

// groupSchema.methods.addMember = function (userId) {
//   this.members.push({
// });



// Define a method outside the schema for calculating shares

groupSchema.methods.calculateShares = function(amount) {

    const totalMembers = this.members.length;

    // Check if there are members in the group
    if (totalMembers === 0) {
    return [];
    }

    // Calculate shares based on the provided amount
    const shareAmount = amount / (totalMembers + 1); // Including the payer
    const payerShare = amount - shareAmount * totalMembers;

    // Create an array of shares for each member
    const shares = [
    { userId: this.payer, payerShare },
    ...this.members.map(member => ({
      userId: member.userId,
      share: shareAmount,
    })),
    ];

    // return shares;
    return shares;

};


const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
