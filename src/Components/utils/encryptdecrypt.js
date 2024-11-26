// AES-like encryption and decryption
function stringToHex(str) {
    return Array.from(str).map((char) => char.charCodeAt(0).toString(16)).join('');
  }
  
  function hexToString(hexStr) {
    return hexStr.match(/.{1,2}/g).map((byte) => String.fromCharCode(parseInt(byte, 16))).join('');
  }
  
  export const encryptPassword = (password) => {
    const key= 'somerandomsecretcode!#$@#$!@$!!!!@@!';
    const passwordHex = stringToHex(password);
    const keyHex = stringToHex(key);
    let encrypted = '';
  
    for (let i = 0; i < passwordHex.length; i++) {
      encrypted += (parseInt(passwordHex[i], 16) ^ parseInt(keyHex[i % keyHex.length], 16)).toString(16);
    }
  
    return encrypted;
  };
  

  export const decryptPassword = (encryptedPassword) => {
    const key= 'somerandomsecretcode!#$@#$!@$!!!!@@!';
    const keyHex = stringToHex(key);
    let decryptedHex = '';
  
    for (let i = 0; i < encryptedPassword.length; i++) {
      decryptedHex += (parseInt(encryptedPassword[i], 16) ^ parseInt(keyHex[i % keyHex.length], 16)).toString(16);
    }
  
    return hexToString(decryptedHex);
  };
  

  