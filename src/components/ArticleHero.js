import React from "react";
import { Button } from "semantic-ui-react";
import ArticleAuthor from "./ArticleAuthor";
class ArticleHero extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick(event) {
    const { name } = event.target;
    const { slug } = this.props.article;
    const { token } = localStorage;
    if (name === "delete") {
      const url = `https://conduit.productionready.io/api/articles/${slug}`;
      try {
        let response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        let data = await response.json();
        console.log("res ", data);
        if (!data.error) {
          this.props.handleDelete();
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  render() {
    const { title } = this.props.article;
    const { currentUser, article } = this.props;
    return (
      <section className="article-hero-section">
        <h3 className="article-title">{title}</h3>

        <div className="article-header-grid">
          <div>
            <ArticleAuthor article={this.props.article} />
          </div>
          {currentUser && currentUser.username === article.author.username && (
            <div className="article-hero-btn-grp">
              <div>
                <Button
                  content="Edit Article "
                  icon="edit"
                  labelPosition="left"
                />
              </div>
              <div>
                <Button
                  negative
                  content="Delete Article"
                  icon="delete"
                  labelPosition="left"
                  name="delete"
                  onClick={this.handleClick}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
export default ArticleHero;
