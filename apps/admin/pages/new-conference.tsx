import React from 'react';

export default function CreateConference() {
  return (
    <>
      <label>
        Nombre de la conferencia <input type="text" />
      </label>
      <label>
        Enlace para la página principal <input type="text" />
      </label>
      <label>
        Lugar de celebración <input type="text" />
      </label>
      <label>
        Fecha de celebración <input type="date" />
      </label>
      <label>
        Logo de conferencia <input type="file" />
      </label>
      <button>Crear conferencia</button>
    </>
  );
}
