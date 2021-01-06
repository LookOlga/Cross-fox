'use strict';

window.addEventListener('DOMContentLoaded', () => {
    
    class menuBurger {
        constructor(selector, menuItemsParent) {
            this.selector = selector;
            this.menuItemsParent = menuItemsParent;
        }

        init() {
            this.selector = document.querySelector(this.selector);
            this.menuItemsParent = document.querySelector(this.menuItemsParent);
            this.body = document.querySelector('body');
            

            this.selector.addEventListener('click', () => {
                this.body.classList.toggle('menu-active');
            })

            this.menuItemsParent.addEventListener('click', (e) => {
                let target = e.target;

                if(target.tagName === 'A') {
                    this.body.classList.toggle('menu-active');
                }
            })

        }
        
    }

    new menuBurger('._btn-menu', '._main-menu-items').init();



    function Parallax(selector) {

        this.selector = selector;
        this.init();
    }

    Parallax.prototype.init = function() {
        if(typeof(this.selector) === 'string') {
            this.elements = document.querySelectorAll(this.selector);
        }
        
        this.elements = Array.from(this.elements);
        this.elemOptions = this.elements.map((elem) => {
            
            return {
                el: elem,
                depth : +elem.getAttribute('data-depth'),
                height : elem.offsetHeight,
                top : elem.getBoundingClientRect().top,
                transform: getComputedStyle(elem).transform,
                data_attr: {
                    data_start: +elem.getAttribute('data-start'),
                    data_end: +elem.getAttribute('data-end')
                }
            }
            
        })
        console.log(this.elemOptions);
    }

   

    Parallax.prototype.run = function(offsetY) {
        let height = window.innerHeight * 0.9;
        for(let item of this.elemOptions){
            item.top = item.el.getBoundingClientRect().top + offsetY;
            let start = item.top;
        
            let shift = start - offsetY;
            if(shift < -item.height || shift > height) continue;

            let percent = shift / height;
            let diap = item.data_attr.data_end - item.data_attr.data_start;
            let trans = percent * diap + item.data_attr.data_start;
            
            item.el.style.transform =` translateX(${trans}px) translateY(${trans}px) `;
            item.el.style.transform += item.transform;
        }
    }

    let paralax = new Parallax('.parallax');
    window.addEventListener('scroll',  () => {paralax.run(pageYOffset);
    });
})


