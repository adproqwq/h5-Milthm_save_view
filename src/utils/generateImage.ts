import domToImage from 'dom-to-image';

export default () => {
  const saveView = document.querySelector('#saveView')!;

  domToImage.toBlob(saveView, { bgcolor: '#292b5a' }).then((blob) => {
    console.log(blob);
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${window.save!.UserName}.png`;
    a.click();
  });
};