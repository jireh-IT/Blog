import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: 9389,
  title: 'morph',
  author: 'Gloves',
  body: 'withdrawal',
};

export const sampleWithPartialData: IPost = {
  id: 20630,
  title: 'Dalasi',
  author: 'West',
  body: 'female',
};

export const sampleWithFullData: IPost = {
  id: 16317,
  title: 'Hip aw Rubber',
  author: 'outgoing',
  body: 'Investor Sausages Utah',
};

export const sampleWithNewData: NewPost = {
  title: 'intelligence Cotton North',
  author: 'Investment Hybrid Wagon',
  body: 'Hybrid down Crew',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
