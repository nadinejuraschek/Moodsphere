const   express     = require('express');
        router      = express.Router(),
        mongoose    = require('mongoose'),
        User        = require('../models/user'),
        Log         = require('../models/log'),
        Question      = require('../models/modal'),
        Quotes      = require('../models/quotes');

// redirect user to /login or /home when visiting /
router.get('/', isLoggedIn, function(req, res){
    res.redirect('/home');
});

// render /home, /overview, and /discover if user is signed in, otherwise redirect to /login
router.get('/home', isLoggedIn, function(req, res){
    // Question.find({}, function(err, data){
    //     if(err){
    //         console.log("Error: " + err);
    //       } else {
    //         console.log(data);
    //         res.render('home', {title: 'Home', currentUser: req.user.username, modal: data});
    //       };
    // });
    res.render('home', {title: 'Home', currentUser: req.user.username});
});

router.get('/overview', isLoggedIn, function(req, res){
    res.render('overview', {title: 'Overview', currentUser: req.user.username});
});
router.get('/discover', isLoggedIn, function(req, res){
    res.render('discover', {title: 'Discover', currentUser: req.user.username});
});

// catch all route
router.get('*', function(req, res){
    res.render('error');
});

// check if user is logged in logic
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

// get modal data from DB
function getModalData(){
    console.log(mongoose.model('Modal'));
    Modal.find({}, function(err, modalData){
        if(err){
            console.log("Error: " + err);
          } else {
            res.render('/home', { modal: modalData });
          };
    });
};

// router.post('/create', function(req, res){
//     let newQuestion = { 
//         moods: [
//             "depressed",
//             "sad",
//             "moderate",
//             "happy",
//             "exhilirated"
//         ],
//         questions: [
//             {
//             question: "Do you feel hopeless?",
//             answers: [
//                 "Yes, all the time.",
//                 "Yes, sometimes.",
//                 "No."
//             ]
//             },
//             {
//             question: "Are you getting less sleep than usual?",
//             answers: [
//                 "Yes, I had trouble falling asleep.",
//                 "Yes, I kept waking up at night.",
//                 "No, I haven't noticed any differences."
//             ]
//             },
//             {
//             question: "Have you been productive today?",
//             answers: [
//                 "Yes, I have kept myself busy.",
//                 "I only completed important tasks.",
//                 "No, I don't feel like leaving the house."
//             ]
//             }
//         ]
//      };
//      console.log(newQuestion);
//     Question.create(newQuestion, function(err, addQuestion) {
//       if(err) {
//         console.log('Error: ' + err);
//       } else {
//         console.log(addQuestion);
//       };
// });    

module.exports = router;