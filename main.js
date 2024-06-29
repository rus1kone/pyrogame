let startTime;
let timer;
const challengeDuration = 10000; // 10 секунд
const cooldownDuration = 3600000; // 1 час
const tokenReward = 10; // Количество токенов за выполнение задания

// Инициализация баланса
if (!localStorage.getItem('pyroBalance')) {
    localStorage.setItem('pyroBalance', '0');
}

document.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay();
    document.getElementById('challengeButton').addEventListener('mousedown', startChallenge);
    document.getElementById('challengeButton').addEventListener('mouseup', endChallenge);
});

function startChallenge() {
    startTime = Date.now();
    timer = setTimeout(checkChallenge, challengeDuration);
    document.getElementById("message").innerText = "Держите кнопку...";
}

function endChallenge() {
    clearTimeout(timer);
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime >= challengeDuration) {
        document.getElementById("message").innerText = "Поздравляем! Вы получили токены PYRO!";
        updateBalance(tokenReward);
        setCooldown();
    } else {
        document.getElementById("message").innerText = "Вы отпустили слишком рано. Попробуйте снова!";
    }
}

function setCooldown() {
    document.getElementById("challengeButton").disabled = true;
    document.getElementById("message").innerText = "Попробуйте снова через час.";
    setTimeout(() => {
        document.getElementById("challengeButton").disabled = false;
        document.getElementById("message").innerText = "Попробуйте снова!";
    }, cooldownDuration);
}

function updateBalance(amount) {
    let currentBalance = parseInt(localStorage.getItem('pyroBalance'));
    currentBalance += amount;
    localStorage.setItem('pyroBalance', currentBalance.toString());
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    const balance = localStorage.getItem('pyroBalance');
    document.getElementById('balance').innerText = `Ваш баланс: ${balance} PYRO`;
}
