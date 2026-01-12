import { useState } from "react";

export default function GithubProfile(){
    /*
        div{
            display: flex;
            flex-direction: column
            align-items:center;     
        }
    */

    const [username, setUserName] =useState("Samm24TT")
    const [error, setError] = useState("")
    const [user,setUser]    = useState(null)  //username = "ferhatgnits" , setUserName(e.target.value)
// user = null, setUser()
    async function fetchProfile(name) {
        try{
            //fetch(url/api)
            const res = await fetch(`https://api.github.com/users/${name}`) 
            if(!res.ok){
                if(res.status === 404) throw new error("User not found")
                if(res.status === 403) throw new error("Forbidden")
                throw new error("Something went wrong")
            }  

            const data = await res.json(); 
            setUser(data)

        }catch(err){ 
            setError(err.message)
        }
    }

    return(
        <>
            <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
                <header>
                    <h1 className="font-bold text-3xl mb-6">GitHub Profile Explore</h1>
                    <div className="flex shadow rounded">
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e)=>setUserName(e.target.value)}
                            className="px-4 py-3 flex-1" placeholder="Enter Github Username..."/> 
                        
                        <button 
                            className="bg-black text-white px-6 font-semibold hover:bg-blue-800 "
                            onClick={()=>fetchProfile(username)}
                        >Search</button>
                    </div>
                </header>
                <main>
                 {user && <section className="max-w-3xl w-full bg-white rounded shadow p-8 mt-6">
         
                  <img src={user.avatar_url} alt="avatar" className="w-40 h-40 rounded-full border" />
                  <h2 className="text-2xl font-bold cursor-pointer hover:underline" onClick={()=>window.open(`${user.html_url}`, "_blank")}>@{user.login}</h2>
                  <h2>{user.name}</h2>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <Stat value={user.followers} label="Followers" />
                    <Stat value={user.following} label="Following" />
                    <Stat value={user.public_repos} label="repos" />
                    <Stat value={user.following} label="Following" />
                    

                  </div>
                 </section> }
                </main>
            </div>
        </>
    )
}

function Stat({value,label}) {
  return (
    <div>
      <span className="text-blue-500">{value} </span> 
      <span className="text-gray-500">{label}</span>
    </div>
  )
}
