
  export const setPlaylist = (state,list)=>{
        state.songs.playlist = list;
    };
    export const pushPlaylist = (state,song)=>{
        state.songs.playlist.push(song)
    };
    export const setPlaylistOpen = (state,status)=>{
        state.songs.playlistOpen = status;
    };
    export const setPlayState = (state,status)=>{
        state.songs.playState = status;
    };
    export const setCurrentIndex = (state,currentIndex)=>{
        state.songs.currentIndex = currentIndex;
    };
    export const setCurrentSong = (state,currentSong)=>{
        state.songs.currentSong = currentSong;
    };
    export const setPlayMode = (state,playMode)=>{
        state.songs.playMode = playMode;
    }
    export const setAudio = (state,audio)=>{
        state.audio = audio
    }
    export const setHistorylist = (state,list)=>{
        state.songs.historylist = list;
    };
    export const pushHistorylist = (state,song)=>{
        state.songs.historylist.push(song)
    };
    export const setSearchlist = (state,list)=>{
        state.songs.searchlist = list;
    };
    export const setCurrentSongurl = (state,url)=>{
        state.songs.currentUrl = url;
    };
    export const setCurrentSongComments = (state,comments)=>{

        state.songs.currentSongComments = comments;
    };
    export const setSongImg = (state,img)=>{
        state.songs.songImg = img
    }
    export const setSongMv = (state,mv)=>{
        state.songs.songMv = mv
    }
    export const setEnterMv = (state,flag)=>{
        state.enterMv = flag
    }
    export const setMvControls = (state,mvControls)=>{
        state.mvControls.refs = mvControls
    }
    export const setMvCurTime = (state,mvCurTime)=>{
        state.mvControls.curTime = mvCurTime
    }
    export const setMvDuration = (state,mvDuration)=>{
        state.mvControls.duration = mvDuration
    }
    export const setMvVolume = (state,mvVolume)=>{
        state.mvControls.mvVolume = mvVolume
    }


