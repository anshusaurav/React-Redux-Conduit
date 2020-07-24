import React from "react";
import { Item, Button } from "semantic-ui-react";
class ArticleDetails extends React.Component {
  render() {
    const { body, tagList } = this.props.article;
    console.log(tagList);
    return (
      <div className="article-details-div">
        <Item>
          <Item.Content>
            <Item.Description>{body}</Item.Description>
            <Item.Meta>
              {tagList.map((elem) => {
                return <Button size="tiny">{elem}</Button>;
              })}
            </Item.Meta>
          </Item.Content>
        </Item>
      </div>
    );
  }
}
export default ArticleDetails;
