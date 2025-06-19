import domToImage from 'dom-to-image';

export default (UserName: string) => {
  const saveView = document.querySelector('#saveView')!;

  domToImage.toBlob(saveView, { bgcolor: '#292b5a' }).then((blob) => {
    console.log(blob);
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${UserName}.png`;
    a.click();
  });
};