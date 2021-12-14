import React from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Setting } from './pages/setting/setting';

function App() {

	return (
		<div className="App">
			<HashRouter>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/setting">
						<Setting />
					</Route>
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;
