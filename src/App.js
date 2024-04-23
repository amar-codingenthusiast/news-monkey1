import React, { Component } from "react";
import {Navbar} from "./MyComponents/Navbar";
import News from "./MyComponents/News";
import Footer from "./MyComponents/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: "",
		};
	}

	handleSearch = (query) => {
		this.setState({ searchQuery: query });
	};

	render() {
		return (
			<Router>
				<Navbar onSearch={this.handleSearch} />
				<div style={{minHeight: "77.5vh"}}>
				<Routes>
					<Route
						path="/"
						element={
							<News
								key="general"
								pageSize={9}
								category="general"
								searchQuery={this.state.searchQuery}
							/>
						}
					/>
					<Route
						path="/business"
						element={
							<News
								key="business"
								pageSize={9}
								category="business"
							/>
						}
					/>
					<Route
						path="/sports"
						element={
							<News key="sports" pageSize={9} category="sports" />
						}
					/>
					<Route
						path="/entertainment"
						element={
							<News
								key="entertainment"
								pageSize={9}
								category="entertainment"
							/>
						}
					/>
					<Route
						path="/health"
						element={
							<News key="health" pageSize={9} category="health" />
						}
					/>
					<Route
						path="/science"
						element={
							<News
								key="science"
								pageSize={9}
								category="science"
							/>
						}
					/>
					<Route
						path="/technology"
						element={
							<News
								key="technology"
								pageSize={9}
								category="technology"
							/>
						}
					/>
				</Routes>
				</div>
				<Footer />
			</Router>
		);
	}
}
