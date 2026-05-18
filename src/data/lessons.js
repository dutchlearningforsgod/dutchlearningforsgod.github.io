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
      {
        question: 'One',
        correct: 'een'
      },

      {
        question: 'Two',
        correct: 'twee'
      },

      {
        question: 'Three',
        correct: 'drie'
      },

      {
        question: 'Four',
        correct: 'vier'
      },

      {
        question: 'Five',
        correct: 'vijf'
      },

      {
        question: 'Six',
        correct: 'zes'
      },

      {
        question: 'Seven',
        correct: 'zeven'
      },

      {
        question: 'Eight',
        correct: 'acht'
      },

      {
        question: 'Nine',
        correct: 'negen'
      },

      {
        question: 'Ten',
        correct: 'tien'
      }
    ]
  },
  {
  id: 3,
  title: 'Sentence Building',
  description: 'Build correct Dutch sentences',

  type: 'sentence-builder',

  questions: [
    {
      words: ['Ik', 'woon', 'in', 'Amsterdam'],
      correct: 'Ik woon in Amsterdam',
      prompt: 'I live in Amsterdam'   
    },

    {
      words: ['Hij', 'eet', 'een', 'appel'],
      correct: 'Hij eet een appel',
      prompt: 'He eats an apple'
    },

    {
      words: ['Wij', 'leren', 'Nederlands'],
      correct: 'Wij leren Nederlands',
      prompt: 'We are learning Dutch'
    }
  ]
  }

]

export default lessons