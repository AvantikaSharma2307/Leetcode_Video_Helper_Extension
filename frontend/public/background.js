import axios from "axios";
chrome.runtime.onMessage.addListener((msg,sendResponse)=>{
    if(msg.type==="PROBLEM_FOUND"){
        chrome.storage.local.set({
            programTitle:msg.title
        });
    }

    if(msg.type==="GET_VIDEOS"){

        const title=msg.title;
        try{
        const result=axios.get(`http://localhost:3000/search?q=${encodeURIComponent(title)}`)


        const videos=result.map(video=>({
          title:video.title,
          url:video.url,
          thumbnail:video.thumbnail
        }));

        sendResponse({videos});
    }catch(err){
        console.error(err);
        sendResponse({videos:[]});
    }
}

    return true; 
});