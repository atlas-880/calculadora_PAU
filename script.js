function calcular() {
  const bach = parseFloat(document.getElementById('bach').value);
  const pau = parseFloat(document.getElementById('pau').value);

  const opt1 = parseFloat(document.getElementById('opt1').value) || 0;
  const opt2 = parseFloat(document.getElementById('opt2').value) || 0;
  const pond1 = parseFloat(document.getElementById('pond1').value) || 0;
  const pond2 = parseFloat(document.getElementById('pond2').value) || 0;

  const resultado = document.getElementById('resultado');

  // Validació
  if (bach > 10 || pau > 10 || opt1 > 10 || opt2 > 10) {
  resultado.innerHTML = "<span style='color:red'>⚠️ Les notes no poden superar el 10.</span>";
  return;
}

  if (isNaN(bach) || isNaN(pau)) {
    resultado.innerHTML = "<span style='color:red'>⚠️ Introdueix la nota de Batxillerat i la de la PAU.</span>";
    return;

  }

  // Càlculs
  const faseGeneral = (0.6 * bach + 0.4 * pau);
  const faseOpcional = (opt1 * pond1) + (opt2 * pond2);
  const notaFinal = faseGeneral + faseOpcional;

  // Arrodonir a 3 decimals
  const notaFinalArrodonida = notaFinal.toFixed(3);
  const faseGeneralArrodonida = faseGeneral.toFixed(3);
  const faseOpcionalArrodonida = faseOpcional.toFixed(3);

  // Missatge segons la nota
  let missatge = "";
  if (notaFinal >= 12) {
    missatge = "Estàs molt per sobre de la mitja a Catalunya";
  } else if (notaFinal >= 10) {
    missatge = "Força superior a la nota mitja a Catalunya.";
  } else if (notaFinal >= 8) {
    missatge = "Estàs lleugerament per sobre de la mitja a Catalunya.";
  } else if (notaFinal >= 7) {
    missatge = "Estàs sobre la mitja aproximada a Catalunya.";
  } else {
    missatge = "";
  }

  // Percentatge per la barra (sobre 14)
  const percentatge = Math.min((notaFinal / 14) * 100, 100);

  // HTML base amb barra i nota (animada després)
  resultado.innerHTML = `
    <div class="result-box">
      <h2>Nota final d'accés:</h2>
      <p class="nota" id="notaAnimada"><strong>0.000</strong> / 14</p>

      <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
      </div>

      <p class="detalls">
        (Fase general: ${faseGeneralArrodonida} | Fase opcional: +${faseOpcionalArrodonida})
      </p>
      <p class="missatge">${missatge}</p>
      <button onclick="reiniciar()" class="reset-btn">Calcular de nou</button>
    </div>
  `;

  // --- Animació de la barra i del número ---
  const notaEl = document.getElementById('notaAnimada').querySelector('strong');
  const progressBar = document.getElementById('progressBar');
  const duracio = 1000; // mil·lisegons
  const fps = 60;
  const steps = duracio / (1000 / fps);
  let current = 0;
  const resultatBox = document.querySelector('.result-box');
  setTimeout(() => {
    resultatBox.scrollIntoView({
        behavior: 'smooth', // Desplaçament suau
        block: 'start'      // Col·loca l'inici del quadre de resultat a la part superior de la finestra
    });
}, 100);

  // animar número
  const interval = setInterval(() => {
    current++;
    const progress = current / steps;
    const valorActual = (notaFinal * progress).toFixed(3);
    notaEl.textContent = valorActual;
    if (current >= steps) clearInterval(interval);
  }, 1000 / fps);

  // animar barra
  progressBar.style.width = `${percentatge}%`;
}

function reiniciar() {
  document.getElementById('bach').value = "";
  document.getElementById('pau').value = "";
  document.getElementById('opt1').value = "";
  document.getElementById('opt2').value = "";
  document.getElementById('pond1').value = "0";
  document.getElementById('pond2').value = "0";
  document.getElementById('resultado').innerHTML = "";

}

const resultatBox = document.querySelector('.result-box');
if (notaFinal >= 10) resultatBox.style.background = '#e7f9ef';
else if (notaFinal >= 7) resultatBox.style.background = '#fffbe7';
else resultatBox.style.background = '#ffe7e7';

localStorage.setItem('bach', bach);
localStorage.setItem('pau', pau);

window.onload = () => {
  if (localStorage.getItem('bach')) document.getElementById('bach').value = localStorage.getItem('bach');
};
