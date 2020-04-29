import React from 'react';

import {Story} from '../types';
import {StoryItem} from './StoryItem';


interface Props {
  stories: Story[];
}


export const StoryList = (props: Props) => <ol>
  {props.stories.map((story) => <StoryItem key={story.id} {...story} />)}

  <style jsx>
    {`
      ol {
        list-style: none;
        padding-left: 0;
        margin-bottom: 0;
      }
    `}
  </style>
</ol>;
