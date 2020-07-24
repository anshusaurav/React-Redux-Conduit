import React from "react";
import { Button } from "semantic-ui-react";
import { TagsLoader } from "./Loader";
class TagsAside extends React.Component {
  constructor(props) {
    super(props);
    this.onClickTag = this.onClickTag.bind(this);
  }
  static get COLORLIST() {
    return [
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
    ];
  }
  onClickTag(event) {
    this.props.changeTag(event.target.textContent);
    this.props.handleAddTab();
  }
  Loaders = () => {
    let arr = new Array(5).fill(1);
    return arr.map((elem, index) => <TagsLoader key={index} />);
  };
  render() {
    const { tags } = this.props;
    return (
      <aside className="tags-section">
        <div className="tags-inner-div">
          {!tags
            ? this.Loaders()
            : tags.map((elem, index) => {
                return (
                  <Button
                    className="tag-btn"
                    basic
                    color={
                      TagsAside.COLORLIST[index % TagsAside.COLORLIST.length]
                    }
                    content={elem}
                    key={index}
                    onClick={this.onClickTag}
                  />
                );
              })}
        </div>
      </aside>
    );
  }
}
export default TagsAside;
