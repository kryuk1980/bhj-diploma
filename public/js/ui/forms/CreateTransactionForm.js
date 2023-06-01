/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element),
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      if (response.data);  {
        select.innerHTML = '';
        response.data.forEach((item) => select.innerHTML += `<option value="${item.id}">${item.name}</option>`);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        const modalWindow = this.element.closest('.modal');
        let modal;
        if (modalWindow.getAttribute('id') === 'modal-new-income') {
          modal = 'newIncome';
        } else {
          modal = 'newExpense';
        }
        App.getModal(modal).close();
        App.update();
        this.element.reset();
      }
    });
  }
}