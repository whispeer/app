if (localStorage.getItem("whispeer.session.business") && window.top.location.pathname.indexOf("business.html") === -1) {
  var basePath = window.top.location.href.match(/([^?#]*)/)[0];
  var basePathname = basePath.match(/(.*)\/.*/)[1];

  window.top.location.href = basePathname + "/business.html";
}
