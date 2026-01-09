import { useState } from "react";

export default function GithubProfile() {

   const [username, setUsername] = useState('Samm24TT')

   return (
        <>
        <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
         <header>
            <h1 className="font-bold text-3xl text-orange-300 mb-6">GitHub Profile Explore</h1>
            <div className="flex shadow rounded">
               <input value={username} 
               onChange={()=>setUsername(e.target.value)}
               type="text" className="px-4 py-3 flex-1" placeholder="Enter github username.."/>
               <button className="bg-blue-400 px-6 font-semibold hover:bg-blue-600">Search</button>
            </div>
         </header>
        </div>
        </>
   )
}