import React from "react";
import ArticleAuthor from "./ArticleAuthor";
import ArticlePreview from "./ArticlePreview";
import LikesSection from "./LikesSection";
class SmallArticle extends React.Component {
  render() {
    return (
      <div className="small-article">
        <div className="small-article-top">
          <ArticleAuthor article={this.props.article} />
          <LikesSection
            article={this.props.article}
            currentUser={this.props.currentUser}
          />
        </div>
        <ArticlePreview article={this.props.article} />
      </div>
    );
  }
}
export default SmallArticle;
