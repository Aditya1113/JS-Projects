document.getElementById('loan-form').addEventListener('submit',loader);
function loader(e){
    document.getElementById('loading').style.display='block';
    document.getElementById('results').style.display='none';
    e.preventDefault();
    setTimeout(calculate,3000);
}

function calculate(e){


const principal = parseFloat(document.getElementById('amount').value);
const interest = parseFloat(document.getElementById('interest').value)/100/12;
const time = parseFloat(document.getElementById('years').value)*12;

const EMI=principal*interest*(Math.pow(1+interest,time)/(Math.pow(1+interest,time)-1)   );
const monthlyPayment=document.getElementById('monthly-payment');
const totalPayment=document.getElementById('total-payment');
const totalInterest=document.getElementById('total-interest');

 
if(isFinite(EMI))
{
    document.getElementById('loading').style.display='none';
document.getElementById('results').style.display='block';
    monthlyPayment.value = EMI.toFixed(2);
    totalPayment.value = (EMI*time).toFixed(2);
    totalInterest.value=(EMI*time-principal).toFixed(2);
}
else{
    document.getElementById('loading').style.display='none';
document.getElementById('results').style.display='none';
    const errorDiv=document.createElement('div');
    errorDiv.className='alert alert-danger';
    errorDiv.textContent='Oops! check the numbers!';
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');
    card.insertBefore(errorDiv,heading); 
     setTimeout(clearError,2000);

}

e.preventDefault();
}

function clearError(){
    document.querySelector('.alert').remove();
}