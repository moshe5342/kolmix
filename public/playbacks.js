const init = () => {
    getPlaybacks();
}

let playbacksArr = [];

const getPlaybacks = async () => {
    document.querySelector('#id_row').innerHTML = `
        <div class="text-center">
            <img src="images/loading.gif" alt="loading gif" width="200">
        </div>
    `;
    let url = 'http://localhost:3000/playbacks';
    try {
        let resp = await axios.get(url);
        playbacksArr = resp.data;
        createPlaybacks(playbacksArr);
    }
    catch (err) {
        console.log(err);
    }
}

const createPlaybacks = (_ar = playbacksArr, category) => {
    document.querySelector('#id_row').innerHTML = '';
    if (_ar == playbacksArr) {
        _ar.forEach(item => {
            let playback = new Playback("#id_row", item);
            playback.render(category);
        });
    }
    else {
        _ar = playbacksArr;
        let filterData = _ar.filter((playback) => category ? playback.category == category : playback.category !== category);
        filterData.forEach(item => {
            let playback = new Playback("#id_row", item);
            playback.render(category);
        });
    }
}

const search = () => {
    document.querySelector('#id_row').innerHTML = '';
    let inputValue = document.querySelector('#searchInput').value;
    _ar = playbacksArr;
    let filterData = _ar.filter((playback) => search ? playback.name.includes(inputValue) : playback.name.includes(inputValue));
    filterData.forEach(item => {
        let playback = new Playback("#id_row", item);
        playback.render(search);
    });
    if (filterData.length == 0) {
        document.querySelector('#id_row').innerHTML = `
            <h2 class="text-center">
                😒 מצטערים, אין תוצאה שמתאימה לחיפוש זה...
            </h2>
        `;
    }
}

init();