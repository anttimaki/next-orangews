// User account at Hackernews.
export interface Author {
  id: string;
  karma: number;
  created: number;
  submitted: number[];
};


// Authors already loaded from API are stored in state.
export interface AuthorCache {
  [authorId: string]: Author;
};


// News story from Hackernews.
export interface Story {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  url: string;
};


// Stories already loaded from API are stored in state.
export interface StoryCache {
  [storyId: number]: Story;
};


// Combination of subcaches. Also used as a state interface for _app
// since the context provider also conforms to this signature.
export interface Cache {
  authorCache: AuthorCache;
  storyCache: StoryCache;
  updateAuthorCache: (author: Author) => void;
  updateStoryCache: (stories: Story[]) => void;
}
