const App = {
  endpoint: '/api/v1',
  txs: [],
};

/*
* Init App
*/
App.init = _ => {
  App.getTxs();
  setInterval(App.getTxs, 5000);
};

App.getTxs = _ => {
  App.makeRequest({api: 'get_all'})
    .then(txs => {
      if (txs.length === 0) {
        $('#accordion').html('No transactions to show');
        return;
      }
      if (txs.length !== App.txs.length) {
        App.txs = txs;
        App.drawAccordionItems();
      }
    })
    .catch(err => console.log(err));
};

App.drawAccordionItems = _ => {
  $('#accordion').empty();
  for (let i = 0; i < App.txs.length; i++) {
    const card = $('<div>').addClass('card');
    const cardHeader = $('<div>')
      .addClass('card-header')
      .attr('id', `heading_${i}`);
    const h5 = $('<h5>').addClass('mb-0');
    const colorOp = App.txs[i].type === 'credit' ? 'green' : 'red';
    const btn = $('<button>').addClass('btn btn-link')
      .attr('data-toggle', 'collapse')
      .attr('data-target', `#collapse_${i}`)
      .attr('aria-expanded', 'true')
      .attr('aria-controls', `#collapse_${i}`)
      .css('color', colorOp)
      .html(`${App.txs[i].type} user operation`);
    h5.append(btn);
    cardHeader.append(h5);
    const collapseN = $('<div>').addClass('collapse')
      .attr('aria-labelledby', `heading_${i}`)
      .attr('data-parent', '#accordion')
      .attr('id', `collapse_${i}`);
    const amtPara = $('<p>').text(`Amount: ${App.txs[i].amount}`);
    const localDatetime = App.getLocalDatetime(App.txs[i].effectiveDate);
    const datePara = $('<p>').text(`Date: ${localDatetime}`);
    const cardBody = $('<div>').addClass('card-body').append(amtPara).append(datePara);
    collapseN.append(cardBody);
    card.append(cardHeader).append(collapseN);
    $('#accordion').append(card);
  }
  $('.collapse').collapse()
};

App.getLocalDatetime = datetime => {
  const localDatetime = new Date(datetime);
  const finalDatetime = localDatetime.toLocaleDateString() + ' ' + localDatetime.toLocaleTimeString();

  return finalDatetime;
};

/** Make a request
  {
    api: <API Path String>
    [post]: <Post JSON Object>
  }

  @returns
  <Fetch Promise Object>
*/
App.makeRequest = ({api, post}) => {
  const body = !!post ? JSON.stringify(post) : null;
  const headers = {'content-type': 'application/json'};
  const method = !post ? 'GET' : 'POST';

  return fetch(`${App.endpoint}/${api}`, {body, headers, method})
    .then(r => {
      switch (r.status) {
      case 200:
        return Promise.resolve(r);

      default:
        return Promise.reject(new Error(r.statusText));
      }
    })
    .then(r => r.json());
};

$(() => App.init());
