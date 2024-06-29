document.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay();
    document.getElementById('challengeButton').addEventListener('click', incrementBalance);
});

function incrementBalance() {
    let currentBalance = parseInt(localStorage.getItem('pyroBalance')) || 0;
    currentBalance += 1;
    localStorage.setItem('pyroBalance', currentBalance.toString());
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    const balance = localStorage.getItem('pyroBalance') || '0';
    document.getElementById('balance').innerText = `Pyro: ${balance}`;
}
