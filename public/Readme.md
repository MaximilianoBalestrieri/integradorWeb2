## Programación WEB 2  - Trabajo Practico Integrador 
### Alumno: Balestrieri Ramseyer Maximiliano

El trabajo consite en el desarrolo de una página que consuma imágenes del museo metropolitano de NY provisto por la API https://collectionapi.metmuseum.org.
La información de los endpoints disponibles y como usarlo se obtuvieron de https://metmuseum.github.io/

La página permite recuperar imágenes de objetos de arte basándose en una opción de filtros que incluyen recuperar imágenes por:

•	departamento (ej. American Decorative Arts, Arms and Armor, Asian Art, etc.)
•	palabra clave (objetos de arte que contienen la palabra a buscar en los datos del objeto.)
•	Localización (objetos que coinciden con una localización. Ej. Europe, China, Paris, Francia, New York)

El filtrado puede ser individual (ej. solo se puede buscar por departamento) o acumulativo (Ej. buscar por objetos por un departamento, que contengan una palabra clave y sean de una localización)

Las imágenes de los objetos de arte se muestran en una grilla de 4 columnas. Cada imagen se muestra con un formato tipo carta con su respectiva imagen, título, cultura y dinastía.
Si el objeto tiene imágenes adicionales se mostrará un botón que permitirá verlas en una página diferente.

El usuario podrá ver la fecha (o aproximación) de cuando el objeto fue diseñado o creado pasando el mouse por arriba de la imagen. Dicha fecha aparecera dentro de la carta como parte de los datos.

El título, cultura y dinastía de las cartas deben mostrarse en el idioma español. 

La página mostrará un máximo de 20 objetos recuperados. Si el resultado de la búsqueda supera este límite podrá presionar el botón siguiente o anterior como lo desee.


