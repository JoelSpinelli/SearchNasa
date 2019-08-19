
(function() {
  document.getElementById('loader__message').style.display = 'none';
  document.getElementById('message-danger').style.display = 'none';
  document.getElementById('message-info').style.display = 'none';

  document.addEventListener('keyup', function(e) {
    if(e.which !== 13) return ;
    clearImages();
    clearMessage();

    document.getElementById('loader__message').style.display = 'unset';

    let nasaImage = document.getElementById('imageName').value || 'Earth';
    let query = `https://images-api.nasa.gov/search?q=${nasaImage}`;

    fetch(query)
    .then( resp => {
      return resp.json();
    })
    .then( (j) => {
      assignValues( j.collection);
    })
    .catch( (error) => {
      searchError();
    });

    var assignValues = collection => {
      document.getElementById('loader__message').style = 'display: none';
      let {items} = collection
      showImages(items);
    }

    function showImages(items) {
      if (!items.length) {
        searchWithoutResults();
        return
      }

      items.forEach( item => {
        let { links } = item;
        let div = document.createElement('div');
        let attDiv = document.createAttribute('class');

        attDiv.value= 'images__image';
        div.setAttributeNode(attDiv);
        div.innerHTML = `<img src="${links[0].href}" width: 10rem height: 10rem;/>`;

        document.getElementById('imagesList').appendChild(div);
      });
    }

    function clearImages() {
      let elem = document.querySelector('section');
      let child = elem.lastElementChild;

      while(child) {
        elem.removeChild(child);
        child = elem.lastElementChild;
      }
    }

    function clearMessage() {
      document.getElementById('message-danger').style.display = 'none';
      document.getElementById('message-info').style.display = 'none';
    }

    function searchError() {
      document.getElementById('message-danger').removeAttribute('style');
    }

    function searchWithoutResults() {
      document.getElementById('message-info').removeAttribute('style');
    }
  });
})();