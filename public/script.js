const output = document.getElementById('output');
const pagination = document.getElementById('pagination');

const itemsPerPage = 3;
let totalPage = 0;
let currentPage = 1;

function fetchPage(page){
  currentPage = page;

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
         totalPage = Math.ceil(data.total / itemsPerPage);
      }
      createPagination(totalPage);
    });
}
function createPagination(totals){
  pagination.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'назад';
  prevBtn.disabled = currentPage == 1;
  prevBtn.addEventListener('click', () => {
    if(currentPage > 1)
      fetchPage(currentPage - 1);
  });
  pagination.appendChild(prevBtn);

  for(let i=1; i<=totals; i++){
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('btn');
    btn.addEventListener('click', () => {
      fetchPage(i);
    });

    pagination.appendChild(btn);
  }
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'вперед';
  nextBtn.disabled = currentPage == totalPage;
  nextBtn.addEventListener('click', () => {
    if(currentPage < totalPage)
      fetchPage(currentPage + 1);
  });
  pagination.appendChild(nextBtn);
}


fetchPage(1);
