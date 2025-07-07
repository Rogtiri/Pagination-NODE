const output = document.getElementById('output');
const pagination = document.getElementById('pagination');

const itemsPerPage = 3;
let totalPage = 0;

function fetchPage(page){
  fetch(`/products?page=${page}&limit=${itemsPerPage}`)
    .then(res => res.json())
    .then(data => {
      output.innerHTML = ''
      data.products.forEach(p => {
        output.innerHTML += `
        <div class="product">
          <div>
            <img src="${p.image}" alt="${p.name}" width="100">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
          </div>
        </div>
        `;
      });
      if(totalPage == 0){
        const totalPage = Math.ceil(data.total / itemsPerPage);
        createPagination(totalPage);
      }
    });
}
function createPagination(totals){
  pagination.innerHTML = '';
  for(let i=1; i<=totals; i++){
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('btn');
    btn.addEventListener('click', () => {
      fetchPage(i);
    });

    pagination.appendChild(btn);
  }
}

fetchPage(1);