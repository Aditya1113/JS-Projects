const form = document.querySelector('#task-form');
const pt = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearbtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

loadEventListeners();

function loadEventListeners(){
document.addEventListener('DOMContentLoaded',getTasks);
form.addEventListener('submit',addTask);
taskList.addEventListener('click',deletetask);
clearbtn.addEventListener('click',deleteall);
filter.addEventListener('keyup',filtertask);
}
function addTask(e)
{
    if (pt.value ===''){
       alert('add task');
       return;
    }
    
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(pt.value));
    
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(pt.value); 
    
   
    pt.value='';
    e.preventDefault();
    
}

function deletetask(e)
{
    if(confirm('are you sure?'))
    {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function deleteall()
{
   while(taskList.firstChild)
   {
       taskList.removeChild(taskList.firstChild);
   }
   localStorage.clear();
}

function filtertask(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item  = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)==-1){
            task.style.display='none';
        }
        else{
            task.style.display='block';
        }
    });
}

function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks')=== null)
    {
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks()
{
    
    tasks=JSON.parse(localStorage.getItem('tasks'));
    
    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));
        
        const link=document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
   

    });
}

function removeTaskFromLocalStorage(taskitem)
{
  
    tasks=JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task,index){
        if(taskitem.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}