import React, { Component } from "react"
import "./slides.css";
import { fitRectIntoBounds } from "./fitRectIntoBounds";

interface SlidesState {
	width: number;
	height: number;
}

type SlidesProps = {
	isPresenter: boolean;
}

export class Slides extends Component<SlidesProps, SlidesState> {
	constructor(props: any) {
		super(props);
		this.state = {
			width: 600,
			height: 480
		};
	}

	theElement = (element: HTMLDivElement) => {
		if (element) {
			const result = fitRectIntoBounds(
				{ width: 1520, height: 680 },
				{ width: element.clientWidth, height: element.clientHeight }
			);
			this.setState(result);
		}
	}

	ifPresenter(content: any) {
		if (this.props.isPresenter)
			return content;
		else
			return (
				<section data-background-color="#ffffff">
					<h1 style={{ opacity: .25 }}>Digital<br />Icebreakers</h1>
				</section>);
	}

	diagram(path: string) {
		return this.ifPresenter(
			<section data-background-image={path} data-background-color="#ffffff" className="cover-page"></section>
		)
	}

	render() {
		return (
			<div className="slides" ref={this.theElement}>

				{this.diagram("img/intro.png")}
 
				<section data-background-color="#ffffff">
					<h2>
						<ul >
								<li className="no-opacic">Real-time applications</li>
					 			<li  className="opacic">Scaling</li>
								<li  className="opacic">Serverless approach</li>
								<li className="opacic">Audience interactive demo</li>
							</ul>
						 
					</h2>
				</section>
				<section data-background-color="#ffffff">
					<h2>
					<ul >
								<li className="no-opacic">Real-time applications</li>
					 			<li  className="no-opacic">Scaling</li>
								<li  className="opacic">Serverless approach</li>
								<li className="opacic">Audience interactive demo</li>
							</ul>
					</h2>
				</section>
				<section data-background-color="#ffffff">
					<h2>
					<ul >
								<li className="no-opacic">Real-time applications</li>
					 			<li  className="no-opacic">Scaling</li>
								<li  className="no-opacic">Serverless approach</li>
								<li className="opacic">Audience interactive demo</li>
							</ul>
					</h2>
				</section>
				<section data-background-color="#ffffff">
					<h2>
					<ul >
								<li className="no-opacic">Real-time applications</li>
					 			<li  className="no-opacic">Scaling</li>
								<li  className="no-opacic">Serverless approach</li>
								<li className="no-opacic">Audience interactive demo</li>
							</ul>
					</h2>
				</section>

				{this.ifPresenter(
					<section  className="cover-page" data-background-image="img/flower-bidding.jpg" >
						<h2 className="flower" style={{ color: "black" }}>Bidding Flower Bouquet</h2>
					</section>
				)}
				
				 

				
				{/* {this.diagram("img/diagrams.001.png")} */}

				{this.ifPresenter(
					<section>
						<img src="img/f5.webp" width="414px" />
					</section>
				)}

				<section data-background-color="#ffffff">
					<h3>setTimeout(() => location.reload(true), 1000);</h3>
				</section>

				<section data-background-color="#ffffff">
					<h1>POC</h1>
					<div className="poc">
						<ul>
							<h3>
							<li>Asp.Net Core</li>
							<li>Vue.js	</li>
							<li>Azure SignalR Service</li>
							<li>Azure Storage</li>
							<li>Azure App Service</li>
							</h3>
						</ul>
					</div>
				</section>


				{this.diagram("img/diagrams.002.png")}

				<section data-background-color="#ffffff">
					<h2>Push data <br />once available</h2>
				</section>

				<section data-transition="none" >
					<h1>Best Candidates <br />for real-time?</h1>
				</section>

				{this.diagram("img/facebook.jpg")}
				{this.diagram("img/dating.jpg")}
				{this.diagram("img/uber.jpg")}
				{this.diagram("img/gaming.jpg")}
				{this.diagram("img/dashboard.jpg")}

				<section data-transition="none" data-background-color="#ffffff">
					<h1>High frequency updates</h1>
				</section>

				<section data-transition="none" data-background-color="#ffffff">
					<h1>Event-driven architecture</h1>
				</section>

				<section data-transition="none">
					<h1>How do real-time apps work?</h1>
				</section>

				<section data-transition="none" data-background-color="#ffffff">
					<h1>Long Polling</h1>
				</section>

				{this.diagram("img/diagrams.003.png")}
				{this.diagram("img/diagrams.004.png")}
				{this.diagram("img/diagrams.005.png")}
				{this.diagram("img/diagrams.006.png")}

				<section data-transition="none" data-background-color="#ffffff">
					<h1>Server-Sent Events</h1>
				</section>
				<section data-transition="none" data-background-color="#ffffff">
					<h2>
						<ul>
							<li >HTML5</li>
							<li className="opacic">One-way communication</li>
							<li className="opacic">Low latency</li>
							<li className="opacic">Unsupported by Edge &amp; IE</li>
						</ul>
					</h2>
				</section>
				<section data-transition="none" data-background-color="#ffffff">
					<h2>
						<ul>
							<li  >HTML5</li>
							<li  >One-way communication</li>
							<li className="opacic">Low latency</li>
							<li className="opacic">Unsupported by Edge &amp; IE</li>
						</ul>
					</h2>
				</section>
				<section data-transition="none" data-background-color="#ffffff">
					<h2>
						<ul>
							<li  >HTML5</li>
							<li >One-way communication</li>
							<li >Low latency</li>
							<li className="opacic">Unsupported by Edge &amp; IE</li>
						</ul>
					</h2>
				</section>
				 

				<section data-transition="none" data-background-color="#ffffff">
					<h2>
						<ul>
							<li >HTML5</li>
							<li >One-way communication</li>
							<li >Low latency</li>
							<li >Unsupported by Edge &amp; IE</li>
						</ul>
					</h2>
				</section>

				{this.diagram("img/diagrams.007.png")}
				{this.diagram("img/diagrams.008.png")}
				{this.diagram("img/diagrams.009.png")}
				{this.diagram("img/diagrams.010.png")}
				{this.diagram("img/diagrams.011.png")}

				<section data-background-color="#ffffff">
					<h1>Web Socket</h1>
				</section>

			 
				<section data-background-color="#ffffff">
					<h1>Bi-directional</h1>
				</section>


				{this.diagram("img/diagrams.012.png")}

				<section data-background-color="#ffffff">
					<h1>Which transport method<br />is the best?</h1>
				</section>

				<section data-background-color="#ffffff">
					<h1>ASP.NET SignalR</h1>
				</section>

				<section data-background-color="#ffffff">
					<h1>Manages transport  <br /> method is the key benefit</h1>
				</section>
				<section  data-background-color="#ffffff">
					<h1>WebSocket when it’s available</h1>
				</section>
				<section  data-background-color="#ffffff">
					<h2> Originated in 2011 <br /> David Fowler, Damian Edwards</h2>
				</section>
				<section  data-background-color="#ffffff">
					<h1>Server & Client Library </h1>
				</section>
				<section  data-background-color="#ffffff">
					<h1> ASP.NET Core SignalR <br /> is a rewrite!</h1>
				</section>

				{this.ifPresenter(
					<section className="cover-page" data-background-image="img/flower-bidding.jpg" data-background-opacity=".5">
						<h1 style={{ color: "white" }}>Bidding Flower Bouquet</h1>
						<h3 style={{ color: "white" }}>ASP.NET Core SignalR,<br />
							Vue.js
						</h3>
					</section>
				)}

				<section>
					<pre><code data-line-numbers="3" data-noescape data-trim>{`
								public void ConfigureServices(IServiceCollection services)
								{
									services.AddSignalR();
								}

								public void Configure(IApplicationBuilder app)
								{
									app.UseRouting();
									app.UseEndpoints(endpoints =>
									{
										endpoints.MapHub<EchoHub>("/echo");
									});
								}
							`}</code></pre>
				</section>
				<section>
					<pre><code className='hljs' data-line-numbers="8-12" data-noescape data-trim>{`
								public void ConfigureServices(IServiceCollection services)
								{
									services.AddSignalR();
								}

								public void Configure(IApplicationBuilder app)
								{
									app.UseRouting();
									app.UseEndpoints(endpoints =>
									{
										endpoints.MapHub<EchoHub>("/echo");
									});
								}
							`}</code></pre>
				</section>
				<section >
					<pre><code className='hljs' data-line-numbers="5" data-noescape data-trim>{`
								public class BidHub : Hub
								{
								    public async Task Send(string message)
								    {
								        await Clients.All.SendAsync("BroadCastClient", msg);
								    }
								}
							`}</code></pre>
				</section>

				{this.diagram("img/diagrams.026.png")}

				<section>
					<h2>
						npm install @microsoft/signalr
					</h2>
				</section>
				<section>
					<pre><code className='javascript' data-line-numbers="2-4" data-trim>{`
						constructor() {    
						  this.hubConnection = new signalR.HubConnectionBuilder()
						    .withUrl("https://serverbidding.azurewebsites.net/bid")
						    .build();
						}

						sendMessage() {
						  this.hubConnection.send("send","send this to server")}
						}
						`}</code></pre>
				</section>
				<section>
					<pre><code className='javascript' data-line-numbers="7-9" data-trim>{`
						constructor() {    
						  this.hubConnection = new signalR.HubConnectionBuilder()
						    .withUrl("https://serverbidding.azurewebsites.net/bid")
						    .build();
						}

						sendMessage() {
						  this.hubConnection.send("send","send this to server")}
						}
						`}</code></pre>
				</section>

				<section>
					<pre><code className='javascript' data-line-numbers="2-3" data-trim>{`
						constructor() {
						  this.hubConnection.on("BroadCastClient",
						    this.broadcastCallBack);
						}   
						
						broadcastCallBack(name, message) {
						  alert(message);
						}
					`}</code></pre>
				</section>
				<section>
					<pre><code className='javascript' data-line-numbers="6-8" data-trim>{`
						constructor() {
						  this.hubConnection.on("BroadCastClient",
						    this.broadcastCallBack);
						}   
						
						broadcastCallBack(name, message) {
						  alert(message);
						}
					`}</code></pre>
				</section>
				<section>
					<h1>Pushing the limit</h1>
				</section>
				<section data-background-color="#ffffff">
					<blockquote cite="some idiot">
						&ldquo;SignalR can handle unlimited persistent connections!&rdquo;
					</blockquote>
				</section>
				<section data-background-color="#ffffff">
					<blockquote cite="Nelly & Stafford">
						&ldquo;SignalR can <span style={{ color: "red" }}>not</span> handle unlimited persistent connections!&rdquo;
					</blockquote>
				</section>
				<section data-background-color="#ffffff">
					<h2>Servers have limited resources</h2>
					<img src="img/placeholder.png"></img>
				</section>
				<section data-background-color="#ffffff">
					<h1>Persistent connections <br /> consume resources  <br /> significantly!</h1>
				</section>

			 	{this.ifPresenter(
					<section data-background-color="#ffffff">
						<img src="img/serverresources.png"   />
					</section>
				)}

				{this.diagram("img/realtime.001.png")}
				{this.diagram("img/realtime.002.png")}
				{this.diagram("img/realtime.003.png")}
				{this.diagram("img/realtime.004.png")}
				{this.diagram("img/realtime.005.png")}


				<section data-background-color="#ffffff">
					<h2>Crankier</h2>
				</section>
				<section data-background-color="#ffffff">
					<table>
						<thead>
							<tr><th>Client(s)</th><th>Server</th><th>Connections</th></tr>
						</thead>
						<tbody>
							<tr>
								<td>Local</td>
								<td>S1 App Service</td>
								<td>768</td>
							</tr>
							<tr className="fragment">
								<td>50 containers</td>
								<td>S1 App Service</td>
								<td>~16,000</td>
							</tr>
							<tr className="fragment">
								<td>50 containers</td>
								<td>D2s VM</td>
								<td>~65,000</td>
							</tr>
							<tr className="fragment">
								<td>50 VMs</td>
								<td>D2s VM</td>
								<td>~100,000</td>
							</tr>
							<tr className="fragment">
								<td>50 VMs</td>
								<td>D14s VM</td>
								<td>~214,000</td>
							</tr>
							<tr className="fragment">
								<td>50 VMs</td>
								<td>D32s VM</td>
								<td>~245,000</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		);
	}
}