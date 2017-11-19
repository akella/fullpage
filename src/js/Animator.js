import PubSub from 'pubsub-js';
import {TimelineMax} from 'gsap';
import waves from './waves';

PubSub.subscribe( 'gotoSlide', function(msg, data) {

  console.log(msg,data);

  let currentSlide = $('[data-slide='+data.from+']');
  let newSlide = $('[data-slide='+data.to+']');
  let elements = currentSlide.find('[data-stagger]');
  let newElements = newSlide.find('[data-stagger]');
  // set for the start
  new TimelineMax()
  	.set(currentSlide,{zIndex:20})
  	.set(newSlide,{zIndex:350});

  // playing with background
  let newColor = newSlide.css('background-color');
  newSlide.css('background-color','transparent');
  $('.waves__03').attr('fill',newColor);
  $('.overlay').css('background-color',newColor);

  // reset at the end
  let tl = new TimelineMax({onComplete:() => {
  	new TimelineMax()
  		.set(newSlide,{zIndex:20,backgroundColor:newColor});
  }});

  var my = tl

  	.fromTo(elements,0.3,{y:0,opacity:1},{y:20,opacity:0})
  	.add(waves(),0.2)
  	.fromTo(currentSlide,0.5,{opacity: 1},{opacity: 0},0)
  	.set(newSlide,{opacity: 1},'-=2.4')
  	.staggerFromTo(newElements,0.2,{y:-20,opacity:0},{y:0,opacity:1},0.1,'-=.7')
  	;

});
