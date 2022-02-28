export default class UserInfo {
  constructor(selectors) {
    this._profileName = document.querySelector(selectors.name);
    this._profileJob = document.querySelector(selectors.job);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo(nameInput, jobInput) {
    this._profileName.textContent = nameInput.value;
    this._profileJob.textContent = jobInput.value;
  }
}