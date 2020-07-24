import React from 'react';
import SmallArticle from './SmallArticle';
import {Item} from 'semantic-ui-react'
import {SmallArticleLoader} from './Loader'
class ArticleList extends React.Component{
    Loaders = ()=>{
        let arr = new Array(10).fill(1);
        return arr.map((elem,index) =><SmallArticleLoader key={index}/>)
    };
    render(){
        // this.Loaders();
        const {articles } = this.props;
        return(
        <>
        <Item.Group>
        {
           !articles ? this.Loaders() :articles.map((article, index) =>{
                return <SmallArticle article={article} key={index} currentUser={this.props.currentUser}/>
            })
        }
       
        </Item.Group>
        </>
        );
    }
}
export default ArticleList;