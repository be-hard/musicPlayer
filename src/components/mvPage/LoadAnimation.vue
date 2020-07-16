<template>
    <div class="smallBox num1">
            <div class="eye">
                <div class="eyeball"></div>
            </div>
            <div class="mouse"></div>
        </div>
</template>
<script>
export default {
    name:"loadAnimation"
}
</script>
<style lang="less">
.smallBox{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 100px;
    border-radius: 20px;
    background-color: rgb(43, 159, 226);
    animation: jump 0.8s linear infinite alternate ;   
    // &.over{
    //      animation: over 0.8s;
    // }
}
.smallBox::before{
    content: "";
    position: absolute;
    top: -14px;
    left: 50%; 
    width: 20%;
    transform: translate3d(-50%,0,0) rotate(45deg);
    height: 10px;
    background-color: #fff;
}
.smallBox::after{
    content: "";
    position: absolute;
    top: -14px;
    left: 50%; 
    transform: translate3d(-7%,0,0) rotate(-45deg);
    width: 20%;
    height: 10px;
    background-color: #fff;
}
.smallBox .eye{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 44px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
}
.smallBox .eye .eyeball{
    width: 22px;
    height: 20px;
    border-radius: 50%;
    background-color: #e55A54;
    animation: eyemove 1s linear alternate infinite;
}
.smallBox .mouse{
    width: 33px;
    height: 12px;
    border-radius: 10px;
    background-color:#e55A54;
}
@keyframes eyemove{
    0%{
        transform: translate3d(0,0,0);
    }
    10%{
        transform: translate3d(0,0,0);
    }
    90%{
        transform: translate3d(22px,0,0);
    }
    100%{
        transform: translate3d(22px,0,0);
    }
}
@keyframes jump{
    0%{
        transform: translate3d(0,0,0);
        box-shadow: 0 0px 20px 0 rgba(0,0,0,0.2);
    }
    50%{
        transform: translate3d(0,0px,0);
        box-shadow: 0 0px 20px 0 rgba(0,0,0,0.2);
    }
    100%{
        transform: translate3d(0,-50px,0);
        box-shadow: 0 150px 20px 0 rgba(0,0,0,0.2);
    }   
    
}
@keyframes over{
    0%{
        transform: scale(1) rotate(0);
    }
    100%{
        transform: scale(0.01) rotate(360deg);

    }
}
</style>