const init = () => {
    getPlaybacks();
}

let playbacksArr = [];
let products = [];
if (JSON.parse(localStorage.getItem("products")) != null) {
    products = JSON.parse(localStorage.getItem("products"));
}


const getPlaybacks = async (category) => {
    document.querySelector('#id_row').innerHTML = `
        <div class="text-center">
            <img src="images/loading.gif" alt="loading gif" width="200">
        </div>
    `;
    let url = 'playbacks';
    try {
        let resp = await axios.get(url);
        playbacksArr = resp.data;
        createPlaybacks(playbacksArr, category);
    }
    catch (err) {
        console.log(err);
    }
}

const createPlaybacks = (playbacksArr, category) => {
    document.querySelector('#id_row').innerHTML = '';
    if (category == undefined) {
        playbacksArr.forEach(item => {
            let playback = new Playback("#id_row", item);
            playback.render();
        });
    }
    else if (category == 'kolmixSearch') {
        console.log('hahahah');
        let inputValue = document.querySelector('#searchInput').value;
        let filterData = playbacksArr.filter((playback) => playback.name.includes(inputValue));
        filterData.forEach(item => {
            let playback = new Playback("#id_row", item);
            playback.render();
        });
        if (filterData.length == 0) {
            document.querySelector('#id_row').innerHTML = `
                <h2 class="text-center">
                    😒 מצטערים, אין תוצאה שמתאימה לחיפוש זה...
                </h2>
            `;
        }
    }
    else {
        let filterData = playbacksArr.filter((playback) => playback.category == category);
        filterData.forEach(item => {
            let playback = new Playback("#id_row", item);
            playback.render();
        });
    }
    if (JSON.parse(localStorage.getItem("products")) != null && localStorage.getItem("products").length > 2) {
        products.forEach(id => {
            if (document.getElementById(id) != null) {
                document.getElementById(id).innerHTML = 'נוסף בהצלחה';
                document.getElementById(id).disabled = true;
                document.getElementById(id).style.backgroundColor = '#777';
            }
        });
    }
}

const storeInLocalStorage = (id) => {
    if (!products.includes(id)) {
        products.push(id);
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();
    }
}

init();