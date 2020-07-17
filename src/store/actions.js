import axios from "axios"
async function HTTPgetPlaylist(payload){
    await axios.get("/data.json").then(res=>{
      console.log(res)
      payload = res.data
    })
    return payload;
  }
  async function HTTPgetHistorylist(payload){
    await axios.get("/data2.json").then(res=>{
      console.log(res)
      payload = res.data
    })
    return payload;
  }
  async function HTTPgetSearchlist(keywords){
    let payload;
    await axios.get("https://autumnfish.cn/search?keywords="+keywords).then(res=>{
      console.log(res)
      payload = res.data.result.songs
    })
    return payload;
  }
  async function HTTPgetSongUrl(id){
    let url;
    await axios.get("https://autumnfish.cn/song/url?id=" + id).then(res=>{
      console.log(res,"url")
      url = res
    })
    return url
  }
  async function HTTTPgetSongComments(id){
    let comments;
    await axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(res=>{
      comments = res.data.hotComments;
      console.log(comments,"评论")

    })
    return comments
  }
  async function HTTPgetSongImg(id){
    let img;
    await axios.get("https://autumnfish.cn/song/detail?ids=" + id).then(res=>{
      console.log(res.data.songs[0].al.picUrl,"图片")
      img = res.data.songs[0].al.picUrl;
    });
    return img
  }
  async function HTTPgetSongMv(mvid){
    let mv;
    await axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(res=>{
      console.log(res,"mv")
      mv = res.data.data.url
      
    })
    return mv
  }
  export const getMusiclist = ({commit,dispatch})=>{
    let playlist = localStorage.playlist;
    if(playlist){
      return commit("setPlaylist",JSON.parse(playlist));
    }
    HTTPgetPlaylist([]).then(res=>{ 
      
      console.log(res,122)
      commit("setPlaylist",res)
    })
  } 
    export const getHistorylist = ({commit,dispatch})=>{
      let historylist = localStorage.historylist;
      if(historylist){
        return commit("setHistorylist",JSON.parse(historylist));
      }
      HTTPgetHistorylist([]).then(res=>{ 
        
        commit("setHistorylist",res)
      })
}
export const getSearchlist = ({commit,dispatch},keywords)=>{
  return HTTPgetSearchlist(keywords).then(res=>{ 
    
    commit("setSearchlist",res)
  })
}
export const getSongUrl = ({commit,dispatch},id)=>{
  return HTTPgetSongUrl(id).then(res=>{ 
    console.log("url回來了",res.data.data[0].url)
    commit("setCurrentSongurl",res.data.data[0].url)
  })
 
}
export const getSongComments = ({commit,dispatch},id)=>{
  HTTTPgetSongComments(id).then(async res=>{
      commit('setCurrentSongComments',res)
    })
  }
export const getSongImg = ({commit,dispatch},id)=>{
  HTTPgetSongImg(id).then(res=>{
    commit("setSongImg",res)
  })
}
export const getMv = ({commit,dispatch},mvid)=>{
 return HTTPgetSongMv(mvid).then(res=>{
    commit("setSongMv",res)
  })
}