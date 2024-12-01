const frequencyBar = document.getElementById('currentFrequency');
const dial = document.getElementById('dial');
const audioControl = document.getElementById('audio_F');
const audioPlayer = document.getElementById('audioPlayer');
const radioToggleButton = document.getElementById('radioToggle');

let frequency = 87.5;
const minFrequency = 87.5;
const maxFrequency = 108.0;
const step = 0.05; // Зменшений крок для плавного обертання

let isMuted = false;
let volume = 0; // Початковий рівень гучності — 0 (мутовано)

const stations = {
    90.0: './media_on_audio/sadsvit-kaseta-(meloua.com).mp3',
    95.5: './media_on_audio/skryabin-ne-treba.mp3',
    96.9: './media_on_audio/sadsvit-personazhi-(meloua.com).mp3',
    102.3: './media_on_audio/Океан Ельзи – Там, де нас нема.mp3',
    103.1: './media_on_audio/Spiderbait - Black Betty.mp3',
    108.0: './media_on_audio/document_5350290084031652453.mp3'
};

const whiteNoise = './media_on_audio/white-noise-8117.mp3';

let angleDial = 0; 
let angleAudioControl = 0;

const maxAngle = 360; 
const minAngle = 0; 
const dialAngleStep = 7; // Плавне обертання для частоти
const audioAngleStep = 5; // Крок крутіння для гучності

function updateFrequencyBar() {
    const percent = ((frequency - minFrequency) / (maxFrequency - minFrequency)) * 100;
    frequencyBar.style.left = `${percent}%`;
    frequencyText.textContent = `${frequency.toFixed(1)} МГц`;

    const roundedFrequency = parseFloat(frequency.toFixed(1));
    const currentStation = stations[roundedFrequency];

    if (currentStation) {
        audioPlayer.src = currentStation;
        audioPlayer.play();
    } else {
        audioPlayer.src = whiteNoise;
        audioPlayer.play();
    }

    if (!isMuted) {
        audioPlayer.volume = volume;
    }
}

function updateVolume() {
    if (!isMuted) {
        audioPlayer.volume = volume;
    }
}

function rotateElement(element, angle) {
    if (angle >= maxAngle) angle = maxAngle;
    if (angle <= minAngle) angle = minAngle;
    element.style.transform = `rotate(${angle}deg)`;

    const indicator = element.querySelector('::before');
    if (indicator) {
        indicator.style.transform = `rotate(${angle}deg)`;
    }
}

dial.addEventListener('mouseenter', () => {
    window.addEventListener('wheel', onDialRotate);
});

dial.addEventListener('mouseleave', () => {
    window.removeEventListener('wheel', onDialRotate);
});

audioControl.addEventListener('mouseenter', () => {
    window.addEventListener('wheel', onAudioControlRotate);
});

audioControl.addEventListener('mouseleave', () => {
    window.removeEventListener('wheel', onAudioControlRotate);
});

function onDialRotate(event) {
    const direction = event.deltaY > 0 ? 1 : -1;

    angleDial += direction * dialAngleStep;
    if (angleDial >= maxAngle) angleDial = maxAngle;
    if (angleDial <= minAngle) angleDial = minAngle;
    rotateElement(dial, angleDial);

    frequency += direction * step;
    frequency = Math.min(maxFrequency, Math.max(minFrequency, frequency)); // Частота обмежена лише максимумом та мінімумом
    updateFrequencyBar();
}

function onAudioControlRotate(event) {
    const direction = event.deltaY > 0 ? 1 : -1;
    angleAudioControl += direction * audioAngleStep;

    if (angleAudioControl >= maxAngle) angleAudioControl = maxAngle;
    if (angleAudioControl <= minAngle) angleAudioControl = minAngle;

    rotateElement(audioControl, angleAudioControl);

    volume = angleAudioControl / maxAngle;
    volume = Math.min(1, Math.max(0, volume));
    updateVolume();
}

radioToggleButton.addEventListener('click', () => {
    isMuted = !isMuted;
    radioToggleButton.textContent = isMuted ? '' : '';
    radioToggleButton.style.backgroundColor = isMuted ? '#501d18' : 'rgb(238, 31, 31)';
    audioPlayer.volume = isMuted ? 0 : volume;
});

// Оновлюємо частоту та гучність при завантаженні сторінки
updateFrequencyBar();
updateVolume();

// Початковий кут для крутилки гучності, що відповідає нулю гучності
rotateElement(audioControl, 0);



const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');

openModalBtn.addEventListener('click', () => {
    modal.style.right = '0';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.right = '-100%';
});
