import React from 'react';
import ReactDOM from 'react-dom';
/* import './index.css'; */

class Article extends React.Component {
	render() {
		const info = this.props.choice;
		const id = info.id;
		const editable = this.props.editable;
		if (info.id === editable) {
			return (
				<div className="article-container">
					<p key={info.id} className="article" onClick={() => this.props.onClick(info.id)}><b>{info.title}:</b></p>
					<form onSubmit={this.props.onSubmit}>
						<input
							name="content"
							value={info.content}
							onChange={this.props.onChange}
						/>
						<input type="submit" value="submit" />
					</form>
				</div>
			);
		} else {
			return (
				<div className="article-container">
					<p key={info.id} className="article" onClick={() => this.props.onClick(info.id)}><b>{info.title}:</b> {info.content}</p>
				</div>
			)				
		}
	};
};

class ArticleList extends React.Component {
	render() {
		const articles = this.props.articles;
		var paragraphs = [];
		for (var i=0; i < articles.length; i++) {
			paragraphs.push(<Article
				choice={articles[i]}
				key={articles[i].title}
				editable={this.props.editable}
				onClick={(i) => this.props.onClick(i)}
				onChange={(i) => this.props.onChange(i)}
				onSubmit={this.props.onSubmit.bind(this, i)}
				/>)
		};
		return (
		<div>
			{paragraphs}
		</div>	
		);
  	};
}

class AddArticle extends React.Component {
	render() {		
		return (
			<form onSubmit={this.props.onSubmit}>
				Title:<br />
				<input
					name="title_input"
					value={this.props.title_input}
					onChange={this.props.onChange}
				 /><br />
				Content:<br />
				<textarea
					name="content_input"
					value={this.props.content_input}
					onChange={this.props.onChange}
				 /><br />
				<input type="submit" value="submit" />
			</form>
		);
	}
}

class AllArticles extends React.Component {
	constructor() {
		super();
		this.state = {
			articles: {},
			initialized: false,
			editable: 0,
			title_input: "",
			content_input: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	

	componentWillMount() {
		const initial = [
			{
				"id": 1,
				"title": "Montclair",
				"content": "Has a vibe",
			},
			{
				"id": 2,
				"title": "Katniss",
				"content": "Everdeen",
			},
			{
				"id": 3,
				"title": "Andre",
				"content": "What a crazy guy",
			},
			{
				"id": 4,
				"title": "Starbucks",
				"content": "Corporate, but has wi-fi",
			},
		];
		if (!this.state.initialized) {
			this.setState({
				articles: initial,
				initialized: true,
			});
		};
	}
	
	handleClick(i) {
		this.setState({
			editable: i,
		});
	}
	
	handleChange(event) {
		const target = event.target;
		this.setState({
			[target.name]: target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		var articles = this.state.articles;
		articles[articles.length] = {
			"id": articles.length + 1,
			"title": this.state.title_input,
			"content": this.state.content_input,
		};
		this.setState({
			articles: articles,
			title_input: "",
			content_input: "",
			content_change: "",
		});
	}
	
	handleUpdate(event) {
		const target = event.target;
		var articles = this.state.articles;
		articles[this.state.editable-1].content = target.value;
		this.setState({
			articles: articles,
		});
	}
	
	handleResubmit(event) {
		this.setState({
			editable: null
		});
		event.preventDefault;
	}
		
	render() {
		return (
			<div>
				<ArticleList 
					articles={this.state.articles}
					editable={this.state.editable}
					onClick={(i) => this.handleClick(i)}
					onChange={(i) => this.handleUpdate(i)}
					onSubmit={(i) => this.handleResubmit(i)}
				/>
				<hr />
				<p className="add"><b>Add an article: </b></p>
				<AddArticle
					title_input={this.state.title_input}
					content_input={this.state.content_input}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}

}
ReactDOM.render(
	<AllArticles />,
	document.getElementById('root')
);

