window.addEventListener('scroll', scrollFunc);

function scrollFunc() {
    var windowScroll = this.scrollY; 
    
    var $back = document.getElementById('back-layer');
    $back.style.transform = 'translateY(-' + windowScroll/200 + '%) scale(1.1)';
    
    var $middle = document.getElementById('middle-layer');
    $middle.style.transform = 'translateY(-' + windowScroll/300 + '%) scale(1.5)';
    
    var $rightback = document.getElementById('rightback-layer');
    $rightback.style.transform = 'translateY(-' + windowScroll/150 + '%)';

    var $rightfront = document.getElementById('rightfront-layer');
    $rightfront.style.transform = 'translateY(-' + windowScroll/400 + '%) scale(1.6)';
    
    // var $front = document.getElementById('front-layer');
    // $front.style.transform = 'translateY(-' + windowScroll/1000 + '%)';
}