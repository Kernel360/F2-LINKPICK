export const handleShareFolderLinkCopy = (handleShowPopver: () => void) => {
  const linkElement = document.getElementById(
    'shared-folder-link'
  ) as HTMLElement;
  if (linkElement) {
    const linkText = linkElement.textContent || '';
    navigator.clipboard
      .writeText(linkText)
      .then(() => {
        handleShowPopver();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
