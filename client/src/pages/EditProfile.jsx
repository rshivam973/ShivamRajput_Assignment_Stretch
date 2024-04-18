import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const EditProfile = () => {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [location, setLocation] = useState('');
  const [fieldOfInterest, setFieldOfInterest] = useState('');
  const [seeking, setSeeking] = useState('');

  const [githubURL, setGithubURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [twitterURL, setTwitterURL] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleTechStackChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setTechStack(selectedOptions);
  };

  const handleSubmit = async() => {

    if (!email || !name || !password) {
        toast.warning("Email, Name, and Password are required fields");
        return;
      }
    if (password !== confirmPassword) {
        toast.warning("Password and Confirm Password do not match");
        return;
      }

    const formData = {
      name,
      email,
      password,
      confirmPassword,
      githubURL,
      linkedinURL,
      twitterURL,
      websiteURL,
      bio,
      profilePic,
      fieldOfInterest,
      seeking,
      techStack,
      location
    };

    Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          delete formData[key];
        }
      });
    
    const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData })
    });
    if (!response.ok){
        toast.error(await response.text());
        return;
    }
    const  data = await response.json();
    navigate('/');
    toast.success(data.message);
    localStorage.setItem('user', JSON.stringify(formData));
  };

  const handleDelete = async()=>{
    const userData = await localStorage.getItem('user');
    const user = await  JSON.parse(userData);
    const email = user.email;
    const res = await fetch(`http://localhost:5000/deleteuser?email=${email}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        },
    });
    const result= await res.json();
    if(res.status !==200){
        toast.error(result);
        return;
    }
    localStorage.clear();
    navigate('/');
    toast.success("The user has been deleted");
  };

  useEffect(()=>{
        const getCurrentUserInfo = async()=>{
        const userData = await localStorage.getItem('user');
        const user = await  JSON.parse(userData);
        if(!user || user===null){
        navigate('/');
        return;
        }
        console.log("User is : ", user);
        let email = user.email;
        console.log("email: ", email);
        try {
            const  res = await fetch(`http://localhost:5000/getcurrentuser?email=${email}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            });
            if(res.status !==200){
                toast.error("Failed to load details of the user");
            }
            const response = await res.json();
            console.log("response: "+JSON.stringify(response));
            setName(response.name);
            setEmail(response.email);
            setPassword(response.password);
            setGithubURL(response.githubURL);
            setLinkedinURL(response.linkedinURL);
            setTwitterURL(response.twitterURL);
            setFieldOfInterest(...response.fieldOfInterest);
            setBio(response.bio);
            setWebsiteURL(response.websiteURL);
            setTechStack(...response.techStack);
            setLocation(response.location);

        } catch (error) {
            console.log(`Error ${error}`);
            toast.error(error.message);
        }
    }

    getCurrentUserInfo();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Part (Name, Email, Password, Confirm Password, Github, Website, Bio, Location) */}
            <div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="name" className="block font-medium text-gray-700 p-3 text-md">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="email" className="block text-md font-medium text-gray-700 p-3">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="password" className="block text-md font-medium text-gray-700 p-3">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="confirmPassword" className="block text-md font-medium text-gray-700 p-3">Re-enter Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="github" className="block text-md font-medium text-gray-700 p-3">Github</label>
                <input type="text" name="github" id="github" value={githubURL} onChange={(e) => setGithubURL(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="website" className="block text-md font-medium text-gray-700 p-3">Website</label>
                <input type="text" name="website" id="website" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="bio" className="block text-md font-medium text-gray-700 p-3">Bio</label>
                <textarea id="bio" name="bio" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"></textarea>
              </div>
              {/* Add other input fields and labels */}
            </div>
            {/* Right Part (Upload Profile Pic, Field Of Interest, Seeking, TechStack, Delete Profile, Save Changes) */}
            <div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">Upload Profile Pic (URL)</label>
                <input type="text" name="profilePic" id="profilePic" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="github" className="block text-md font-medium text-gray-700 p-3">LinkedIn</label>
                <input type="text" name="github" id="github" value={linkedinURL} onChange={(e) => setLinkedinURL(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="github" className="block text-md font-medium text-gray-700 p-3">Twitter</label>
                <input type="text" name="github" id="github" value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">Field Of Interest</label>
                <select id="fieldOfInterest" name="fieldOfInterest" value={fieldOfInterest} onChange={(e) => setFieldOfInterest(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Select Field Of Interest</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Data Science">Data Science</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-4 flex flex-row items-center gap-2">
                <label htmlFor="seeking" className="block text-sm font-medium text-gray-700">Seeking</label>
                <select id="seeking" name="seeking" value={seeking} onChange={(e) => setSeeking(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Select Seeking</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  <option value="FT Position">FT Position</option>
                  <option value="Not Seeking">Not Seeking</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Tech Stack</label>
                <select id="techStack" name="techStack" multiple size="4" value={techStack} onChange={handleTechStackChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  {/* Add your tech stack options */}
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="JavaScript">JavaScript</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-4 flex flex-row">
                <label htmlFor="github" className="block text-md font-medium text-gray-700 p-3">Location</label>
                <input type="text" name="github" id="github" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-400 rounded-md" />
              </div>
            </div>
          </div>
          {/* Save Changes button */}
          <div className="mt-8 flex flex-row justify-end gap-3">
            <button type="button" onClick={handleSubmit} className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save Changes
            </button>
            <button type="button" onClick={handleDelete} className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
