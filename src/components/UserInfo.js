export default class UserInfo {
  constructor(selectors, profileAvatarSelector) {
    this._profileName = document.querySelector(selectors.name);
    this._profileJob = document.querySelector(selectors.job);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;

  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}