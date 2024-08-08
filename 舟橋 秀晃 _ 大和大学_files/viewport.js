var getDevice = (function(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        document.write('<meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1.0" id="viewport">');
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        document.write('<meta name="viewport" content="width=1260px" id="viewport">');
    //iPadOS
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Macintosh') > 0 && 'ontouchend' in document){
        document.write('<meta name="viewport" content="width=1260px" id="viewport">');
    }else{
    document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0">');
  }
})();
