document.addEventListener('DOMContentLoaded', function () {
    let tokenBalance = parseFloat(localStorage.getItem('tokenBalance')) || 100; // Начальный баланс токенов
    let farmingRate = parseFloat(localStorage.getItem('farmingRate')) || 0.10; // Начальная скорость фарминга токенов за секунду
    let upgradeCost = parseFloat(localStorage.getItem('upgradeCost')) || 100; // Стоимость первого улучшения

    const tokenBalanceSpan = document.getElementById('tokenBalance'); // Элемент для отображения баланса
    const priceSpan = document.getElementById('price'); // Элемент для отображения стоимости улучшения
    const buyButton = document.getElementById('buyButton'); // Кнопка покупки улучшения
    const gameArea = document.getElementById('gameArea'); // Контейнер для станций
    const usernameSpan = document.getElementById('username'); // Элемент для отображения никнейма

    const modal = document.getElementById('myModal'); // Модальное окно
    const span = document.getElementsByClassName('close')[0]; // Кнопка закрытия модального окна

    // Получение никнейма из URL
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    if (username) {
        usernameSpan.textContent = `Привет, @${username}!`;
    }

    // Убедимся, что модальное окно скрыто при инициализации
    modal.style.display = "none";

    // Функция для отображения модального окна
    function showModal(message) {
        document.getElementById('modalText').textContent = message;
        modal.style.display = "flex";
    }

    // Закрытие модального окна при клике на крестик
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Восстановление состояния станций из локального хранилища
    const stations = JSON.parse(localStorage.getItem('stations')) || [];

    function updateDisplay() {
        tokenBalanceSpan.textContent = `Flar: ${tokenBalance.toFixed(2)}`;
        priceSpan.textContent = `${upgradeCost.toFixed(0)}F`;
    }

    function saveToLocalStorage() {
        localStorage.setItem('tokenBalance', tokenBalance.toFixed(2));
        localStorage.setItem('farmingRate', farmingRate.toFixed(2));
        localStorage.setItem('upgradeCost', upgradeCost.toFixed(0));
        localStorage.setItem('stations', JSON.stringify(stations));
    }

    function farmTokens() {
        tokenBalance += farmingRate;
        updateDisplay();
        saveToLocalStorage();
    }

    function addStation() {
        const emptyCells = document.querySelectorAll('.cell:not(.station)');
        if (emptyCells.length > 0) {
            const stationIndex = Array.from(document.querySelectorAll('.cell')).indexOf(emptyCells[0]);
            stations.push(stationIndex);
            emptyCells[0].classList.add('station');
            emptyCells[0].textContent = '🔥';
            saveToLocalStorage();
        }
    }

    function buyUpgrade() {
        if (tokenBalance >= upgradeCost) {
            tokenBalance -= upgradeCost;
            farmingRate += 0.10; // Увеличиваем скорость фарминга
            upgradeCost *= 2; // Удвоение стоимости следующего улучшения
            addStation(); // Добавляем новую станцию
            updateDisplay();
            saveToLocalStorage();
        } else {
            showModal('Недостаточно Flar');
        }
    }

    function restoreStations() {
        stations.forEach(index => {
            const cell = document.querySelectorAll('.cell')[index];
            cell.classList.add('station');
            cell.textContent = '🔥';
        });
    }

    setInterval(farmTokens, 1000);

    buyButton.addEventListener('click', buyUpgrade);

    updateDisplay();
    restoreStations();
});
