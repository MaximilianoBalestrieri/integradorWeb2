// ...

window.addEventListener('load', () => {
    const additionalImages = window.sessionStorage.getItem('additionalImages');
    const objectTitle = window.sessionStorage.getItem('objectTitle');
    const departmentDetails = window.sessionStorage.getItem('departmentDetails');

    if (additionalImages && objectTitle && departmentDetails) {
        const button = document.createElement('button');
        button.textContent = 'Ver imágenes adicionales';

        button.addEventListener('click', () => {
            window.sessionStorage.setItem('additionalImages', additionalImages);
            window.sessionStorage.setItem('objectTitle', objectTitle);
            window.sessionStorage.setItem('departmentDetails', departmentDetails);
            window.location.href = 'imagenes-adicionales.html';
        });

        document.getElementById('departmentDetails').appendChild(button);
    }
});