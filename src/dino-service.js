export default class DinoService {
  static getDinos(paragraphs, words) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      const url = `http://dinoipsum.herokuapp.com/api/?format=json&words=${words}&paragraphs=${paragraphs}`;
      request.open('GET', url, true);
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.send();
    });
  }
}