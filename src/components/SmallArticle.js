import React from 'react'
import ArticleAuthor from './ArticleAuthor'
import ArticlePreview from './ArticlePreview'
import LikesSection from './LikesSection'
class SmallArticle extends React.Component {
  render () {
    return (
      <div className='small-article'>
        <div className='small-article-top'>
          <ArticleAuthor article={this.props.article} />
          <LikesSection
            article={this.props.article}
            currentUser={this.props.currentUser}
          />
        </div>
        <ArticlePreview article={this.props.article} />
      </div>
    )
  }
}
export default SmallArticle

/**
 * 0:
author:
bio: "My bio is null"
following: false
image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fglyph%2F227%2FMoon-256.png&f=1&nofb=1"
username: "Jove2"
__proto__: Object
body: "AMP support is one of our advanced features, you can read more about it here."
createdAt: "2020-06-24T10:30:30.695Z"
description: "AMP support is one of our advanced features, you can read more about it here."
favorited: false
favoritesCount: 0
slug: "next-amp-5w7rzt"
tagList: (3) ["web", "js", "axios"]
title: "Next / AMP"
updatedAt: "2020-06-24T10:31:19.071Z"
 */
