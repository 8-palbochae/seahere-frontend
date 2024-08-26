import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	LoginChoice,
	Layout,
	Setting,
	Main,
	InventoryView,
	Income,
	SignUp,
	HistoryOutlet,
	TradeView,
	Cart,
} from "./pages";
import {
	MainSetting,
	UserInfoSetting,
	QrInfo,
	PasswordChange,
	TeamInfo,
	InventorySetting,
	Alarm,
} from "./components/setting";
import {
	SignUpBroker,
	SignUpBrokerChoice,
	SignUpInfo,
} from "./components/login_signup";
import {
	History,
	OutgoingList,
	IncomingList,
	OutgoingReqList,
	AdjustList,
} from "./components/history";
import { TradeMain, TradeBrokerMain } from "./components/trade";
import AlarmHistory from "./components/common/header/AlarmHistory";
import BrokerMain from "./components/main/broker/BrokerMain";
import AxiosInstanceTest from "./components/common/AxiosInstanceTest";
import PrivateRoute from "./components/common/PrivateRoute";
import SocialLoading from "./components/login_signup/SocialLoading";
import Sales from "./pages/Sales";
import SalesMain from "./components/sale/page/SalesMain";
import { TokenProvider } from "./hooks/fcm/TokenContext";

function App() {
	return (
		<div className="flex justify-center items-center bg-gray-100 jsu">
			<TokenProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<LoginChoice />} />
						<Route path="/loading" element={<SocialLoading />} />
						<Route path="/signup" element={<SignUp />}>
							<Route path="" element={<SignUpInfo />} />
							<Route path="broker" element={<SignUpBroker />} />
							<Route
								path="broker-choice"
								element={<SignUpBrokerChoice />}
							/>
						</Route>

						<Route element={<PrivateRoute />}>
							<Route element={<Layout />}>
								<Route path="/" element={<BrokerMain />} />
								<Route path="/setting" element={<Setting />}>
									<Route path="" element={<MainSetting />} />
									<Route
										path="users"
										element={<UserInfoSetting />}
									/>
									<Route path="qr" element={<QrInfo />} />
									<Route
										path="alarm-history"
										element={<AlarmHistory />}
									/>
									<Route
										path="password"
										element={<PasswordChange />}
									/>
									<Route
										path="teams"
										element={<TeamInfo />}
									/>
									<Route
										path="inventories"
										element={<InventorySetting />}
									/>
									<Route path="alarms" element={<Alarm />} />
								</Route>
								<Route path="/main" element={<Main />}>
									<Route path="" element={<BrokerMain />} />
									<Route
										path="outgoings"
										element={<OutgoingReqList />}
									/>
								</Route>
								<Route
									path="/histories"
									element={<HistoryOutlet />}
								>
									<Route path="" element={<History />} />
									<Route
										path="outgoings/:date"
										element={<OutgoingList />}
									/>
									<Route
										path="incomings/:date"
										element={<IncomingList />}
									/>
									<Route
										path="adjusts/:date"
										element={<AdjustList />}
									/>
								</Route>
								<Route
									path="/inventories"
									element={<InventoryView />}
								/>
								<Route path="/trades" element={<TradeView />}>
									<Route path="" element={<TradeMain />} />
									<Route
										path="broker/:brokerId"
										element={<TradeBrokerMain />}
									/>
								</Route>
								<Route path="/carts" element={<Cart />} />
								<Route
									path="/incoming/:productId"
									element={<Income />}
								/>
								<Route
									path="/alarm-history"
									element={<AlarmHistory />}
								/>
								<Route path="/sales" element={<Sales />}>
									<Route path="" element={<SalesMain />} />
								</Route>
							</Route>
						</Route>

						{/* 테스트 라우트 - 로그인 상태와 관계없이 접근 가능 */}
						<Route path="test" element={<AxiosInstanceTest />} />
					</Routes>
				</BrowserRouter>
			</TokenProvider>
		</div>
	);
}

export default App;
