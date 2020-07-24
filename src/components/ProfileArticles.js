import React from 'react'
import { Tab} from 'semantic-ui-react'
import ArticleList from './ArticleList'
import Pagination from './Pagination'
class ProfileArticle extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        activeIndex : 0,
        sArticle :null,
        fArticle: null,
        sACount: 0,
        fACount: 0,
        start: 0
      }
      this.handlePagination = this.handlePagination.bind(this);
    }
    handleTabChange = ((e, { activeIndex }) => {
      this.setState({start: 0});
      this.setState({ activeIndex });
    });
    handlePagination(num) {
      this.setState({start: num*10})
    }
    async componentDidMount(){
      // console.log
      const {username} = this.props.profile;
      const {start} = this.state;
      try {
        const url = `https://conduit.productionready.io/api/articles?author=${username}&limit=10&offset=${start}`;
        const response = await fetch(
          url,
          {
            method: 'GET'
          }
        );
        const data = await response.json();
        console.log('sarticles: ',data)
        if(!data.errors) {
          this.setState({ sArticles: data.articles });
          this.setState({sACount: data.articlesCount})
        }
      } catch (err) {
        console.error('Error:', err);
      }
      try {
        const url = `https://conduit.productionready.io/api/articles?favorited=${username}&limit=10&offset=${start}`;
        const response = await fetch(
          url,
          {
            method: 'GET'
          }
        );
        const data = await response.json();
        console.log('farticles: ',data);
        if(!data.errors) {
          this.setState({ fArticles: data.articles });
          this.setState({fACount: data.articlesCount})
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
    async componentDidUpdate(prevProps, prevState){
      const {start} = this.state;
      if(prevState.start !== start) {
        this.setState({sArticles:null}); 
        const {username} = this.props.profile;
        const {start} = this.state;
        try {
          const url = `https://conduit.productionready.io/api/articles?author=${username}&limit=10&offset=${start}`;
          const response = await fetch(
            url,
            {
              method: 'GET'
            }
          );
          const data = await response.json();
          console.log('sarticles: ',data)
          if(!data.errors) {
            this.setState({ sArticles: data.articles });
            this.setState({sACount: data.articlesCount})
          }
        } catch (err) {
          console.error('Error:', err);
        }
        this.setState({fArticles:null}); 
        try {
          const url = `https://conduit.productionready.io/api/articles?favorited=${username}&limit=10&offset=${start}`;
          const response = await fetch(
            url,
            {
              method: 'GET'
            }
          );
          const data = await response.json();
          console.log('farticles: ',data);
          if(!data.errors) {
            this.setState({ fArticles: data.articles });
            this.setState({fACount: data.articlesCount})
          }
        } catch (err) {
          console.error('Error:', err);
        }
      }
    }
    render() {
      
      const {activeIndex, sArticles, fArticles, fACount, sACount} = this.state;
      let panes = [
        {
          menuItem: 'My Articles',
          render: () => (
            <Tab.Pane>
              <ArticleList articles={sArticles} currentUser={this.props.currentUser}/>;
              <Pagination totalSize = {sACount} handlePagination={this.handlePagination}/>
            </Tab.Pane>
          )
        },
        {
          menuItem: 'Favorited Articles',
          render: () => (
            <Tab.Pane>
              <ArticleList articles={fArticles} currentUser={this.props.currentUser}/>
              <Pagination totalSize = {fACount} handlePagination={this.handlePagination}/>
            </Tab.Pane>
          )
        }
      ];
        return (
            <div className='profile-articles'>
            <Tab
            activeIndex={activeIndex}
        onTabChange={this.handleTabChange}
        menu={{ pointing: true }}
        panes={panes}
          />
          </div>
        );
    }
}
export default ProfileArticle;
