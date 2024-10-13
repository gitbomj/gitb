const connectWalletButton = document.getElementById('connectWallet');
const walletAddressElement = document.getElementById('walletAddress').querySelector('span');
const btcPriceElement = document.getElementById('btcPrice');
const ethPriceElement = document.getElementById('ethPrice');
const bnbPriceElement = document.getElementById('bnbPrice');

// Проверка MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this dApp!');
}

// Подключение кошелька
connectWalletButton.addEventListener('click', async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        walletAddressElement.textContent = account;

        // Загружаем цены криптовалют после подключения кошелька
        fetchCryptoPrices();

    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
});

// Получение текущих цен криптовалют с CoinGecko API
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd');
        const data = await response.json();

        // Отображаем цены
        btcPriceElement.textContent = `$${data.bitcoin.usd}`;
        ethPriceElement.textContent = `$${data.ethereum.usd}`;
        bnbPriceElement.textContent = `$${data.binancecoin.usd}`;

    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        alert('Failed to load crypto prices. Please try again later.');
    }
}
