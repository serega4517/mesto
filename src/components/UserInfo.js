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

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}