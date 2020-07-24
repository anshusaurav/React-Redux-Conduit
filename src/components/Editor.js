import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button, TextArea, Input, Message } from "semantic-ui-react";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      errorMsgs: null,
      tagList: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    const { value, name } = event.target;
    switch (name) {
      case "title":
        this.setState({ title: value });
        break;
      case "description":
        this.setState({ description: value });
        break;
      case "body":
        this.setState({ body: value });
        break;
      case "tags":
        const tagsArr = value.split(" ");
        this.setState({ tagList: tagsArr });
        break;
      default:
        console.log("We are out of targets.");
    }
  }
  async onSubmit(event) {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    const { token } = localStorage;
    const article = { article: { title, description, body, tagList } };

    try {
      let response = await fetch(
        "https://conduit.productionready.io/api/articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(article),
        }
      );
      let data = await response.json();
      console.log("res ", data);
      if (!data.errors) {
        this.props.history.push("/");
      } else {
        const errors = [];
        for (const [key, value] of Object.entries(data.errors)) {
          errors.push(`${key} ${value}`);
        }
        this.setState({ errorMsgs: errors });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  render() {
    const { title, description, body, tagList, errorMsgs } = this.state;
    return (
      <>
        <h2>Write new article</h2>
        <Form className="editor-form" onSubmit={this.onSubmit}>
          <Form.Field>
            <Input
              placeholder="Article Title"
              name="title"
              onChange={this.onChange}
              value={title}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="What's this article about?"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              placeholder="Tell us more"
              name="body"
              onChange={this.onChange}
              value={body}
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Enter Tags"
              name="tags"
              onChange={this.onChange}
              value={tagList ? tagList.join(" ") : ""}
            />
          </Form.Field>
          {errorMsgs &&
            errorMsgs.map((msg, index) => (
              <Message key={index} color="red">
                {msg}
              </Message>
            ))}
          <Button type="submit">Publish</Button>
        </Form>
      </>
    );
  }
}

export default withRouter(Editor);
