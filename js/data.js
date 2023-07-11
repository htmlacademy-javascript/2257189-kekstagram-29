import { getRandomInteger } from './util.js';
import { createRandomIdFromRangeGenerator } from './util.js';

const FOTO_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENT_COUNT = 30;
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

const randomPostID = createRandomIdFromRangeGenerator(1, FOTO_COUNT);
const randomPhotoId = createRandomIdFromRangeGenerator(1, FOTO_COUNT);

//формируем один коммент

const createMessage = (commentId) => ({
  id: commentId,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message:  MESSAGES[getRandomInteger(0, MESSAGES.length - 1)] ,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

//формируем массив комментариев
const createCommentsArray = (number) => {
  const COMMENTS = [];
  const randomCommentID = createRandomIdFromRangeGenerator(1, number);

  for (let i = 0; i < number; i++) {
    const randomId = randomCommentID();
    COMMENTS.push(createMessage(randomId));
  }
  return COMMENTS;
};

//формируем пост

const createPost = () => ({
  id: randomPostID(),
  url:`photos/${randomPhotoId()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(1, DESCRIPTIONS.length - 1)],
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

export { createPostArray };
