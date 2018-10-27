<template>
  <div>
    <div id="morphsearch" class="morphsearch">
      <div class="morphsearch-form">
        <input class="morphsearch-input" type="search" placeholder="What can we help you with?" title="What can we help you with?" @input="searchDeskpro"/>
      </div>
      <div class="morphsearch-result" v-show="show">
        <div class="row expanded">
          <div class="columns small-12 collection-result" v-if="articles.length">
            <h1><i class="fa fa-file-text-o"></i> Knowledgebase</h1>
            <ul>
              <li v-for="article in articles">
                <a :href="'https://wanalytics.deskpro.com/kb/articles/' + article.slug" target="_blank">
                  <span class="item-name">{{article.title}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="columns small-12 collection-result" v-if="news.length">
            <h1><i class="fa fa-calendar-o"></i> News</h1>
            <ul>
              <li v-for="news_item in news">
                <a :href="'https://wanalytics.deskpro.com/news/' + news_item.slug" target="_blank">
                  <span class="item-name">{{news_item.title}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="columns small-12 collection-result" v-if="topics.length">
            <h1><i class="fa fa-book"></i> Guides</h1>
            <ul>
              <li v-for="topic in topics">
                <a :href="'https://wanalytics.deskpro.com/guides/allocations/allocations-process/' + topic.slug" target="_blank">
                  <span class="item-name">{{topic.title}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="columns small-12 collection-empty" v-if="articles.length == 0 && news.length == 0 && topics.length == 0">
            <div>We couldn't find any results</div>
          </div>
        </div>
        <div class="row expanded">
          <div class="columns small-12 result-footer">
            <a href="https://wanalytics.deskpro.com/new-ticket" target="_blank">
              <i class="fa fa-comment"></i>
              <span>Contact Us</span>
            </a>
            <a href="https://wanalytics.deskpro.com/chat-logs" target="_blank">
              <i class="fa fa-comments"></i>
              <span>Start a chat session</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /morphsearch -->
</template>
<script>
  import _ from 'lodash'
  import deskproAPI from './../api/deskpro-api'
  import { Log } from './../helpers'

  var classie = require('../modules/classie');
  var Analytics = require('analytics-node');

  const analytics = new Analytics('Dy0QNnCp8KikotmDFBXziH1LqHtSVpVt');
  const gaId = 'UA-42900219-2';

  export default {
    name: "Morphsearch",
    data() {
      return {
        articles: [],
        chat_conversations: [],
        news: [],
        tickets: [],
        topics: [],
        show: false
      }
    },
    computed: {
      _ () {
        return _
      },
    },
    mounted() {
      let component = this;
      let morphClicked = false;

      $('body').click(function(e) {
        if(component.show) {
          morphClicked = $(e.target.offsetParent.offsetParent).hasClass('morphsearch') || $(e.target.offsetParent.offsetParent).hasClass('morphsearch-result')
          component.show = morphClicked;
        }
      });

      // $('.morphsearch-input').focusout(function() {
      //   setTimeout(function() {
      //     component.show = morphClicked;
      //   }, 100);
      // });
    },
    methods: {
      greet() {
        heap.track('Clicked FAQ', {'clicked': 'yes'});
      },
      searchDeskpro: _.debounce(function(e) {
        if(e.target.value.length >= 3) {
          let _params = {
            params: {
              query: e.target.value
            }
          };

          deskproAPI.search(_params, res => {
            this.articles = _.filter(res.grouped_results[0].results, { status: "published" });
            this.chat_conversations = _.filter(res.grouped_results[8].results, { status: "published" });
            this.news = _.filter(res.grouped_results[3].results, { status: "published" });
            this.tickets = _.filter(res.grouped_results[4].results, { status: "published" });
            this.topics = _.filter(res.grouped_results[9].results, { status: "published" });

            this.show = true;
          }, err => Log.put('Deskpro/search info err', err))
        }
      }, 500)
    }
  }
</script>
