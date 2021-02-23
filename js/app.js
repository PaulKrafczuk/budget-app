class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // submit budget method
  submitBudgetForm() {
    console.log('entra a la funcion submitBudgetForm');
    const value = this.budgetInput.value;
    if (value === '' || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>Budget can not be empty or negative</p>`;

      const self = this; //arrastro el this hasta la funcion setTimeOut

      setTimeout(function () {
        self.budgetFeedback.classList.remove('showItem');
        self.budgetInput.value = '';
      }, 3000)
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }
  //show balance
  showBalance() {
    const expense = this.totalExpence();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;

    //if para cambiar el color del total
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    } else if (total === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  // submit expense form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value; //capturo el texto del expense
    const amountValue = this.amountInput.value; //capturo el numero del expense
    if (expenseValue === '' || amountValue === '' || amountValue < 0) {

      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Expense can not be empty or negative</p>`;

      const self = this; //arrastro el this hasta la funcion setTimeOut

      setTimeout(function () {
        self.expenseFeedback.classList.remove('showItem');
        self.amountInput.value = '';
      }, 3000)
    } else {
      let amount = parseInt(amountValue); // amount value era string y lo hago number
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      }

      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
    }
  }

  //add expense
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

  <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
  <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

  <div class="expense-icons list-item">

   <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
    <i class="fas fa-edit"></i>
   </a>
   <a href="#" class="delete-icon" data-id="${expense.id}">
    <i class="fas fa-trash"></i>
   </a>
  </div>`;

  this.expenseList.appendChild(div);

  }

  // total expense
  totalExpence() {
    let total = 400;
    return total;
  }
}

function eventListeners() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  //new instance of UI class
  const ui = new UI();

  //budget form submit
  budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  })

  //expense form submit
  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitExpenseForm();
  })

  //expense click
  expenseList.addEventListener('click', function (event) {

  })

}

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
});

