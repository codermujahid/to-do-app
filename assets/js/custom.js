// get elements 
let do_name = document.querySelector('#do_name');
let do_client = document.querySelector('#do_client');
let do_date = document.querySelector('#do_date');
let do_time = document.querySelector('#do_time');
let do_form = document.querySelector('#todo_form');
let list = document.querySelector('.list-group');




// Form submit to add data 
do_form.onsubmit = (e) => {
  e.preventDefault();

  let day1 = new Date(do_date.value + ' ' + do_time.value);
  let day2 = new Date();


  let storageVal = localStorage.getItem('todoapps');
  let doArray;

  if(storageVal == null){
    doArray = [];
  }else{
    doArray = JSON.parse(storageVal);
  }

  doArray.push({
    name : do_name.value,
    client : do_client.value,
    remain : (day1.getTime() - day2.getTime()),
    dead_line : day1.getTime()
  });

  localStorage.setItem('todoapps', JSON.stringify(doArray));
  
  do_form.reset();
  showList();
  
}

/**
 * Auto load showList
 */
setInterval(() => {
  showList();
}, 1000);

/**
 * Show list 
 */
 showList();
function showList(){

  let day = new Date();
  
  let storageVal = localStorage.getItem('todoapps');
  let doArray;
  let data = '';

  if(storageVal == null){
    doArray = [];
  }else{
    doArray = JSON.parse(storageVal);
  }

  doArray.map((val, index) => {
     data += `<li class="list-group-item shadow">
    ${val.name} | Client : ${val.client} | Remain time : <strong>[ ${reamainTime(val.dead_line, day.getTime())} ]</strong>
    <button onclick="deleteList(${index})" class="close">&times;</button>
    <span style="${rangeBar(val.remain, val.dead_line)}" class="status"></span>
  </li>`;
  });

  list.innerHTML = data;
  
}


function rangeBar(remain, dead_line){
  let day = new Date();
  let current_remain =  dead_line - day.getTime();
  
  let remainPer = (100*current_remain) / remain;

  let width =  Math.floor(remainPer);

  if( width <= 0 ){
    width = `width:100%; background-color:red;`;
  }else if(width >= 0 && width <= 30){
    width = `width:${width}%; background-color:pink;`;
  }else if(width >= 30 && width <= 40){
    width = `width:${width}%; background-color:orange;`;
  }else if(width >= 41 && width <= 70){
    width = `width:${width}%; background-color:blue;`;
  }else if(width >= 71 && width <= 100){
    width = `width:${width}%; background-color:green;`;
  }

  return width;

}

/**
 * Remain Date 
 */

 function reamainTime(dead_line, current_time){
   
  let total_sec = Math.floor((dead_line - current_time) / 1000);
  let total_min = Math.floor(total_sec / 60);
  let total_hours = Math.floor(total_min / 60);
  let total_Days = Math.floor(total_hours / 24);


  let hours = total_hours - (total_Days * 24);
  let min = total_min - (total_Days * 24 * 60) - (hours * 60);
  let sec = total_sec - (total_Days * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);

  if(dead_line > current_time){
    return `${total_Days} days ${hours} hours ${min} mins ${sec} Sec`;
  }else{
    return `<strong style="color:red;">Time over</strong>`;
  }

  
 }


 /**
  * Delete Do List
  */
 function deleteList(index){
  
  
  let storageVal = localStorage.getItem('todoapps');
  let doArray;


  if(storageVal == null){
    doArray = [];
  }else{
    doArray = JSON.parse(storageVal);
  }

  doArray.splice(index, 1);
  localStorage.setItem('todoapps', JSON.stringify(doArray));
  showList();

 }



