// User account at Hackernews.
export interface Author {
  'id': string;
  'karma': number;
  'created': number;
  'submitted': number[];
};


// News story from Hackernews.
export interface Story {
  'by': string;
  'id': number;
  'score': number;
  'time': number;
  'title': string;
  'url': string;
};


// Stories already loaded from API are stored in state.
export interface StoryCache {
  [storyId: number]: Story;
};
