'use strict';
window.addEventListener('load', onResize);
window.addEventListener('resize', onResize);



function onResize(){
 
    let isMobile = device.mobile() || (device.tablet() && device.portrait()) || window.innerWidth < 768;

     document.documentElement.classList.add(isMobile ? 'mobile': 'desktop');
     document.documentElement.classList.remove(!isMobile ? 'mobile': 'desktop');
}