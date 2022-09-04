loadXMLFeed = () => {
  const url = 'https://www.cnnindonesia.com/nasional/rss';
  fetch(url)
    .then(response => response.text())
    .then(data => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, 'application/xml');
      displayFeedList(xml);
    })
}

document.addEventListener('DOMContentLoaded', loadXMLFeed);

function displayFeedList(x) {
  let list = document.getElementById('item');
  let item = x.getElementsByTagName('item');
  let itemNum = x.getElementsByTagName('item').length;
  let lastBuildDate = x.getElementsByTagName('lastBuildDate')[0].childNodes[0].nodeValue;
  let updateDate = document.getElementById('updateDate');
  updateDate.innerHTML = 'Diperbarui pada ' + new Date(lastBuildDate).toLocaleString();

  for (let i = 0; i < itemNum; i++) {
    let divCol = document.createElement('div');
    divCol.className = 'col';
    let divCard = document.createElement('div');
    divCard.className = 'card h-100';
    let description = item[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
    src = description.slice(description.indexOf('src="') + 5, description.indexOf('"/> '));
    desc = description.slice(description.indexOf('/> ') + 3, description.indexOf('</p>'));
    console.log(desc);
    let imgCard = document.createElement('img');
    imgCard.className = 'card-img-top';
    imgCard.src = src;
    let img = document.createElement('img');
    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    let divCardTitle = document.createElement('h5');
    divCardTitle.className = 'card-title';
    let pCardText = document.createElement('p');
    pCardText.className = 'card-text';
    pCardText.innerHTML = desc + ' ...';
    let divCardLink = document.createElement('a');
    divCardLink.className = 'card-link';
    divCardLink.innerText = 'Baca Selengkapnya'
    divCardLink.className = 'btn btn-primary';
    divCardLink.href = item[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
    divCardTitle.innerHTML = item[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
    let divCardFooter = document.createElement('div');
    divCardFooter.className = 'card-footer';
    let small = document.createElement('small');
    small.className = 'text-muted';
    let date = item[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
    date = new Date(date);
    small.innerHTML = 'Diperbarui pada ' + date.toLocaleString();
    divCardBody.appendChild(divCardTitle);
    divCardBody.appendChild(pCardText);
    divCardBody.appendChild(divCardLink);
    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);
    divCard.appendChild(divCardFooter);
    divCardFooter.appendChild(small);
    divCol.appendChild(divCard);
    list.appendChild(divCol);

  }
}