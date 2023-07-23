const VF = Vex.Flow;// Get the required elements from the DOM
const { Accidental } = Vex.Flow;

const rhythmsData = {
    quarter: 'q', // For quarter notes
    eighth: '8',  // For eighth notes
    sixteenth: '16', // For sixteenth notes
    // Add more rhythms and their corresponding durations as needed
};

// Get the required elements from the DOM
const generateBtn = document.getElementById('generate-btn');
const noteGenerator = document.querySelector('.note-generator');
const levelSelector = document.getElementById('level-selector');

// An object to hold the notes data for different levels
const levelsData = {
    1: {
        rhythms: ['quarter'],
    },
    2: {
        rhythms: ['quarter', 'eighth'],
    },
    3: {
        rhythms: ['quarter', 'eighth', 'sixteenth'],
    },
};

// Function to generate random notes based on the selected level
function generateRandomNotes() {
    // Clear any existing notes
    noteGenerator.innerHTML = '';

    // Get the selected level from the dropdown menu
    const selectedLevel = parseInt(levelSelector.value);

    // Create a new VexFlow Renderer and SVG context
    const div = document.createElement('div');
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(1000, 600); // Adjust the width to accommodate multiple staves

    // Array to hold the voices
    const voices = [];

    // X and Y coordinates for the first stave
    let xCoordinate = 10;
    let yCoordinate = 40;

    // Loop to create the voices
    for (let i = 0; i < 4; i++) {
        // Create a new stave to hold the music notes
        const stave = new VF.Stave(xCoordinate, yCoordinate, 220); // Adjust width and height as needed
        stave.setContext(renderer.getContext()).draw(); // Draw the stave on the SVG canvas

        // Create an empty array to hold the notes for this group
        const notes = [];

        // Get the rhythms for the selected level
        const rhythms = levelsData[selectedLevel].rhythms;

        rhythms.forEach((rhythm) => {
            // Create four random notes for the selected rhythm
            for (let j = 0; j < 4; j++) {
                const randomNote = getRandomNoteForRhythm(rhythm);
                const accidentals = ['b', '#', ''];
                const randomAccidental = accidentals[Math.floor(Math.random() * accidentals.length)];

                // Check if accidental is empty string ('')
                if (randomAccidental === '') {
                    // Create a rest note (note with no pitch)
                    notes.push(
                        new VF.StaveNote({
                            clef: 'treble',
                            keys: ['b/4'], // Use any note with a pitch here, it will be treated as a rest
                            duration: rhythmsData[rhythm],
                        })
                    );
                } else {
                    notes.push(
                        new VF.StaveNote({
                            clef: 'treble',
                            keys: [randomNote],
                            duration: rhythmsData[rhythm],
                        }).addModifier(new Accidental(randomAccidental))
                    );
                }
            }
        });

        // Create a voice to hold the notes for this group
        const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);

        // Add the voice to the array
        voices.push({ stave, voice });

        // Increment the x coordinate for the next stave
        xCoordinate += 240; // Adjust the horizontal spacing between staves
    }

    // Format and draw the voices
    voices.forEach(({ stave, voice }) => {
        const formatter = new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
        voice.draw(renderer.getContext(), stave);
    });

    // Append the SVG canvas to the note generator section
    noteGenerator.appendChild(div);
}

// Add a click event listener to the Generate button
generateBtn.addEventListener('click', generateRandomNotes);




// Function to get a random note for a given rhythm
function getRandomNoteForRhythm(rhythm) {
    const notes = ['e', 'f', 'g', 'a', 'b', 'c', 'd'];
    const octaves = ["/3", "/4", "/5"];
    const accidentals = ['', 'b', '#']; // Empty string for no accidental
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    const randomOctave = octaves.filter(octave => !(randomNote === 'c' || randomNote === 'd') || octave !== '/5')[Math.floor(Math.random() * (octaves.length - 1))];

    let duration;
    switch (rhythm) {
        case 'quarter':
            duration = 'q';
            break;
        case 'eighth':
            duration = '8';
            break;
        case 'sixteenth':
            duration = '16';
            break;
        default:
            duration = 'q';
    }

    // Only add accidental if it's not an 'e' note in the '/3' octave
    let randomAccidental = '';
    if (!(randomNote === 'e' && randomOctave === '/3')) {
        randomAccidental = accidentals[Math.floor(Math.random() * accidentals.length)];
    }

    return randomNote + (randomAccidental || '') + randomOctave + duration;
}


// Add a click event listener to the Generate button
generateBtn.addEventListener('click', generateRandomNotes);


// Add a click event listener to the Generate button
generateBtn.addEventListener('click', generateRandomNotes);

