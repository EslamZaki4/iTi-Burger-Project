// _____________________________Sale Menu_____________________________
const addItem = document.querySelectorAll('.add-item');
let burgerName,burgerPrice,burgerImage;
//all bn with class

addItem.forEach((btn)=> btn.addEventListener('click',(evt)=>{
    const contentBurger = evt.target.closest('.contentBurger'); //instead parentElement
        burgerName = contentBurger.getElementsByClassName('hs1')[0].innerHTML;
        burgerPrice = contentBurger.getElementsByClassName('hs2')[0].innerHTML;
        burgerImage = contentBurger.getElementsByClassName('imageBurger')[0].src;

    showMenu();
}))



const qty = document.getElementById('qty'); // الكمية

const cartMenu = document.getElementById('cart-menu');



const plus = () => qty.value = +qty.value + 1;  // زيادة الكمية
const minus = () => {
    qty.value = +qty.value - 1;
    if(qty.value <=0){
        qty.value = 1
    }
 //لا يسمح بطرح اقل من صفر 
} 
const closeMenu = () => cartMenu.classList.remove('visbile')




const showMenu = () =>{
//center
    let newPosition = document.documentElement.scrollTop + cartMenu.offsetHeight/2;
    cartMenu.style.top =  newPosition + 'px';

     document.getElementById('menuBurgerPrice').textContent = burgerPrice
     document.getElementById('menuBurgerName').textContent = burgerName
     document.getElementById('qty').value = 1;
     cartMenu.classList.add('visbile');
  
}

//cash temp storage
//get old items
//add new items
const inovice = {
orders:[]
}


function saveInvoice(){
//store in session
    inovice.orders = [];
    const data = sessionStorage.getItem("inovice"); 
    if(data){inovice.orders = JSON.parse(data).orders}
    

///الفاتورة الحالية
    const currentInvoice = {
        "burgerName":burgerName,
        "burgerPrice":burgerPrice,
        "burgerQty":qty.value
    };

    inovice.orders.push(currentInvoice)


    sessionStorage.setItem("inovice", JSON.stringify(inovice));
    closeMenu();
}


// _____________________________Invoice_____________________________


const showInvoice = () => {

    let newPosition = document.documentElement.scrollTop + invoiceModal.offsetHeight/2;
    invoiceModal.style.top =  newPosition + 'px';
    getSessionItems();
    setTimeout(()=>invoiceModal.classList.add('visbile-invoice'),150);
    
}



const invoiceModal = document.getElementById('invoiceModal');
const invoiceTable = document.getElementById('invoice');

const closeInvoice = () => invoiceModal.classList.remove('visbile-invoice')
const getSessionItems =()=>{
    
    inovice.orders = []; //clear 

    const obj = sessionStorage.getItem("inovice");
    if(obj){
        inovice.orders = JSON.parse(obj).orders;
        let total = 0;
        invoiceTable.innerHTML  = `<th>اسم الصنف</th><th>السعر</th><th>الكمية</th><th>الاجمالى</th>`;
        inovice.orders.forEach((order)=>{
      

            invoiceTable.innerHTML += `
            <tr>
            <td>${order.burgerName}</td>
            <td>${order.burgerPrice}</td>
            <td>${order.burgerQty}</td>
            <td>
            ${+order.burgerQty *  Number(order.burgerPrice.replace("$","").replace(",","."))}
            </td>
            </tr>`



            total += (+order.burgerQty *  Number(order.burgerPrice.replace("$","").replace(",",".")))
        })

        invoiceTable.innerHTML += `<tr>
        <td> الاجمالى : </td>
         <td> ${total} </td>
         </tr>
         `
    }

    if(inovice.orders.length == 0){ invoiceTable.innerHTML = `<tr><td>لا يوجد اصناف لعرضها </td></tr>` }
}

const cancelInvoice = ()=>{
    const confim = confirm('هل انت متأكد من حذف الفاتورة')
    if(confim){
        sessionStorage.removeItem('inovice')
        invoiceTable.innerHTML = `<th>اسم الصنف</th><th>السعر</th><th>الكمية</th><th>الاجمالى</th>`;
    }
}




