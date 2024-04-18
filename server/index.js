const express = require('express');
const connectDB = require('./db');
const Student = require('./models/Student');
const PORT = 5000;
const app = express();
const cors = require('cors');

connectDB();
app.use(express.json());
app.use(cors({
    origin: {
        'http://localhost:3000',
        'https://shivam-rajput-assignment-stretch.vercel.app/'
    } // Replace with your frontend URL
}));

app.get('/check',(req,res)=>{
    res.send({msg:'Server is running'});
});

app.post('/register', async(req,res)=>{
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        const newStudent = new Student({
            name,
            email,
            password,
            techStack: [], // Empty array for now
            location: '',
            fieldOfInterest: [],
            seeking: [],
            bio: '',
            githubURL: '',
            twitterURL: '',
            websiteURL: '',
            linkedinURL: ''
        });

        await  newStudent.save();
        console.log(`New student added to the database`);
        res.status(201).json({message: 'New student registered successfully!'});
    } catch (error) {
        console.log('Error in registering a new student');
        if (error.code == 11000) {
            res.status(409).json({ message: "Email already exists!" })
        } else {
            res.status(500).json({ message: error.message });
        };
    }
});

app.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    // console.log(email);
    // console.log(password);
    try{
        const user = await Student.findOne({email});
        if(!user){
            return res.status(401).json({message:'User not found'})
        }
        if (password!==user.password) {
            return res.status(401).json({message:"Invalid Password"})
        }
        res.status(200).json({user,message:"Found the student"});
    }catch(e){
        res.status(400).json({message: e.message});
    }
});

app.get('/allstudents', async(req, res)=>{
    try{
        let students = await Student.find()
                                .sort([['name','ascending']]);
        
        res.status(200).json(students);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

app.put('/update', async (req, res) => {
    try {
      // Extract required data from request body
      const { email, name, password } = req.body;
  
      // Check if required fields are provided
      if (!email || !name || !password) {
        return res.status(400).json({ success: false, message: 'Email, Name, and Password are required fields' });
      }
  
      // Create an object to hold the fields to update
      const updateFields = {};
      updateFields.name = name;
      updateFields.password = password;
      // Add other fields to updateFields object if they are provided
      if (req.body.githubURL) updateFields.githubURL = req.body.githubURL;
      if (req.body.linkedinURL) updateFields.linkedinURL = req.body.linkedinURL;
      if (req.body.twitterURL) updateFields.twitterURL = req.body.twitterURL;
      if (req.body.websiteURL) updateFields.websiteURL = req.body.websiteURL;
      if (req.body.bio) updateFields.bio = req.body.bio;
      if (req.body.profilePic) updateFields.profilePic = req.body.profilePic;
      if (req.body.fieldOfInterest) updateFields.fieldOfInterest = req.body.fieldOfInterest;
      if (req.body.seeking) updateFields.seeking = req.body.seeking;
      if (req.body.techStack) updateFields.techStack = req.body.techStack;
      if(req.body.location) updateFields.location = req.body.location;

    //   console.log("updateFields", updateFields);
  
      // Find user by email and update fields
      const updatedUser = await Student.findOneAndUpdate(
        { email: email }, // Find user by email
        { $set: updateFields },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // If user is updated successfully, return success message
      res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

app.get('/getcurrentuser', async(req,res)=>{
    const email = req.query.email;
    const user = await Student.findOne({email : email});
    if(!user){
        return res.status(401).json({message: "No such user"});
    }else{
       return res.status(200).json(user);
    }
});

app.delete('/deleteuser', async(req,res)=>{
    try{
        let query={email : req.query.email};
        let user = await Student.findOneAndDelete(query);
        if(!user){
            return res.status(400).json({message:"The user cannot be deleted."});
        } else {
          return res.status(200).json({message:"The user has been deleted."})
        }
        
    }catch(err){
        console.error("Error deleting user:", err);
        return res.status(500).json({message:"An error occurred while deleting the user."});
    }
});

app.listen(PORT, ()=>{
    console.log("Backend is running on PORT: " + PORT);
});

