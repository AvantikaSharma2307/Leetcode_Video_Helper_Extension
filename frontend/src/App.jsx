import './App.css'
import {useEffect,useState} from "react";


function App() {
  const [title,setTitle]=useState("");
  const [videos,setVideos]=useState([]);


  useEffect(()=>{
    chrome.storage.local.get("problemTitle",(data)=>{
      if(data.problemTitle){
        setTitle(data.problemTitle);
        chrome.runtime.sendMessage(
          {
            type:"GET_VIDEOS",
            title:data.problemTitle
          },
          (response)=>setVideos(response.videos)
        );
      }
    });

  },[]);

  return (
    <>
     <div>
      <h1>{title||"Opne a leetcode Problem"}</h1>
      {
        videos.map((video)=>(
          <div key={video.url} className="video-card">
            <a href={video.url} target="_blank" rel="noreferrer">
              <img src={video.thumbnail} alt={video.title} />
              <p>{video.title}</p>
            </a>
          </div>
        ))
      }
     </div>
    </>
  )
}

export default App
