import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading.gif";

export default class News extends Component {
	apikey = process.env.REACT_APP_API_KEY1;
	// apikey = process.env.REACT_APP_API_KEY2;
	constructor() {
		super();
		this.state = {
			articles: [],
			page: 1,
			totalResults: 0,
			loading: false,
		};
	}

	fetchData = async (page, searchQuery) => {
		try {
			const url = searchQuery
				? `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.apikey}&page=${page}&pageSize=${this.props.pageSize}&q=${searchQuery}`
				: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.apikey}&page=${page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

			window.scrollTo(0, 0);
			this.setState({ loading: true });
			let data = await fetch(url);
			let parsedData = await data.json();
			this.setState({
				articles: parsedData.articles,
				page: page,
				totalResults: parsedData.totalResults,
				loading: false,
			});
		} catch (error) {
			console.error(error);
		}
	};

	componentDidMount() {
		this.fetchData(this.state.page, this.props.searchQuery);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.searchQuery !== this.props.searchQuery) {
			this.fetchData(1, this.props.searchQuery);
		}
	}

	prevOrNext = (direction) => {
		this.fetchData(
			direction === "prev" ? this.state.page - 1 : this.state.page + 1,
			this.props.searchQuery
		);
	};

	render() {
		let loadingStyle = {
			height: "70.4vh",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		};

		return (
			<div className="container mt-3">
				<h2 style={{ textAlign: "center" }}>
					<u>News Monkey - Top Headlines</u>
				</h2>
				{this.state.loading ? (
					<div style={loadingStyle}>
						<img
							src={Loading}
							alt="loading..."
							height={"75px"}
						></img>
					</div>
				) : (
					<>
						{this.state.articles.length === 0 &&
							!this.state.loading && (
								<div
									style={{
										height: "70.4vh",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<h3>No match found</h3>
								</div>
							)}
						<div className="row">
							{this.state.articles.map((e, idx) => {
								return (
									<div className="col-lg-4 col-md-6 col-sm-12 my-4" key={idx}>
										<NewsItem
											title={e.title}
											desc={e.description}
											imgUrl={e.urlToImage}
											newsUrl={e.url}
											author={e.author}
											source={e.source.name}
											date={e.publishedAt}
										/>
									</div>
								);
							})}
						</div>
						{this.state.articles.length !== 0 && (
							<div className="container d-flex justify-content-between">
								<button
									className="btn btn-primary"
									disabled={this.state.page <= 1}
									onClick={() => this.prevOrNext("prev")}
								>
									&larr; Prev
								</button>
								<button
									className="btn btn-primary"
									disabled={
										this.state.page >=
										Math.ceil(
											this.state.totalResults /
												this.props.pageSize
										)
									}
									onClick={() => this.prevOrNext("next")}
								>
									Next &rarr;
								</button>
							</div>
						)}
					</>
				)}
			</div>
		);
	}
}
