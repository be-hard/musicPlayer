const preload = (imaglist) =>{
    imaglist.forEach(item => {
        let img = new Image();
         img.src = item;
         
     });
 
}
export default preload