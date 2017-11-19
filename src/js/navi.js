import PubSub from 'pubsub-js';

PubSub.subscribe( 'gotoSlide', function(msg, data) {
  $('.pagination a').removeClass('is-active');
  	$('[data-gotoslide="'+data.to+'"]').addClass('is-active');
});
