var tr_select = null

function getTrValues(idTr){

 if (tr_select != idTr){
   var tr
   if (tr_select != null){
     tr = document.getElementById(tr_select);
     var cells =  tr.cells
     var cellcount = cells.length;
     for( c=0; c<cellcount; c++) {
       cell = cells[c];
       cell.style.background = "#FFFFFF"
     }
   }
   tr_select = idTr;
   tr = document.getElementById(idTr);
   var cells =  tr.cells
   var cellcount = cells.length;
   for( c=0; c<cellcount; c++) {
     cell = cells[c];
     cell.style.background = "#2C75FF"
   }
 }
}

function changeMap(){
  var link = "home?id="
  var id = tr_select.toString()
  link = link.concat(id)
  window.location.href=link
}
