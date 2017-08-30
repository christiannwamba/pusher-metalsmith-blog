var articleComment = {
  template:  `
    <div>
      <h3>Comments</h3>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Name" v-model="name" />
      </div>
      <div class="form-group">
        <textarea class="form-control" placeholder="Comment here..." v-model="content"></textarea>
      </div>
      <button class="btn btn-info" @click="onSubmit()">Submit</button>
      <h4 v-if="comments.length > 0">Existing comments</h4>
      <div class="list-group">
        <a class="list-group-item" v-for="comment in comments">
          <h4 class="list-group-item-heading">{{comment.name}}</h4>
          <p class="list-group-item-text">{{comment.content}}</p>
        </a>
      </div>
    </div>
  `,
  data() {
    return {
      comments: [],
      name: '',
      content: '',
      pusher: null,
      channel: null,
    }
  },
  created() {
    this.pusher = new Pusher('d90f998750290f316a0b', {
      encrypted: true
    });

    this.channel = window.location.pathname.replace(new RegExp('/', 'g'), '-');
    var channel = this.pusher.subscribe(this.channel);
    channel.bind('new-comment', (comment) => {
      this.comments.push(
        {name: comment.name, content: comment.content}
      )
    });
  },
  methods: {
    onSubmit() {
      const payload = {name: this.name, content: this.content, channel: this.channel};
      axios.post('http://localhost:2000/comment', payload)
        .then(response => {
          console.log(response);
        })
    }
  }
}
var app = new Vue({
  el: '#app',
  components: {
    'article-comment': articleComment
  }
})