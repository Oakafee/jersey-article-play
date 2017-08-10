import React from 'react';

class Article extends React.Component {
	render() {
		const info = this.props.choice;
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
				onSubmit={(i) => this.props.onSubmit(i)}
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
	componentWillMount() {
		console.log("Value is: " + this.props.value);
	}
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

export default {ArticleList, AddArticle};