1.根据输入的值请求搜索列表
https://autumnfish.cn/search?keywords=输入值
2.请求MV地址
"https://autumnfish.cn/mv/url?id="
3.请求歌曲评论
如请求id为1330348068的歌曲评论
https://api.imjad.cn/cloudmusic/?type=comments&id=1330348068
https://h5static.kuwo.cn/www/kw-www/img/f1b1f82.png
4.请求歌曲url
根据搜索列表中的tracks里的歌单的歌曲id去获取歌曲的url

如：请求id为4974214889的歌曲下载地址
https://api.imjad.cn/cloudmusic/?type=song&id=4974214889
如果你需要音质更高的资源，可以再尾部再跟上参数 br,br的取值决定音质，大概是这样
https://api.imjad.cn/cloudmusic/?type=song&id=28012031&br=320000
5.请求推荐歌单
http://musicapi.leanapp.cn/top/playlist