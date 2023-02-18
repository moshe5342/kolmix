class Playback {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.image = _item.image;
        this.name = _item.name;
        this.category = _item.category;
        this.price = _item.price;
        this.id = _item.id;
    }

    render() {
        let myDiv = document.createElement("div");
        myDiv.className = "border p-2 col-md-6";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `
                <img src="${this.image}" alt="${this.name}" class="col-5 float-sm-start me-2">
                <h2>${this.name}</h2>
                <div>קטגוריה: ${this.category}</div>
                <div>מחיר: ${this.price} ש"ח</div>
                <button id="${this.id}" class="removeFromCartBtn" onclick="removeFromLocalStorage(${this.id})">הסר</button>
                </div>
        `
    }
}