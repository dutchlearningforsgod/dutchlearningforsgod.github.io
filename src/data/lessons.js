const lessons = [
  {
    id: 1,
    title: 'Greetings',
    description: 'Basic Dutch greetings',
 
    type: 'multiple-choice',
 
    questions: [
      {
        question: 'Hallo',
        correct: 'Hello',
        options: ['Goodbye', 'Please', 'Hello', 'Thanks']
      },
      {
        question: 'Dank je',
        correct: 'Thank you',
        options: ['Sorry', 'Thank you', 'Good morning', 'Goodbye']
      },
      {
        question: 'Tot ziens',
        correct: 'Goodbye',
        options: ['Goodbye', 'Hello', 'Please', 'Yes']
      }
    ]
  },
 
  {
    id: 2,
    title: 'Numbers 1–10',
    description: 'Learn Dutch numbers by typing',
 
    type: 'typing',
 
    questions: [
      { question: 'One',   correct: 'een'   },
      { question: 'Two',   correct: 'twee'  },
      { question: 'Three', correct: 'drie'  },
      { question: 'Four',  correct: 'vier'  },
      { question: 'Five',  correct: 'vijf'  },
      { question: 'Six',   correct: 'zes'   },
      { question: 'Seven', correct: 'zeven' },
      { question: 'Eight', correct: 'acht'  },
      { question: 'Nine',  correct: 'negen' },
      { question: 'Ten',   correct: 'tien'  }
    ]
  },
 
  {
    id: 3,
    title: 'Sentence Building',
    description: 'Build correct Dutch sentences from words',
 
    type: 'sentence-builder',
 
    questions: [
      {
        prompt: 'I live in Amsterdam',
        words: ['Ik', 'woon', 'in', 'Amsterdam'],
        correct: 'Ik woon in Amsterdam'
      },
      {
        prompt: 'He eats an apple',
        words: ['Hij', 'eet', 'een', 'appel'],
        correct: 'Hij eet een appel'
      },
      {
        prompt: 'We are learning Dutch',
        words: ['Wij', 'leren', 'Nederlands'],
        correct: 'Wij leren Nederlands'
      }
    ]
  },
 
  {
    id: 4,
    title: 'Matching Pairs',
    description: 'Match Dutch words to their English translations',
 
    type: 'matching',
 
    // Each question is one round of 4 pairs to match
    questions: [
      {
        pairs: [
          { dutch: 'Hond',   english: 'Dog'   },
          { dutch: 'Kat',    english: 'Cat'   },
          { dutch: 'Huis',   english: 'House' },
          { dutch: 'Water',  english: 'Water' }
        ]
      },
      {
        pairs: [
          { dutch: 'Boek',   english: 'Book'  },
          { dutch: 'Fiets',  english: 'Bike'  },
          { dutch: 'Brood',  english: 'Bread' },
          { dutch: 'Appel',  english: 'Apple' }
        ]
      },
      {
        pairs: [
          { dutch: 'School', english: 'School'  },
          { dutch: 'Stad',   english: 'City'    },
          { dutch: 'Trein',  english: 'Train'   },
          { dutch: 'Vliegtuig', english: 'Plane' }
        ]
      }
    ]
  },
 
  {
    id: 5,
    title: 'Listen & Type',
    description: 'Hear the Dutch word and type what you hear',
 
    type: 'listening',
 
    questions: [
      { dutch: 'Goedemorgen', hint: '(Good morning)' },
      { dutch: 'Hoe gaat het', hint: '(How are you)' },
      { dutch: 'Alsjeblieft',  hint: '(Please / Here you go)' },
      { dutch: 'Dank je wel',  hint: '(Thank you very much)' },
      { dutch: 'Tot morgen',   hint: '(See you tomorrow)' }
    ]
  }
]
 
export default lessons