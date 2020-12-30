export const downloadURI = (uri, name) => {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const uri2array = (uri, buffer) => {
  var marker = ';base64,',
    raw = window.atob(uri.substring(uri.indexOf(marker) + marker.length)),
    n = raw.length,
    a = new Uint8Array(new ArrayBuffer(n));
  for (var i = 0; i < n; i++) {
    a[i] = raw.charCodeAt(i);
  }
  return buffer ? a.buffer : a;
}

export const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}