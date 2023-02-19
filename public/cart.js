const init = () => {
    getPlaybacks();
}

let playbacksArr = [];
let products = [];
let sumPrice = 0;

const getPlaybacks = async () => {
    document.querySelector('#id_row').innerHTML = `
        <div class="text-center">
            <img src="images/loading.gif" alt="loading gif" width="200">
        </div>
    `;
    let url = 'playbacks';
    try {
        if (JSON.parse(localStorage.getItem("products")) != null && localStorage.getItem("products").length > 2) {
            let resp = await axios.get(url);
            products = JSON.parse(localStorage.getItem("products"));
            let filterData = resp.data.filter(playback => products.includes(playback.id));
            createPlaybacks(filterData);
            initPayPalButton();
            document.querySelector('#cartBodyTitle').style.display = 'inline';
            document.querySelector('#cartBodyTitle').innerHTML += ' ' + products.length;
            document.querySelector('#sumOrder').style.display = 'inline';
            document.querySelector('#sumOrder').innerHTML += sumPrice + ' ש"ח';
        }
        else {
            document.querySelector('#id_row').innerHTML = '<div class="ifCartEmpty">עגלת הקניות ריקה<br><a href="playbacks.html">לחצו כאן כדי לחזור לרשימת הפלייבקים</a></div>';
        }
    }
    catch (err) {
        console.log(err);
    }
}

const createPlaybacks = (playbacksArr) => {
    document.querySelector('#id_row').innerHTML = '';
    playbacksArr.forEach(item => {
        sumPrice += item.price;
        let playback = new Playback("#id_row", item);
        playback.render();
    });
}

const removeFromLocalStorage = (id) => {
    products = JSON.parse(localStorage.getItem("products"));
    if (products.indexOf(id) != (-1)) {
        let index = products.indexOf(id);
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();
    }
}

init();

function initPayPalButton() {
    paypal.Buttons({
        style: {
            shape: 'pill',
            color: 'gold',
            layout: 'horizontal',
            label: 'paypal',

        },

        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{ "amount": { "currency_code": "ILS", "value": sumPrice } }]
            });
        },

        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {

                // Full available details
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                // Show a success message within this page, e.g.
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '';
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                actions.redirect('purchaseThanks.html');

            });
        },

        onError: function (err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
}