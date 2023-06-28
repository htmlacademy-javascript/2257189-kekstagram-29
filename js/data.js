// import { getRandomInteger } from './util.js';
// import { createRandomIdFromRangeGenerator } from './util.js';



const FOTO_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENT_COUNT = 30;
const randomCommentID = createRandomIdFromRangeGenerator(1, FOTO_COUNT);
const randomPostID = createRandomIdFromRangeGenerator(1, FOTO_COUNT);
const NAMES = [
  'Алексей',
  'Борис',
  'Виктор',
  'Геннадий',
  'Дмитрий',
  'Евгений',
  'Жозе',
  'Златан',
  'Игорь',
  'Константин',
  'Леонид',
  'Максим',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Что то невероятное',
  'Лучший вид',
  'Красота неописуемая',
  'Видел и лучше',
  'Как это развидеть'
];
// генератор случайного неповторяющегося числа

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//формируем один коммент

const createMessage = () => ({
  id: randomCommentID(1, COMMENT_COUNT),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message:  MESSAGES[getRandomInteger(0, MESSAGES.length - 1)] ,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

//формируем массив комментариев
const createCommentsArray = (number) => {
  const COMMENTS = [];
  for (let i = 0; i < number; i++) {
    COMMENTS.push(createMessage());
  }
  return COMMENTS;
};

//формируем пост

const createPost = () => ({
  id: randomPostID(),
  url:`photos/${randomPostID()}.jpg`,
  descripption: DESCRIPTIONS[getRandomInteger(1, DESCRIPTIONS.length - 1)],
  likes:getRandomInteger(LIKE_MIN, LIKE_MAX),
  comments: createCommentsArray(getRandomInteger(0, COMMENT_COUNT))
});

//формируем массив постов

const createPostArray = (number) => {
  const POSTS = [];
  for(let i = 0; i < number; i++) {
    POSTS.push(createPost());
  }
  return POSTS;
};

createPostArray(FOTO_COUNT);