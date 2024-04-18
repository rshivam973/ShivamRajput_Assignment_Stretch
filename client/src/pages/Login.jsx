import React, {useState} from 'react'
import { signInStart, signInSuccess, signInFailure } from '../Redux/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const {loading, error} = useSelector((state) => state.user);
const navigate = useNavigate();

const handleSubmit = async(e) => { 
  e.preventDefault();
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.status!==200) {
      dispatch(signInFailure(data));
      toast.error(data.message);
      return;
    }
    dispatch(signInSuccess(data.user));
    navigate('/');
  } catch (err) {
    dispatch(signInFailure());
    toast.error(err.message);
    console.error("error: "+err);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div><br/>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <p>Don't have an Account?</p>
          <p className="cursor-pointer hover:underline ml-1" onClick={()=>navigate('/signup')}>Click Here to Register</p>
        </div>
      </div>
    </div>
  )
}

export default Login