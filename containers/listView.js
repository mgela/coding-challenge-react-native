/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import {connect} from 'react-redux';

import {nav, back, articles, paginate} from '../actions'


export class ListView extends Component {
  constructor(props){
    super(props)
    //blocker, onEndReached getting called on render spamming mainview-> listview.
    this.state = {
      flatListReady:false
    }
  }

  //fetch items on component init
  componentDidMount(){
    this.fetchItems()
  }

  fetchItems = async ()=> {
    let totalPages = 0;
    let totalArticles = 0;
    const data = await fetch('https://demo.wp-api.org/wp-json/wp/v2/posts?per_page=10', {
      method: 'GET'
    })
    //get information from headers
    totalPages = data.headers.map["x-wp-totalpages"]["0"]
    totalArticles = data.headers.map["x-wp-total"]["0"]
    const json = await data.json()
    await console.log(json, 'jsondata');
    //remove non useful info
    const structureData = json.map(item => (
      { id: item.id, title: item.title.rendered, content: item.excerpt.rendered.replace(/(<([^>]+)>)/ig, '')}
    ))
    //avoid recalls when first page already fetched
    if (this.props.articlesList.length === 0){
        await this.props.articles(structureData, totalPages, totalArticles)
    }
  }

  //sorry flatlist acting funky
  onScroll = ()=> {
    this.setState({flatListReady:true})
  }

  paginate = async () => {
    try {
      // blockers for preventing onEndReached triggered
        if (!this.state.flatListReady) return null
        else {
          const fetchData = await fetch(`https://demo.wp-api.org/wp-json/wp/v2/posts?page=${this.props.nextPagePagination }&per_page=10`, {method: 'GET'})
          const data = await fetchData.json()
          const structureData =  data.map(article => (
            { id: article.id, title: article.title.rendered, content: article.excerpt.rendered.replace(/(<([^>]+)>)/ig, '')}
          ))
          //more blockers preventing onEndReached getting triggered
          if (this.props.totalPages !== this.props.articlesList.length && this.state.flatListReady){
             await this.props.paginate(structureData)
          }
        }
    } catch (e){
        console.log(e);
      }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* could refactor to pure component */}
          <FlatList
            data={this.props.articlesList}
            keyExtractor={(item)=> item.id}
            renderItem={( { item } )=> (
              <View style={styles.listView}>
                <Text style={{fontSize: 18, color: '#2196f3'}}>article ID:{item.id}</Text>
                <Text style={{fontSize: 23, color: '#2196f3'}}>{item.title}</Text>
                <Text style={{fontSize: 12, color: 'black'}}>{item.content}</Text>
              </View>
            )}
            onEndReached={()=>{this.paginate()}}
            onEndThreshold={0.01}
            onScroll={this.onScroll}
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
  articlesList: state.counterIncrease.actualArticles,
  totalPages : state.counterIncrease.totalPages,
  totalArticles: state.counterIncrease.totalArticles,
  nextPagePagination: state.counterIncrease.nextPage,
})

const mapDispatchToProps = (dispatch) => ({
  enterMainView: ()=> dispatch(nav()),
  resetNav: ()=> dispatch(back()),
  articles: (data, totalPages, totalArticles)=> dispatch(articles(data, totalPages, totalArticles)),
  paginate: (data)=> dispatch(paginate(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  listView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginTop: '6%'
  },
});
