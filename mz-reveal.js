(function(){
  function reveal(el){el.setAttribute('data-mz-in','1');try{io.unobserve(el);}catch(e){}}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)reveal(e.target);});},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  function scan(){
    document.querySelectorAll('.mz-reveal:not([data-mz-seen])').forEach(function(el){el.setAttribute('data-mz-seen','1');io.observe(el);});
    document.querySelectorAll('[data-screen-label]').forEach(function(el){
      if(el.hasAttribute('data-mz-seen')||el.classList.contains('mz-reveal'))return;
      var l=el.getAttribute('data-screen-label');
      if(l==='Nav'||l==='Hero'||l==='Footer')return;
      var st=el.getAttribute('style')||'';
      if(st.indexOf('sticky')>=0)return;
      el.setAttribute('data-mz-seen','1');el.classList.add('mz-reveal');io.observe(el);
    });
  }
  function sweep(){document.querySelectorAll('.mz-reveal:not([data-mz-in])').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight+40&&r.bottom>-40)reveal(el);});}
  function start(){
    document.body.classList.add('mz-anim');scan();
    new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
    [900,2200,4500].forEach(function(t){setTimeout(function(){scan();sweep();},t);});
    var t;window.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(sweep,160);},{passive:true});
  }
  if(document.body){start();}else{document.addEventListener('DOMContentLoaded',start);}
})();
