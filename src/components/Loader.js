import React from 'react';
import { Dimmer, Loader, Image, Segment, Placeholder } from 'semantic-ui-react';
export function SmallArticleLoader () {
  return (
    <>
    <Placeholder>
    <Placeholder.Header image/>
      <Placeholder.Line />
      <Placeholder.Line />
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
  </>
  )
}
export function TagsLoader () {
  return (
    <Placeholder>
      <Placeholder.Header>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
    </Placeholder>
  )
}

export function FullPageFormLoader(){
  return (
    <div className='settings-form'>
    <Segment>
    <Dimmer active inverted>
      <Loader size='large'>Loading</Loader>
    </Dimmer>

    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  </Segment>
  </div>
  );
}
export function FullPageNormalLoader(){
  return (
    <Segment>
    <Dimmer active inverted>
      <Loader size='large'>Loading</Loader>
    </Dimmer>

    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  </Segment>
  );
}
