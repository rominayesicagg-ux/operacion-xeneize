const challenges = [
  {
    title: "EL RUGIDO DE LA BOMBONERA",
    question: "¿Qué momento te haría vibrar más?",
    options: [
      "Escuchar a toda la Bombonera cantando al unísono",
      "Vivir la salida de Boca entre papelitos y banderas"
    ]
  },
  {
    title: "CORAZÓN AL LÍMITE",
    question: "¿Qué instante te aceleraría más el corazón?",
    options: [
      "Un gol en el último minuto que cambia todo",
      "Una definición por penales con el campeonato en juego"
    ]
  },
  {
    title: "LA LOCURA XENEIZE",
    question: "¿Dónde elegirías vivir una experiencia inolvidable?",
    options: [
      "En medio de la hinchada, saltando y cantando",
      "Detrás del arco, viendo de cerca cómo llega el gol"
    ]
  },
  {
    title: "EL SUPERCLÁSICO",
    question: "¿Qué momento elegirías?",
    options: [
      "Ver a Boca salir a la cancha frente al eterno rival",
      "Gritar un gol decisivo en pleno Superclásico"
    ]
  },
  {
    title: "LA FE INQUEBRANTABLE",
    question: "¿Qué te representa más?",
    options: [
      "Creer hasta el último segundo que Boca puede ganar",
      "Sentir que nunca hay que bajar los brazos, pase lo que pase"
    ]
  },
  {
    title: "EXPLOSIÓN DE ALEGRÍA",
    question: "¿Qué festejo elegirías vivir?",
    options: [
      "Un gol que consagra a Boca campeón",
      "Una victoria inolvidable frente a River"
    ]
  },
  {
    title: "UNA PASIÓN QUE SE HEREDA",
    question: "¿Qué experiencia te emocionaría más?",
    options: [
      "Entrar a la Bombonera por primera vez con tu familia",
      "Festejar un gol abrazado a quienes comparten tu pasión"
    ]
  },
  {
    title: "EL ORGULLO XENEIZE",
    question: "¿Qué define mejor tu sentimiento?",
    options: [
      "Boca es una pasión que se vive en cada partido",
      "Boca es parte de tu vida, ganes o pierdas"
    ]
  }
];

let currentChallenge = 0;
const answers = [];

function narrar(texto, alTerminar) {
  window.speechSynthesis.cancel();

  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-AR";
  voz.rate = 0.92;
  voz.pitch = 0.85;
  voz.volume = 1;

  voz.onend = () => {
    if (typeof alTerminar === "function") {
      alTerminar();
    }
  };

  window.speechSynthesis.speak(voz);
}

function showChallenge() {
  const challenge = challenges[currentChallenge];

  document.getElementById("app").innerHTML = `
    <section class="screen">
      <p class="eyebrow">OPERACIÓN XENEIZE</p>
      <h2>DESAFÍO ${currentChallenge + 1} / 8</h2>
      <h1>${challenge.title}</h1>
      <p class="intro">${challenge.question}</p>

      <div class="options">
        ${challenge.options.map((option, index) => `
          <button
            class="option"
            onclick="selectAnswer(${index})"
          >
            ${option}
          </button>
        `).join("")}
      </div>

      <p class="progress">
        ${currentChallenge + 1} DE 8 DESAFÍOS
      </p>
    </section>
  `;

  const texto = `${challenge.title}. ${challenge.question}. Opción uno: ${challenge.options[0]}. Opción dos: ${challenge.options[1]}.`;

  narrar(texto);
}

function selectAnswer(index) {
  answers.push({
    challenge: currentChallenge + 1,
    answer: index,
    text: challenges[currentChallenge].options[index]
  });

  currentChallenge++;

  if (currentChallenge < challenges.length) {
    showChallenge();
  } else {
    showFinal();
  }
}

function showFinal() {
  document.getElementById("app").innerHTML = `
    <section class="screen">
      <p class="eyebrow">MISIÓN COMPLETADA</p>

      <h1>¡AGUSTÍN!</h1>

      <h2>LO LOGRASTE</h2>

      <p class="intro">
        Ocho desafíos. Ocho decisiones.
        Una pasión que no tiene límites.
      </p>

      <h1><span>XENEIZE</span></h1>

      <p class="intro">
        Pero la verdadera sorpresa todavía no apareció.
      </p>

      <h2>LA MISIÓN CONTINÚA...</h2>

      <p class="intro">
        Prepará tu corazón, levantate y salí.
        Hay algo extraordinario esperándote.
      </p>

      <button id="finishButton">TERMINAR</button>
    </section>
  `;

  narrar(
    "¡Agustín! ¡Misión completada! Superaste los ocho desafíos demostrando que la pasión Xeneize se lleva en el corazón. Pero atención... esto todavía no terminó. La verdadera sorpresa está esperando afuera. ¡Preparáte, levantate y salí! ¡Lo mejor está por comenzar!"
  );

  document.getElementById("finishButton").addEventListener("click", () => {
    window.speechSynthesis.cancel();

    document.getElementById("app").innerHTML = `
      <section class="screen">
        <h1>OPERACIÓN FINALIZADA</h1>
        <p class="intro">Ya podés cerrar esta pantalla.</p>
      </section>
    `;
  });
}
document.getElementById("startButton").addEventListener("click", () => {
  const boton = document.getElementById("startButton");

  boton.disabled = true;

  currentChallenge = 0;
  answers.length = 0;

  narrar(
    "¡Señoras y señores! ¡Atención, Agustín! Hoy comienza una experiencia extraordinaria. Ocho desafíos, una pasión y una sorpresa que te está esperando. ¡Que comience Operación Xeneize!",
    () => {
      document.getElementById("app").innerHTML = `
        <section class="screen">
          <p class="eyebrow">OPERACIÓN XENEIZE</p>
          <h1>¿ESTÁS LISTO?</h1>
          <p class="intro">
            La misión está por comenzar.
            Ocho desafíos te esperan.
          </p>
          <button id="continueButton">CONTINUAR</button>
        </section>
      `;

      document.getElementById("continueButton").addEventListener("click", () => {
        showChallenge();
      });
    }
  );
});
