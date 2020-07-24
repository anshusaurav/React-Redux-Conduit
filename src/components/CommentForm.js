import React from "react";
import { Form, Button } from "semantic-ui-react";
class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    if (event.target.name === "body") {
      this.setState({ body: event.target.value });
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { body } = this.state;
    const { token } = localStorage;
    const comment = { comment: { body } };
    const { slug } = this.props;
    const url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(comment),
      });
      let data = await response.json();
      if (!data.error) {
        this.setState({ body: "" });
        this.props.handleUpdate(true);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  render() {
    return (
      <Form reply onSubmit={this.handleSubmit}>
        <Form.TextArea
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}
export default CommentForm;
