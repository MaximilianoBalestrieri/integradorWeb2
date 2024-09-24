const clave = document.getElementById('clave');
const localizacion = document.getElementById('localizacion');
const departments = document.getElementById('departments');
const searchButton = document.getElementById('searchButton');
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById('departments');
      const departments = data.departments;

      departments.forEach((department) => {
        const option = document.createElement('option');
        option.value = department.departmentId;
        option.textContent = department.displayName;

        select.appendChild(option);
        const depto = department.displayName;
      });

      document.getElementById('searchButton').addEventListener('click', () => {
        const departmentId = select.value;
        const departmentName =
          select.options[select.selectedIndex].text; /* obtengo el nombre del dpto  */
        window.localStorage.removeItem('selectedDepartmentName');
        window.localStorage.setItem('selectedDepartmentName', departmentName);

        if (departmentId) {
          // Guardar el departamento seleccionado en localStorage
          window.localStorage.setItem('selectedDepartment', departmentId);
          mostrarDetallesDepartamento(departmentId);

          window.localStorage.setItem('selectedDepartmentName', displayName || '');
        }
      });
    })
    .catch((error) => console.error('Error:', error));
});

function mostrarDetallesDepartamento(departmentId) {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search`;

  if (clave.value) {
    url = url + `?q=${clave.value}`;
  } else {
    url = url + `?q=""`;
  }

  if (localizacion.value) {
    url = url + `&geoLocation=${localizacion.value}`;
  }

  if (departments.value !== 'todos') {
    url = url + `&departmentId=${departments.value}`;
  }

  // alert(url);

  searchButton.textContent = 'Cargando...';
  searchButton.disabled = true;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let objectIDs = data.objectIDs || [];
      let totalItems = objectIDs.length;
      const maxItems = 50; // Limitar a 50 objetos
      if (totalItems > maxItems) {
        objectIDs = objectIDs.slice(0, maxItems); // Limitar el array a 50 objetos
        totalItems = maxItems;
      }
      if (totalItems > 0) {
        // Guardar los objectIDs y la página actual en localStorage
        window.localStorage.setItem('objectIDs', JSON.stringify(objectIDs));
        window.localStorage.setItem('currentPage', 1); // Iniciar en la página 1
        window.location.href = 'cartas.html'; // Redirigir a la página de cartas
      } else {
        alert('No hay objetos en este departamento.');
      }
    })
    .catch((error) => console.error('Error:', error))
    .finally(() => {
      searchButton.textContent = 'Buscar';
      searchButton.disabled = false;
    });
}
