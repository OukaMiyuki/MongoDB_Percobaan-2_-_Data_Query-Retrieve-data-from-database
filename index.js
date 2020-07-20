const mongoose = require('mongoose');

//database connection
const mongoDB = 'mongodb://localhost/playground';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

//Create database schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
}); 

const Course = mongoose.model('Course', courseSchema); //if you wondering how can you get the name of the table check in this line

async function createCourse(){
    try{
        const course = new Course({
            name: 'Angular Course',
            author: 'Ouka Miyuki',
            tags: ['Angular', 'frontend'],
            isPublished: true
        });
    
        const result = await course.save();
        console.log(result);
    } catch(err){
        console.log('There\'s an error : ', err.message);
    }
}

//createCourse();
//get all data
async function getData(){
    const data = await Course.find();
    console.log(data);
}

//use filter
// async function getData(){
//     const data = await Course
//         .find( {author : 'Ouka', isPublished: true} ); //get author based on name and isPublished  is true
//     console.log(data);
// }

// //use filter and limit
// async function getData(){
//     const data = await Course
//         .find( {author : 'Ouka', isPublished: true} ) //get author based on name and isPublished  is true
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

//using comparison query operators

//eq  = equaL
//ne  = not equal
//gt  = greater than
//gte = greater than to or equal to
//lt  = less than
//lte = less tan to or equal to
//in  = Matches any of the values specified in an array.
//nin = not in
//read more at : https://docs.mongodb.com/manual/reference/operator/query-comparison/

// async function getData(){
//     const data = await Course
//         .find( { name: {$eq: 'Node.js Course'} } )
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

//another example if there's a proce in database, and you wanna select book price between 10 and 20 (this is just an example, there's no proce field in database, check the schema)
// async function getData(){
//     const data = await Course
//         .find( { price: {$gte: 10, $lte: 20} } ) //greater than 10 but less than 20 so you'll get values between 10 and 20
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

//another example, let's say you wanna get books with price 10 or 15 or 20
// async function getData(){
//     const data = await Course
//         .find( { price: { $in: [10, 15, 20]} } ) //to do that use in and array
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

//use logical operators in mongoDB
//$and
//$not
//$nor
//$or
//read more at : https://docs.mongodb.com/manual/reference/operator/query-logical/

// async function getData(){
//     const data = await Course
//         .find()
//         .or([ { author: 'Ouka' }, { isPublished: true } ]) //example using or
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

//using regular expresion in query
//to get more about javascript regular expresions read at : https://www.w3schools.com/jsref/jsref_obj_regexp.asp
//or https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// async function getData(){
//     const data = await Course
//         //example 1 : select data with author's name or string that start with Ouka
//         .find( {author : /^Ouka/} ) //Regular expression is case sensitive if you don't wanna use case sensitive add i at the end of pattern for example /^Ouka/i
        
//         //example 2 : select data with author's name or string that end with Ouka
//         //.find( { author: /Ouka$/ } ) // /Ouka$/i for incase sensitive

//         //example 3 : select data with string that contain some particular word, for example let's use word Ouka, so basically, it can be in the first, end, middle or anywhare in the string
//         //.find( { author: /.*Ouka.*/ } ) // /.*Ouka.*/i for in case sensitive
        
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

//get count number of data in database
// async function getData(){
//     const data = await Course
//         .find( {author : 'Ouka', isPublished: true} ) //get author based on name and isPublished  is true
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .count();
//     console.log(data);
// }

//get count for all data
// async function getData(){
//     const data = await Course
//         .find() //get author based on name and isPublished  is true
//         .limit(10 ) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .count();
//     console.log(data);
// }

//use pagination
// async function getData(){
//     const pageNumber = 3;
//     const pageSize = 10; //load page persize
//     //this can be done using .skip(), basically it's gonna skip data from previous data
//     const data = await Course
//         .find( {author : 'Ouka', isPublished: true} ) //get author based on name and isPublished  is true
//         .skip((pageNumber-1)*pageSize)
//         .limit(pageSize) //limit the data that gonna be shown
//         .sort( {name: 1} ) //1 is indicate ascending sort, so basically, sort the data base on name ascendingly, if you wanna change it to descending change the 1 with -1
//         .select( { name: 1, tags: 1 } ); //sellect particular data that want to show for example in this line you wanna select name and tags and sort it as ascending 
//     console.log(data);
// }

getData();