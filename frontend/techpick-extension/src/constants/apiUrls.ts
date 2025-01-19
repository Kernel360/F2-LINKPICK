export const API_URLS = {
  getFoldersUrl: () => 'folders',
  getBasicsFolderUrl: function () {
    return `${this.getFoldersUrl()}/basic`;
  },
  getPicksUrl: () => 'picks',
  getPicksByLinkUrl: function (url: string) {
    return `${this.getPicksUrl()}/link?link=${url}`;
  },
  getTagsUrl: () => 'tags',
  getMoveTagsUrl: function () {
    return `${this.getTagsUrl}/location`;
  },
  getLinkUrl: () => 'links',
  getExtensionPickUrl: function () {
    return `${this.getPicksUrl()}/extension`;
  },
};
