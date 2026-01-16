import { useState } from "react";

export default function GithubProfile(){

    const [username, setUsername] =useState("")
    const [error, setError] = useState("")
    const [user,setUser]    = useState(null)  
    async function fetchProfile(name) {
        if(!name.trim()) {
            setError("Please, you must enter a username!")
        } else {
            setError("enter correct username")
            return
        }
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
        <div className="min-h-screen bg-white flex item-center justify-center p-6">
            <div className="w-full max-w-4xl bg-gray-600 rounded-xl shawdow-2xl border border-[#333]" p-8>
                {/* Header */}
                <h1 className="text-3xl text-center mb-8 font-bold text-[#4fc1ff]">Github profile Explorer</h1>

                {/* Search */}
                <div className="bg-[#1e1e1e] flex flex-col sm:flex-row max-w-xl mx-auto rounded-lg overflow-hidden border border-[#333]">
                    <input 
                    type="text"
                    value={username}
                    className="flex-1 px-4 py-3 text-center bg-transparent text-[#d4d4d4] outline-none placeholder-[#6a9955]"
                    placeholder="Enter github username" 
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchProfile(username)}/>
                    <button
                    onClick={() => fetchProfile(username)}
                    className="bg-[#007acc] text-white px-10 py-2 font-semibold hover:bg-[#0e33ff] transition">Search</button>
                </div>

                <h2 className="font-semibold text-2xl text-center mt-8">{error}</h2>

                {/* Profile */}
                {user && (
                <div className="mt-10 bg-[#1e1e1e] border border-[#333] rounded-xl p-8">

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <img
                        src={user.avatar_url}
                        className="w-32 h-32 rounded-full ring-2 ring-[#007acc]"
                        />

                        <div className="text-center md:text-left flex-1">
                            <h2
                            className="text-2xl font-bold text-[#4fc1ff] cursor-pointer hover:underline"
                            onClick={() =>
                                window.open(`https://github.com/${user.login}`, "_blank")
                            }
                            >
                            @{user.login}
                            </h2>

                            <p className="text-[#9cdcfe]">{user.name}</p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6">
                                <Stat label="Followers" value={user.followers} />
                                <Stat label="Following" value={user.following} />
                                <Stat label="Repos" value={user.public_repos} />
                                <Stat label="Gists" value={user.public_gists} />
                            </div>
                        </div>
                    </div>

       
                </div>
                )}

                
                
            </div>
        </div>
    )
}

function Stat({ label, value }) {
  return (
    <div className=" rounded-lg p-3 text-center">
    <div className="text-lg font-bold text-[#4fc1ff]">
      {value}
    </div>
    <div className="text-xs text-[#9cdcfe]">{label}</div>
    </div>
  );
  }
