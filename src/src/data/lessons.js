const lessons = [
  {
    id: 1,
    title: 'Greetings',
    description: 'Basic Dutch greetings',

    questions: [
      {
        word: 'Hallo',
        correct: 'Hello',
        options: ['Goodbye', 'Please', 'Hello', 'Thanks']
      },

      {
        word: 'Dank je',
        correct: 'Thank you',
        options: ['Sorry', 'Thank you', 'Good morning', 'Goodbye']
      },

      {
        word: 'Tot ziens',
        correct: 'Goodbye',
        options: ['Goodbye', 'Hello', 'Please', 'Yes']
      }
    ]
  },

  {
    id: 2,
    title: 'Numbers',
    description: 'Learn Dutch numbers',

    questions: [
      {
        word: 'Een',
        correct: 'One',
        options: ['Two', 'One', 'Three', 'Four']
      },

      {
        word: 'Twee',
        correct: 'Two',
        options: ['Five', 'One', 'Two', 'Ten']
      }
    ]
  }
]

export default lessons