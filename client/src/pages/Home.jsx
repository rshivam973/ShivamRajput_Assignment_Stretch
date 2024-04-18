import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
// import { usersData } from '../utils/dummyData'
import Profilecard from '../components/Profilecard'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [students, setStudents] = useState([]);
  const [selectForSearch, setSelectForSearch] = useState('name');
  const [searchValue, setSearchValue] = useState('');

  const sortStudents = ()=>{

    if (!searchValue) {
      return students;
    }

    return students.filter(student=>{
      if (selectForSearch==='name'){
        return student.name.toLowerCase().includes(searchValue.toLowerCase())
      } else if (selectForSearch ==='bio'){
        return student.bio.toLowerCase().includes(searchValue.toLowerCase())
      }else if(selectForSearch==='techStack'){
        return student.techStack.some(stack => stack.toLowerCase().includes(searchValue.toLowerCase()));
      }
    });
  }

  useEffect(()=>{
    console.log("backend url: ", BACKEND_URL);

    const fetchStudents = async()=>{
      const data = await fetch(`${BACKEND_URL}/allstudents`);
      const res = await data.json();
      
      // console.log(res);
      setStudents(res);
    }

    fetchStudents();
    
  } ,[]);

  return (
    <div>
      <Navbar/>
      <div className="flex flex-row justify-start ml-10 mt-5">
        <div className="flex justify-center items-center">
          <select className="bg-gray-300 p-2 mr-2 ml-2 border border-black rounded-lg" id="dropdown" value={selectForSearch} onChange={(e)=> setSelectForSearch(e.target.value)}>
          <option value="name">Name</option>
          <option value="techStack">Tech Stack</option>
          <option value="bio">Bio</option>
        </select>
        </div>
        <input type="text" placeholder="Keyword Search" value={searchValue} onChange={e=>setSearchValue(e.target.value)} className="border border-gray-600 p-2 rounded-lg w-full md:w-1/4" />
        <button className="p-2 pl-4 pr-4 bg-blue-500 rounded-xl ml-2">Search</button>
      </div>
      {
        sortStudents().map((user,index)=>(
          <Profilecard data={user} key={index} />
        ))
      }
    </div>
  )
}

export default Home