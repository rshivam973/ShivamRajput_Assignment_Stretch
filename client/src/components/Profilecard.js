import React from 'react'
import "../css/Profilecard.css";

const Profilecard = ({data, key}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between ml-10 mr-10 p-5 border-gray-600 rounded-lg shadow-xl outline-1" id={key}>
        <div className="flex">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              className="h-28"
              alt="Flowbite Logo"
            />
            <div className="flex flex-col ml-2">
                <p className="font-semibold text-lg">{data.name}</p>
                <p>{data.bio}</p>
                <div className="flex flex-row gap-1 skills">
                    {data.techStack.map((tech,index)=>(
                        <div className="mr-1">
                            <p className="tech text-sm">{tech}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
            {/* <button className="rounded-sm p-2 border border-gray-500">Delete</button> */}
            <button className="bg-orange-500 rounded-sm p-2">DM Student</button>
            <button className="rounded-sm p-2 border border-gray-500">View Profile</button>
        </div>
    </div>
  )
}

export default Profilecard;