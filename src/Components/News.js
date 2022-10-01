import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

//aa3df7f1a78c40cd93c8231a98f746cb

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async updateNews() 
  {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3df7f1a78c40cd93c8231a98f746cb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false})
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews()
  }
  // async componentDidMount()
  // { 
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3df7f1a78c40cd93c8231a98f746cb&page=1&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({articles: parsedData.articles, 
  //         totalResults: parsedData.totalResults,
  //         loading: false})
  // }
  // handlePrevClick = async ()=>{
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3df7f1a78c40cd93c8231a98f746cb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     console.log(parsedData);  
  //     this.setState({
  //         page: this.state.page - 1,
  //         articles: parsedData.articles,
  //         loading: false
  //     })

  // }

  //  handleNextClick = async ()=>{
  //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  //     {
  //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3df7f1a78c40cd93c8231a98f746cb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //         this.setState({loading: true});
  //         let data = await fetch(url);
  //         let parsedData = await data.json()
  //         console.log(parsedData);  
  //         this.setState({
  //             page: this.state.page + 1,
  //             articles: parsedData.articles,
  //             loading: false
  //         })
  // }

  render() {

    return (
      <div className='container justify-content-between my-3'>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}


export default News