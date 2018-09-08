// let problems = [{
//     "id":1,
// 	"name":"Two Sum",
// 	"desc":"Given an array of integers, find two numbers such that they add up to a specific target number.\n\nThe function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are NOT zero-based.",
// 	"difficulty":"Easy"
//   },
//   {
// 	"id":2,
// 	"name":"3Sum",
// 	"desc":"Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.",
// 	"difficulty":"Medium"
//   },
//   {
// 	"id":3,
// 	"name":"4Sum",
// 	"desc":"Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?\n\nFind all unique quadruplets in the array which gives the sum of target.",
// 	"difficulty":"Medium"
//   },
// 	{
// 	"id":4,
// 	"name":"Triangle Count",
// 	"desc":"Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?",
//     "difficulty":"Hard"
//     },
// 	{
// 	"id":5,
// 	"name":"Sliding Window Maximum",
// 	"desc":"Given an array of n integer with duplicate number, and a moving window(size k), move the window at each iteration from the start of the array, find the maximum number inside the window at each moving.",
// 	"difficulty":"Super"
// 	}];
const ProblemModel = require('../models/problemModel');

const getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function(err, problems) {
            if(err) {
                reject(err);
            }else {
                resolve(problems);
            }
        })
    })
}

// get problem by ID
const getProblem = function(id) {
    return new Promise((resolve, reject) => {
        // {id: id}: find problem whose id matches input id
        // findOne: find one item
        ProblemModel.findOne({id: id}, function(err, problem) {
            if(err) {
                reject(err);
            }else {
                resolve(problem);
            }
        })
    })
}

// add problem
const addProblem = function(newProblem) {

    return new Promise((resolve, reject) => {
        // check if the problem is already in the db
        ProblemModel.findOne({name: newProblem.name}, function(err, data) {
            if(data) {
                // if we find data, the problem exists
                reject("Problem name already exists")
            }else {
                // save the problem to mongodb
                // count: get the number of problems already in db
                ProblemModel.count({}, function(err, count) {
                    newProblem.id = count + 1;
                    // create mongodb oject
                    const mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save().then(resolve(mongoProblem));
                })
            }
        })
    })
}

// update problem
const modifyProblem = function(problem) {
    return new Promise((resovle, reject) => {
        ProblemModel.update({name: problem.name}, problem, (err, data) => {
            if (!data) {
                reject("Problem name doesn't exist");
            } else {
                resovle(data);
            }
        });
    });
}
module.exports = {
    getProblem,
    getProblems,
    modifyProblem,
    addProblem
}
