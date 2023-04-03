const harcamaInput = document.querySelector('#form-harcama');
const fiyatInput = document.querySelector('#form-fiyat');
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('#liste');
const toplamSpan = document.querySelector('#toplam-bilgi');
const durumInput = document.querySelector('#durum');
const nameInput = document.querySelector('#name-input');
const selectInput = document.querySelector('select');

// button listner
formBtn.addEventListener('click', addExpense);
liste.addEventListener('click', handleClick);
selectInput.addEventListener('change', handleFilter);

// total state
let toplam = 0;

// total update part

function updateToplam(e) {
  toplam += Number(e);
  toplamSpan.innerText = toplam;
}

// expenses
function addExpense(e) {
  e.preventDefault();
  // verify
  if (!harcamaInput.value && !fiyatInput.value) return;

  // div making
  const harcamaDiv = document.createElement('div');
  // class adding
  harcamaDiv.classList.add('harcama');

  // Make new class when paid
  if (durumInput.checked) {
    harcamaDiv.classList.add('odendi');
  }

    harcamaDiv.innerHTML = `
         <h2 class="harcama-title">${harcamaInput.value}</h2>
          <h2 class="harcama-fiyat">${fiyatInput.value}</h2>
          <div class="harcama-buttons">
            <img id="payment" src="/images/card-payment.png" />
            <img id="remove" src="/images/remove-btn.png" />
          </div>
  `;
  //   re-route created HTML
  liste.appendChild(harcamaDiv);

  //   update the total amount
  updateToplam(fiyatInput.value);

  //   reset stats
  harcamaInput.value = '';
  fiyatInput.value = '';
  durumInput.checked = false;
}

// Delete & Edit part

function handleClick(e) {
  // onClick
  const eleman = e.target;

  // When clicked ID is removed
  if (eleman.id === 'remove') {
    const kapsayıcıEleman = eleman.parentElement.parentElement;

    // Animation for removed element
    kapsayıcıEleman.classList.add('fall');

    // Wait till animation ends
    kapsayıcıEleman.addEventListener('transitionend', () => {
      kapsayıcıEleman.remove();
    });

    // re update the total amount
    const fiyat = +kapsayıcıEleman.querySelector('.harcama-fiyat').innerText;
    toplam -= fiyat;
    toplamSpan.innerText = toplam;
  }

  // If the id is payment then update
  if (eleman.id === 'payment') {
    const kapsayıcıEleman = eleman.parentElement.parentElement;

    kapsayıcıEleman.classList.toggle('odendi');
  }
}

// SAVE THE USERNAME

nameInput.addEventListener('change', (e) => {
  localStorage.setItem('username', e.target.value);
});

const username = localStorage.getItem('username');

nameInput.value = username;

// Filter part

function handleFilter(e) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case 'Hepsi':
        item.style.display = 'flex';
        break;

      case 'Ödendi':
        if (item.classList.contains('odendi')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;

      case 'Ödenmedi':
        // coding
        if (!item.classList.contains('odendi')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;
    }
  });
}
