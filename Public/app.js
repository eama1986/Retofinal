document.addEventListener('DOMContentLoaded', () => {
    const mascotasContainer = document.getElementById('mascotas-container');
  
    // Llamada a la API para obtener todas las razas de perros
    fetch("https://api.algobook.info/v1/dogs/all")
      .then(response => response.json())
      .then(data => {
        // Iterar sobre las razas y mostrarlas en la página
        data.forEach(raza => {
          const razaContainer = document.createElement('div');
          razaContainer.classList.add('raza-container', 'col-md-4');
  
          const razaTitle = document.createElement('h2');
          razaTitle.classList.add('raza-title');
          razaTitle.textContent = raza.name;
  
          const razaInfo = document.createElement('ul');
          razaInfo.classList.add('raza-info');
          razaInfo.innerHTML = `
            <li>Origen: ${raza.origin}</li>
            <li>Temperamento: ${raza.temperament}</li>
            <li>Esperanza de vida: ${raza.lifespan}</li>
            <li>Peso: ${raza.weightKg} kg (${raza.weightLbs} lbs)</li>
            <li>Altura: ${raza.heightCm} cm (${raza.heightInches} inches)</li>
          `;
  
          // Agregar contenedor de imágenes con scroll
          const imgContainer = document.createElement('div');
          imgContainer.classList.add('img-container');
  
          // Agregar imagen de perro
          const img = document.createElement('img');
          img.src = raza.imgUrl;
          img.alt = raza.name;
          img.classList.add('img-fluid');
          imgContainer.appendChild(img);
  
          // Agregar elementos al contenedor de la raza
          razaContainer.appendChild(razaTitle);
          razaContainer.appendChild(razaInfo);
          razaContainer.appendChild(imgContainer);
  
          mascotasContainer.appendChild(razaContainer);
        });
      })
      .catch(error => {
        console.error(error);
      });
  });
  