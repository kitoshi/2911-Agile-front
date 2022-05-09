import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, '../home.html'), 'utf8')
const makeFetchtoBackEndToGetData = require('./app')
let dom
let container

data = [
  {
    _id: '6272b2e349b22bb576873e7f',
    title: 'Blade',
    votes: 4,
    rating: 'R',
    year: '1998',
    trailer: 'https://www.youtube.com/watch?v=O2Y3FFFIvRI',
    summary:
      'A half-vampire, half-mortal man becomes a protector of the mortal race, while slaying evil vampires.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e7e',
    title: 'The Matrix',
    votes: 16,
    rating: 'R',
    year: '1999',
    trailer: 'https://www.youtube.com/watch?v=nUEQNVV3Gfs',
    summary:
      'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e81',
    title: 'John Wick',
    votes: 0,
    rating: 'R',
    year: '2014',
    trailer: 'https://www.youtube.com/watch?v=2AUmvWm5ZDQ',
    summary:
      'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e82',
    title: 'Spider-Man: Into the Spider-Verse',
    votes: 0,
    rating: 'PG',
    year: '2018',
    trailer: 'https://www.youtube.com/watch?v=MOUaWWa75cs',
    summary:
      'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e80',
    title: 'Forrest Gump',
    votes: 0,
    rating: 'PG-13',
    year: '1994',
    trailer: 'https://www.youtube.com/watch?v=Mj9IA9tTfio',
    summary:
      'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e84',
    title: 'Ex Machina',
    votes: 0,
    rating: 'R',
    year: '2014',
    trailer: 'https://www.youtube.com/watch?v=gyKqHOgMi4g',
    summary:
      'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e85',
    title: 'Black Panther',
    votes: 0,
    rating: 'PG-13',
    year: '2018',
    trailer: 'https://www.youtube.com/watch?v=xjDjIWPwcPU',
    summary:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e86',
    title: 'Superbad',
    votes: 0,
    rating: 'R',
    year: '2007',
    trailer: 'https://www.youtube.com/watch?v=LvKvus3vCEY',
    summary:
      'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e83',
    title: 'Inception',
    votes: 0,
    rating: 'PG-13',
    year: '2010',
    trailer: 'https://www.youtube.com/watch?v=BlrQvE-OhD4',
    summary:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e88',
    title: 'The Notebook',
    votes: 0,
    rating: 'PG-13',
    year: '2004',
    trailer: 'https://www.youtube.com/watch?v=yDJIcYE32NU',
    summary:
      'A poor yet passionate young man (Ryan Gosling) falls in love with a rich young woman (Rachel McAdams), giving her a sense of freedom, but they are soon separated because of their social differences.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e89',
    title: 'Frozen',
    votes: 0,
    rating: 'PG',
    year: '2013',
    trailer: 'https://www.youtube.com/watch?v=TbQm5doF_Uc',
    summary:
      'When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e8b',
    title: 'The 40-Year-Old Virgin',
    votes: 0,
    rating: 'R',
    year: '2005',
    trailer: 'https://www.youtube.com/watch?v=b9TeAHszSh0',
    summary:
      "Goaded by his buddies, a nerdy guy who's never 'done the deed' only finds the pressure mounting when he meets a single mother.",
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e8f',
    title: 'Spirited Away',
    votes: 0,
    rating: 'PG',
    year: '2001',
    trailer: 'https://www.youtube.com/watch?v=ieaXFu4wcXI',
    summary:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e8d',
    title: 'The Dark Knight',
    votes: 0,
    rating: 'PG-13',
    year: '2008',
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    summary:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e8e',
    title: 'It Follows',
    votes: 0,
    rating: 'R',
    year: '',
    trailer: 'https://www.youtube.com/watch?v=HkZYbOH0ujw',
    summary:
      'A young woman is followed by an unknown supernatural force after a sexual encounter.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e90',
    title: 'Train to Busan',
    votes: 0,
    rating: 'R',
    year: '2016',
    trailer: 'https://www.youtube.com/watch?v=pyWuHv2-Abk',
    summary:
      'While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e8c',
    title: 'Nobody',
    votes: 0,
    rating: 'R',
    year: '2021',
    trailer: 'https://www.youtube.com/watch?v=wZti8QKBWPo',
    summary:
      'A docile family man slowly reveals his true character after his house gets burgled by two petty thieves, which, coincidentally, leads him into a bloody war with a Russian crime boss.',
    __v: 0
  },
  {
    _id: '6272b2e349b22bb576873e91',
    title: 'Kill Zone',
    votes: 0,
    rating: 'R',
    year: '2005',
    trailer: 'https://www.youtube.com/watch?v=JmJyXOIgyV4',
    summary:
      'A near retired inspector and his unit are willing to put down a crime boss at all costs while dealing with his replacement, who is getting in their way. Meanwhile, the crime boss sends his top henchmen to put an end to their dirty schemes.',
    __v: 0
  }
]

describe('makeFetchtoBackEndToGetData tests', () => {
  test('adding 1 + 2 should return 3', () => {
    expect(makeFetchtoBackEndToGetData()).toBe(data)
  })
})

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull()
    expect(getByText(container, 'Pun Generator')).toBeInTheDocument()
  })
})
