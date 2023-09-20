const header = document.querySelector(".header");
const headerLogo = document.querySelector(".header__logo");
const headerBlock = document.querySelector(".header__top--block");
const headerBtn = document.querySelector(".header__btn");
const menu = document.querySelector(".header__menu");
const menuClose = document.querySelector(".header__menu--close");
const menuBlock = document.querySelector(".header__navbar");
const headerMenuMob = document.querySelector('.header__mobile--menu');
const menuCloseMob = document.querySelector('.header__mobile--back');
const menuItems = document.querySelectorAll(".navbar__item");
const circleTop = document.querySelector(".header__circle--top");
const slide1 = document.querySelector(".slide-1");
const slide2 = document.querySelector(".slide-2");
const slide3 = document.querySelector(".slide-3");
const headerCircles = document.querySelectorAll('.header__circle');
const headerElem = document.querySelector('.header__elem');
const headerSquare = document.querySelector('.header__square');
const aboutBtn = document.querySelector('.about__idea--btn');
let isScrolling = true;

menu.addEventListener("click", () => {
  menu.classList.add("hover");
  menuClose.classList.add("active");
  menuBlock.classList.add("active");
  circleTop.classList.add("hover");
});

headerMenuMob.addEventListener("click", () => {
  headerMenuMob.classList.add("hover");
  menuCloseMob.classList.add("active");
  menuBlock.classList.add("active");
});

menuClose.addEventListener("click", () => {
  menu.classList.remove("hover");
  menuClose.classList.remove("active");
  menuBlock.classList.remove("active");
  circleTop.classList.remove("hover");
});

menuCloseMob.addEventListener("click", () => {
  headerMenuMob.classList.remove("hover");
  menuCloseMob.classList.remove("active");
  menuBlock.classList.remove("active");
})

menuItems.forEach(item => {
  item.addEventListener('click', () => {
      menu.classList.remove("hover");
      menuCloseMob.classList.remove("active");
      headerMenuMob.classList.remove("hover");
      menuClose.classList.remove("active");
      menuBlock.classList.remove("active");
  });
});

//slider
const $window = $(window);
const $holder = $("#slides-holder");
const $slides = $holder.find(".slide-main");
const $allSlides = $holder.find("> div");
const $slide8 = $("#slide-8");
const $slide9 = $("#slide-9");
const $slide10 = $("#slide-10");

$slides.each(function(index, element) {
  $(element).css("z-index", 5 + index).after($("<div />", {
    class: "slide-fake-height"
  }));
  $slide8.css("z-index", 5 + index);
  $slide9.css("z-index", 5 + index);
  $slide10.css("z-index", 5 + index);
});


const $fakeHeights = $slides.next(".slide-fake-height");
const $toReize = $holder.add($slides).add($fakeHeights);
const scrollFixer = 3;


$window.on("resize", onResize).resize();

$window.on("scroll", function(event) {
  ( !! window.requestAnimationFrame) ? requestAnimationFrame(onScroll) : onScroll();
});

function onResize(event) {
  $toReize.css({
    height: $window.innerHeight() + "px"
  });
  onScroll();
}

function onScroll(event) {
  const scrollTop = Math.abs($window.scrollTop()) + scrollFixer;
  let heightVW = window.innerHeight;
  let generalScrollHeight = 7 * heightVW;
  let slideActive8 = generalScrollHeight + 1300;
  let slideActive9 = slideActive8 + 2648;

  if(slide1.classList.contains('fixed')) {
    headerCircles.forEach(circle => {
      circle.style.transform = `translateY(-${0.3 * scrollTop}px)`;
    });
    headerElem.style.transform = `translateY(-${0.15 * scrollTop}px)`;
    headerSquare.style.transform = `translateY(-${0.15 * scrollTop}px)`;
  }


  if((scrollTop - 5) >= generalScrollHeight) { 
    console.log('NEXT');
    isScrolling = false;
    headerBtn.classList.remove('inverce');
    if((scrollTop - 5) <= slideActive8) {
      menu.classList.remove('color');
      menuClose.classList.remove('color');
      headerLogo.classList.remove('inverce');
    } else if((scrollTop - 5) <= slideActive9) {
      menu.classList.add('color');
      headerLogo.classList.add('inverce');
      menuClose.classList.add('color');
      let differentScrollHeight9 = slideActive9 - scrollTop;
      aboutBtn.style.transform = `translateY(${0.092 * differentScrollHeight9}px)`;
    }  
  } else {
    isScrolling = true;
  }

  if (isScrolling) {
    $slides.each(function(index, element) {
      const $slide = $(element);
      const $fakeHeight = $slide.next(".slide-fake-height");
      const slideTop = $slide.hasClass("fixed") ? $fakeHeight.offset().top : $slide.offset().top;
      if (slideTop < (scrollTop - 5) ) {
        $slide.addClass("fixed");
        $fakeHeight.addClass("visible");
        if ($slide.attr('id') !== 'slide-1') {
          menu.classList.add('color');
          menuClose.classList.add('color');
        } else {
          menu.classList.contains('color') && menu.classList.remove('color');
          menuClose.classList.contains('color') && menuClose.classList.remove('color');
        }
      } else {
        $slide.removeClass("fixed");
        $fakeHeight.removeClass("visible");
      }
    });
  }
}

//btn mouse move
const block = document.querySelector('.header__top');

headerBtn.addEventListener('mousemove', (e) => {
  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;
  headerBtn.style.transform = 'translate3d(-' + x * 0.2 + 'em, -' + y * 0.9 + 'em, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'; 
  headerBtn.style.willChange = 'transform';
  headerBtn.style.transformStyle = 'preserve-3d';
});

headerBtn.addEventListener('mouseout', () => {
  headerBtn.style.transform = 'translate3d(0, 0, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
});