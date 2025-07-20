const links = Array.from(document.querySelectorAll('div.instant a')).map(a => a.href);
  
console.log(links.join('\n'));
