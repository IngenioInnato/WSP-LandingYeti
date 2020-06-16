function get_browser() {
  var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
  if(/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
      return {name:'IE',version:(tem[1]||'')};
      }   
  if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR|Edge\/(\d+)/)
      if(tem!=null)   {return {name:'Opera', version:tem[1]};}
      }   
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}
browser = get_browser();
// browser.name = 'Chrome'
// browser.version = '40'
function to(x){
  var observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // if((browser.name != 'safari') && (browser.version > 12))
      entry.isIntersecting ? entry.target.style.animation = `to-${x} 1s ease forwards`: entry.target.style.animation = 'none';
    });
  });
  document.querySelectorAll(`.to-${x}`).forEach(background => observer.observe(background));
}
//Colores
to('black');
to('blue');
to('orange');
to('gray')
to('white');
//Movimientos
to('left');
to('right');
to('top')
to('bottom');