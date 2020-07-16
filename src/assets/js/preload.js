const preload = (imaglist) =>{
    imaglist.forEach(item => {
       let img = new Image();
        img.src = item;
        img.onload = ()=>{
            console.log(img.src)
        }
    });

}
export default preload