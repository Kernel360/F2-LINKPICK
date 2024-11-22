export const API_URLS = {
  getFoldersUrl: function () {
    return 'folders';
  },
  getBasicsFolderUrl: function () {
    return `${this.getFoldersUrl()}/basic`;
  },
  getPicksUrl: function () {
    return 'picks';
  },
  getPicksByLinkUrl: function (url: string) {
    return `${this.getPicksUrl()}/link?link=${url}`;
  },
  getTagsUrl: function () {
    return 'tags';
  },
  getMoveTagsUrl: function () {
    return `${this.getTagsUrl}/location`;
  },
};
