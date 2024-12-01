const frequencyBar = document.getElementById('currentFrequency');
const frequencyText = document.getElementById('frequencyText');
const dial = document.getElementById('dial');
const audioControl = document.getElementById('audio_F');
const audioPlayer = document.getElementById('audioPlayer');
const radioToggleButton = document.getElementById('radioToggle');

let frequency = 87.5;
const minFrequency = 87.5;
const maxFrequency = 108.0;
const step = 0.1;

let isMuted = false;
let volume = 0.0;

let angleDial = 0;
const dialAngleStep = 5;

let angleVolume = 0; // Початковий кут для гучності
const volumeMinAngle = 0;
const volumeMaxAngle = 360;

const stations = {
    90.0: './media_on_audio/sadsvit-kaseta-(meloua.com).mp3',
    95.5: './media_on_audio/skryabin-ne-treba.mp3',
    96.9: './media_on_audio/sadsvit-personazhi-(meloua.com).mp3',
    102.3: './media_on_audio/Океан Ельзи – Там, де нас нема.mp3',
    103.1: './media_on_audio/Spiderbait - Black Betty.mp3',
    108.0: './media_on_audio/document_5350290084031652453.mp3'
};

const whiteNoise = './media_on_audio/white-noise-8117.mp3';

function updateFrequencyBar() {
    const percent = ((frequency - minFrequency) / (maxFrequency - minFrequency)) * 100;
    frequencyBar.style.left = `${percent}%`;
    frequencyText.textContent = `${frequency.toFixed(1)} МГц`; // Без тексту "Частота"

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
    element.style.transform = `rotate(${angle}deg)`;
}

function onDialRotate(event) {
    const direction = event.deltaY > 0 ? 1 : -1;

    angleDial += direction * dialAngleStep;
    rotateElement(dial, angleDial);

    frequency += direction * step;
    frequency = Math.min(maxFrequency, Math.max(minFrequency, frequency));
    updateFrequencyBar();
}

function onVolumeRotate(event) {
    const direction = event.deltaY > 0 ? 1 : -1;

    const newAngle = angleVolume + direction * dialAngleStep;

    // Блокування обертання за межі 90-359 градусів
    if (newAngle >= 0 && newAngle <= 360) {
        angleVolume = newAngle;
        rotateElement(audioControl, angleVolume);

        // Обчислення гучності на основі кута
        const normalizedAngle = angleVolume - volumeMinAngle; // Відносний кут (90 -> 0)
        volume = normalizedAngle / (volumeMaxAngle - volumeMinAngle);
        updateVolume();
    }
}

dial.addEventListener('mouseenter', () => {
    window.addEventListener('wheel', onDialRotate);
});

dial.addEventListener('mouseleave', () => {
    window.removeEventListener('wheel', onDialRotate);
});

audioControl.addEventListener('mouseenter', () => {
    window.addEventListener('wheel', onVolumeRotate);
});

audioControl.addEventListener('mouseleave', () => {
    window.removeEventListener('wheel', onVolumeRotate);
});

radioToggleButton.addEventListener('click', () => {
    isMuted = !isMuted;
    radioToggleButton.style.backgroundColor = isMuted ? '#501d18' : 'rgb(238, 31, 31)';
    audioPlayer.volume = isMuted ? 0 : volume;
});

updateFrequencyBar();
updateVolume();




const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');

openModalBtn.addEventListener('click', () => {
    modal.style.right = '0';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.right = '-100%';
});
