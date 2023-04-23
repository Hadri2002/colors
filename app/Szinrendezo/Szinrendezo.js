import Application from "../Application.js";

export default class Szinrendezo extends Application{
    init() {
        super.init();
        let szinrendezoElem = document.createElement("div");
        szinrendezoElem.textContent = "SZINRENDEZO";
        this.target.appendChild(szinrendezoElem);
    }
}