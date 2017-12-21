$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

function dataURItoBlob(dataURI) {
  var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: mime});
}

$(function() {
  var backendUrl = $.getUrlVar('url');
  var moduleCode = $.getUrlVar('module') || 'Module';


  var compileLatex = function(data) {
    var appendOutput = function(msg) {
      console.log(msg);
    };

    var pdftex = new PDFTeX();

    pdftex.set_TOTAL_MEMORY(80*1024*1024).then(function() {
      pdftex.on_stdout = appendOutput;
      pdftex.on_stderr = appendOutput;

      console.time("Execution time");

      pdftex.compile(data).then(function(dataurl) {
        console.timeEnd("Execution time");
        console.log(pdf_dataurl);

        if (pdf_dataurl === false) {
          console.error("Something went really really wrong.");
          return;
        }

        var blob = dataURItoBlob(dataurl);
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = moduleCode + ".pdf";
        a.click();

        window.URL.revokeObjectURL(url);
        window.close();
      });
    });
  };

  backendUrl = "template.tex";
  $.get(backendUrl, compileLatex);
});
