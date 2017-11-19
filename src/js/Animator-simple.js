import PubSub from 'pubsub-js';
import {TimelineMax} from 'gsap';

PubSub.subscribe( 'gotoSlide', function(msg, data) {


  let currentSlide = $('[data-slide='+data.from+']');
  let newSlide = $('[data-slide='+data.to+']');
  let elements = currentSlide.find('[data-stagger]');
  let newElements = newSlide.find('[data-stagger]');
  
  new TimelineMax()
  	.set(currentSlide,{zIndex:20})
  	.set(newSlide,{zIndex:30});


  let tl = new TimelineMax();
  tl
  	.staggerFromTo(elements,0.3,{y:0,opacity:1},{y:-20,opacity:0},0.1)
  	.fromTo(currentSlide,0.5,{y:'0%',opacity: 1},{y:'-100%',opacity: 0})
  	.fromTo(newSlide,0.5,{y:'100%',opacity: 1},{y:'0%',opacity: 1},0)
  	.staggerFromTo(newElements,0.3,{y:20,opacity:0},{y:0,opacity:1},0.1,'-=0.4');

});
