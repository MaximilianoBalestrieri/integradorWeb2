let currentPage = parseInt(window.localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 20;
let objectIDs = JSON.parse(window.localStorage.getItem('objectIDs')) || [];
const totalItems = objectIDs.length;
const maxItems = 50;

document.addEventListener('DOMContentLoaded', () => {
  mostrarObjetos(objectIDs);

  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      mostrarObjetos(objectIDs);
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * itemsPerPage < Math.min(totalItems, maxItems)) {
      currentPage++;
      mostrarObjetos(objectIDs);
    }
  });
});

function mostrarObjetos(objectIDs) {
  const detailsContainer = document.getElementById('departmentDetails');
  detailsContainer.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedObjectIDs = objectIDs.slice(startIndex, endIndex);

  const departamentoSeleccionado = window.localStorage.getItem('selectedDepartmentName');
  const tituloDepartamento = document.getElementById('titulo-departamento');
  tituloDepartamento.textContent = `Departamento seleccionado: ${departamentoSeleccionado}`;

  paginatedObjectIDs.forEach((objectID) => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
      .then((response) => response.json())
      .then((objectData) => {
        // TRADUCCION
        fetch('/traducir', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo: objectData.title || 'No title',
            dinastia: objectData.dynasty || 'No dynasty',
            cultura: objectData.culture || 'No culture',
            fecha: objectData.period || 'No date',
          }),
        })
          .then((response) => response.json())
          .then((dataTraducida) => {
            // console.log(objectData);

            // Crear tarjeta
            const card = document.createElement('div');
            card.classList.add('card');

            // Título del objeto
            const title = document.createElement('p');
            title.textContent = `Título: ${dataTraducida.tituloTraducido}`; // NO es más objectData.title, Ahora es dataTraducida.traduccion
            card.appendChild(title);

            // Dinastía
            const dynasty = document.createElement('p');
            dynasty.textContent = `Dinastía: ${dataTraducida.dinastiaTraducida || 'Desconocida'}`;
            card.appendChild(dynasty);

            // Cultura
            const culture = document.createElement('p');
            culture.textContent = `Cultura: ${dataTraducida.culturaTraducida || 'Desconocida'}`;
            card.appendChild(culture);

            // Imagen principal
            const img = document.createElement('img');
            img.src = objectData.primaryImageSmall || '.public/imagenes/museoChico.jpg';
            img.alt = objectData.title;
            img.onerror = () => {
              img.src = './public/imagenes/museoChico.jpg';
            };
            card.appendChild(img);

            const period = document.createElement('p');
            period.textContent = `Fecha de creación: ${
              dataTraducida.fechaTraducida || 'Desconocido'
            }`;
            period.style.display = 'none'; // Oculto inicialmente

            card.addEventListener('mouseover', () => {
              period.style.display = 'block'; // Muestra al pasar el mouse
            });

            card.addEventListener('mouseout', () => {
              period.style.display = 'none'; // Oculta cuando el mouse salga
            });

            card.appendChild(period);

            // Ver imágenes adicionales (si existen)
            if (objectData.additionalImages && objectData.additionalImages.length > 0) {
              const button = document.createElement('button');
              button.textContent = 'Ver imágenes adicionales';

              button.addEventListener('click', () => {
                window.localStorage.setItem(
                  'additionalImages',
                  JSON.stringify(objectData.additionalImages)
                );
                window.localStorage.setItem('objectTitle', objectData.title);
                window.location.href = 'imagenes-adicionales.html';
              });

              card.appendChild(button);
            }

            // Agregar la carta al contenedor
            detailsContainer.appendChild(card);
          });
      })
      .catch((error) => console.error('Error:', error));
  });

  // Actualiza el estado de los botones de paginación
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage * itemsPerPage >= totalItems;

  // Guarda la página actual en localStorage
  window.localStorage.setItem('currentPage', currentPage);

  mainButton.addEventListener('click', () => {
  window.location.href = 'index.html'; 
    
  });
}
